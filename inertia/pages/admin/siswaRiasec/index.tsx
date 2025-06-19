import { Link } from '@inertiajs/react'
import { Eye, Pencil, Trash2 } from 'lucide-react' // 1. Impor ikon
import AdminLayout from '../layouts/main'

// Interface tidak berubah
interface User {
    id: number
    email: string
}
interface HasilTes {
    id: number
    kodeHolland: string | null
}
interface Siswa {
    id: number
    namaLengkap: string
    nisn: string | null
    kelas: string | null
    user: User
    hasilTes: HasilTes[]
}

export default function SiswaIndex({ siswa }: { siswa: Siswa[] }) {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manajemen Siswa</h1>
                <div className="space-x-2">
                    <Link
                        href="/admin/dashboard"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        &larr; Kembali ke Dashboard
                    </Link>
                    <Link
                        href="/admin/siswa/create"
                        className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Tambah Siswa Baru
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        {/* ... thead tidak berubah ... */}
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Nama Lengkap
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Kelas
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status Tes
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Hasil (Kode)
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {siswa.map((item) => {
                            const sudahTes = item.hasilTes && item.hasilTes.length > 0
                            const hasilTerbaru = sudahTes ? item.hasilTes[0] : null

                            return (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    {/* ... td untuk data tidak berubah ... */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {item.namaLengkap}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {item.user?.email || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {item.kelas || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                        {sudahTes ? (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                Sudah Tes
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                                Belum Tes
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 text-center font-mono">
                                        {hasilTerbaru?.kodeHolland || '-'}
                                    </td>
                                    {/* 2. Kolom Aksi Diubah */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-1">
                                            <Link
                                                href={`/admin/siswa/${item.id}`}
                                                title="Lihat Detail"
                                                className="p-2 text-gray-500 rounded-full transition-colors hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700"
                                            >
                                                <Eye size={18} />
                                            </Link>
                                            <Link
                                                href={`/admin/siswa/${item.id}/edit`}
                                                title="Edit Siswa"
                                                className="p-2 text-gray-500 rounded-full transition-colors hover:text-indigo-600 hover:bg-indigo-100 dark:hover:bg-gray-700"
                                            >
                                                <Pencil size={18} />
                                            </Link>
                                            <Link
                                                href={`/admin/siswa/${item.id}`}
                                                method="delete"
                                                as="button"
                                                title="Hapus Siswa"
                                                className="p-2 text-gray-500 rounded-full transition-colors hover:text-red-600 hover:bg-red-100 dark:hover:bg-gray-700"
                                                onBefore={() => confirm('Apakah Anda yakin ingin menghapus data siswa ini?')}
                                            >
                                                <Trash2 size={18} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

SiswaIndex.layout = (page: any) => <AdminLayout children={page} title="Manajemen Siswa" />