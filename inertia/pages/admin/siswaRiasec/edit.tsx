// title: inertia/pages/admin/siswa/edit.tsx
import { Link, useForm, Head } from '@inertiajs/react'
import AdminLayout from '../layouts/main'
import { DateTime } from 'luxon'
import { useState, useEffect } from 'react' // Tambahkan useEffect untuk validasi otomatis

interface SiswaData {
  id: number
  namaLengkap: string
  nisn: string | null
  alamat: string | null
  telepon: string | null
  jenjang: string | null
  kelas: string | null
  tanggalLahir: string | null
  user: {
    email: string
  }
}

export default function EditSiswa({ siswa }: { siswa: SiswaData }) {
  const { data, setData, put, processing, errors } = useForm({
    namaLengkap: siswa.namaLengkap,
    email: siswa.user.email,
    password: '',
    password_confirmation: '',
    nisn: siswa.nisn || '',
    jenjang: siswa.jenjang || '',
    alamat: siswa.alamat || '',
    telepon: siswa.telepon || '',
    kelas: siswa.kelas || '',
    tanggalLahir: siswa.tanggalLahir ? DateTime.fromISO(siswa.tanggalLahir).toISODate() : '',
  })

  const [passwordError, setPasswordError] = useState<string | null>(null)

  // Fungsi validasi password
  const validatePassword = () => {
    if (data.password || data.password_confirmation) {
      if (data.password !== data.password_confirmation) {
        setPasswordError('Konfirmasi password tidak cocok dengan password.')
        return false
      }
      if (data.password.length < 8) {
        setPasswordError('Password harus minimal 8 karakter.')
        return false
      }
    }
    setPasswordError(null)
    return true
  }

  // Validasi otomatis setiap kali data.password atau data.password_confirmation berubah
  useEffect(() => {
    validatePassword()
  }, [data.password, data.password_confirmation])

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validatePassword()) {
      put(`/admin/siswa-riasec/${siswa.id}`)
    }
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
                className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                className="mt-1 block px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
            </div>

            {/* Alamat */}
            <div>
              <label
                htmlFor="alamat"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Alamat
              </label>
              <input
                id="alamat"
                type="text"
                value={data.alamat}
                onChange={(e) => setData('alamat', e.target.value)}
                className="mt-1 block px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.alamat && <div className="text-xs text-red-500 mt-1">{errors.alamat}</div>}
            </div>

            {/* Jenjang */}
            <div>
              <label
                htmlFor="jenjang"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Jenjang
              </label>
              <select
                id="jenjang"
                value={data.jenjang}
                onChange={(e) => setData('jenjang', e.target.value)}
                className="mt-1 block px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Pilih Jenjang</option>
                <option value="MA">MA</option>
                <option value="MTS">MTS</option>
              </select>
              {errors.jenjang && <div className="text-xs text-red-500 mt-1">{errors.jenjang}</div>}
            </div>

            {/* Telepon */}
            <div>
              <label
                htmlFor="telepon"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Telepon
              </label>
              <input
                id="telepon"
                type="number"
                value={data.telepon}
                onChange={(e) => setData('telepon', e.target.value)}
                className="mt-1 block px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.telepon && <div className="text-xs text-red-500 mt-1">{errors.telepon}</div>}
            </div>

            {/* Password dan Konfirmasi Password */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className={`mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${passwordError ? 'border-red-500' : ''}`}
                  placeholder="Kosongkan jika tidak diubah"
                />
                {errors.password && (
                  <div className="text-xs text-red-500 mt-1">{errors.password}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Konfirmasi Password Baru
                </label>
                <input
                  id="password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${passwordError ? 'border-red-500' : ''}`}
                  placeholder="Ulangi password baru"
                />
                {passwordError && (
                  <div className="text-xs text-red-500 mt-1">{passwordError}</div>
                )}
              </div>
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
                type="number"
                value={data.nisn}
                onChange={(e) => setData('nisn', e.target.value)}
                className="mt-1 block px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              <select
                id="kelas"
                value={data.kelas}
                onChange={(e) => setData('kelas', e.target.value)}
                className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">Pilih Kelas</option>
                <option value="1">1 (satu)</option>
                <option value="2">2 (dua)</option>
                <option value="3">3 (tiga)</option>
              </select>
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
                value={data.tanggalLahir ?? ''}
                onChange={(e) => setData('tanggalLahir', e.target.value)}
                className="mt-1 block px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.tanggalLahir && (
                <div className="text-xs text-red-500 mt-1">{errors.tanggalLahir}</div>
              )}
            </div>

            {/* Tombol Submit */}
            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={processing || !!passwordError}
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