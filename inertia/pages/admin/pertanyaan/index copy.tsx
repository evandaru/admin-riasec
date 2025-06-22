import { Link } from '@inertiajs/react'
import { Pencil, Trash2 } from 'lucide-react'
import AdminLayout from '../layouts/main' // Asumsi lo punya layout ini

// 1. Definisikan interface untuk data pertanyaan
interface Pertanyaan {
    id: number
    teksPertanyaan: string
    tipeRiasec: 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
    nomorUrut: number | null
}

// Map tipe RIASEC ke warna badge untuk visualisasi
const riasecColors: Record<string, string> = {
    R: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    I: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    A: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    S: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    E: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    C: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
}

export default function PertanyaanIndex({ pertanyaan }: { pertanyaan: Pertanyaan[] }) {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manajemen Pertanyaan RIASEC</h1>
                <div className="space-x-2">
                    <Link
                        href="/admin/dashboard" // Sesuaikan dengan route dashboard lo
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        &larr; Kembali ke Dashboard
                    </Link>
                    <Link
                        href="/admin/pertanyaan/create" // Sesuaikan dengan route create lo
                        className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Tambah Pertanyaan
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/12">
                                No
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/12">
                                Tipe
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-8/12">
                                Teks Pertanyaan
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-2/12">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {pertanyaan.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${riasecColors[item.tipeRiasec]}`}>
                                        {item.tipeRiasec}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-gray-900 dark:text-white">
                                    {item.teksPertanyaan}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-1">
                                        <Link
                                            href={`/admin/pertanyaan/${item.id}/edit`}
                                            title="Edit Pertanyaan"
                                            className="p-2 text-gray-500 rounded-full transition-colors hover:text-indigo-600 hover:bg-indigo-100 dark:hover:bg-gray-700"
                                        >
                                            <Pencil size={18} />
                                        </Link>
                                        <Link
                                            href={`/admin/pertanyaan/${item.id}`}
                                            method="delete"
                                            as="button"
                                            title="Hapus Pertanyaan"
                                            className="p-2 text-gray-500 rounded-full transition-colors hover:text-red-600 hover:bg-red-100 dark:hover:bg-gray-700"
                                            onBefore={() => confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?')}
                                        >
                                            <Trash2 size={18} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// Gunakan layout yang sama
PertanyaanIndex.layout = (page: any) => <AdminLayout children={page} />
