// title: inertia/pages/admin/siswa/edit.tsx
import { Link, useForm, Head } from '@inertiajs/react'
import AdminLayout from '../layouts/main'
import { DateTime } from 'luxon'

// Definisikan tipe data untuk prop `siswa`
interface SiswaData {
    id: number
    namaLengkap: string
    nisn: string | null
    kelas: string | null
    tanggalLahir: string | null // Datetime dari Lucid sering datang sebagai string ISO
    user: {
        email: string
    }
}

export default function EditSiswa({ siswa }: { siswa: SiswaData }) {
    const { data, setData, put, processing, errors } = useForm({
        namaLengkap: siswa.namaLengkap,
        email: siswa.user.email,
        password: '', // Selalu kosongkan password di awal demi keamanan
        nisn: siswa.nisn || '',
        kelas: siswa.kelas || '',
        tanggalLahir: siswa.tanggalLahir ? DateTime.fromISO(siswa.tanggalLahir).toISODate() : '',
    })

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // Gunakan method PUT untuk update, arahkan ke rute update
        put(`/admin/siswa-riasec/${siswa.id}`)
    }

    return (
        <>
            <Head title={`Edit Siswa - ${siswa.namaLengkap}`} />
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Data Siswa</h1>
                    <Link
                        href="/admin/siswa-riasec"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                        ← Kembali ke Daftar Siswa
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                    {/* Global form error handling can be added here if needed */}

                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nama Lengkap */}
                        <div className="md:col-span-2">
                            <label
                                htmlFor="namaLengkap"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="namaLengkap"
                                type="text"
                                value={data.namaLengkap}
                                onChange={(e) => setData('namaLengkap', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            {errors.namaLengkap && (
                                <div className="text-xs text-red-500 mt-1">{errors.namaLengkap}</div>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password Baru
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Kosongkan jika tidak diubah"
                            />
                            {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
                        </div>

                        {/* NISN, Kelas, Tanggal Lahir (sama seperti di form create) */}
                        {/* ... (copy-paste form input untuk nisn, kelas, tanggalLahir dari create.tsx) ... */}
                        <div>
                            <label
                                htmlFor="nisn"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                NISN (Opsional)
                            </label>
                            <input
                                id="nisn"
                                type="text"
                                value={data.nisn}
                                onChange={(e) => setData('nisn', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            {errors.nisn && <div className="text-xs text-red-500 mt-1">{errors.nisn}</div>}
                        </div>

                        <div>
                            <label
                                htmlFor="kelas"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Kelas (Opsional)
                            </label>
                            <input
                                id="kelas"
                                type="text"
                                value={data.kelas}
                                onChange={(e) => setData('kelas', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Contoh: XII IPA 1"
                            />
                            {errors.kelas && <div className="text-xs text-red-500 mt-1">{errors.kelas}</div>}
                        </div>

                        <div className="md:col-span-2">
                            <label
                                htmlFor="tanggalLahir"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Tanggal Lahir (Opsional)
                            </label>
                            <input
                                id="tanggalLahir"
                                type="date"
                                value={data.tanggalLahir}
                                onChange={(e) => setData('tanggalLahir', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            {errors.tanggalLahir && (
                                <div className="text-xs text-red-500 mt-1">{errors.tanggalLahir}</div>
                            )}
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex justify-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-colors"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

EditSiswa.layout = (page: any) => <AdminLayout children={page} title="Edit Siswa" />