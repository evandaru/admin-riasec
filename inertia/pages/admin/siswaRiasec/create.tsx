import { Link, useForm, Head } from '@inertiajs/react'
import AdminLayout from '../layouts/main'

export default function CreateSiswa() {
    type SiswaFormData = {
        namaLengkap: string
        email: string
        password: string
        password_confirmation: string
        nisn: string
        kelas: string
        tanggalLahir: string
    }

    const { data, setData, post, processing, errors } = useForm<SiswaFormData>({
        namaLengkap: '',
        email: '',
        password: '',
        password_confirmation: '', // Ditambahkan field untuk konfirmasi password
        nisn: '',
        kelas: '',
        tanggalLahir: '', // Gunakan string kosong untuk input tanggal
    })

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // Kirim data ke rute yang telah kita buat
        post('/admin/siswa-riasec', {
            onSuccess: () => {
                // Optional: Lakukan sesuatu setelah berhasil, misalnya reset form
            },
        })
    }

    return (
        <>
            <Head title="Tambah Siswa Baru" />
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tambah Siswa Baru</h1>
                    <Link
                        href="/admin/siswa-riasec"
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                    >
                        ← Kembali ke Daftar Siswa
                    </Link>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                    {/* Menampilkan error global dari backend (misal: kegagalan transaksi) */}
                    {errors.form && (
                        <div
                            className="mb-4 p-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-700 dark:text-red-400"
                            role="alert"
                        >
                            {errors.form}
                        </div>
                    )}

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
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
                        </div>

                        {/* Konfirmasi Password */}
                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Konfirmasi Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                            {errors.password_confirmation && (
                                <div className="text-xs text-red-500 mt-1">{errors.password_confirmation}</div>
                            )}
                        </div>

                        {/* NISN */}
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

                        {/* Kelas */}
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

                        {/* Tanggal Lahir */}
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
                                {processing ? 'Menyimpan...' : 'Simpan Siswa'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

// Menggunakan layout admin yang sama dengan halaman index
CreateSiswa.layout = (page: any) => <AdminLayout children={page} title="Tambah Siswa" />