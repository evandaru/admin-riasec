import { Link, useForm, Head, usePage } from '@inertiajs/react'
import UserLayout from '../layouts/main'
import { DateTime } from 'luxon'
import { useEffect, useState } from 'react'
import { CheckCircle, X, XCircle, Camera } from 'lucide-react'
import Avatar from '~/components/avatar'

interface User {
  id: number
  fullName: string | null
  email: string
}

interface Siswa {
  nisn: string | null
  kelas: string | null
  tanggalLahir: string | null
  jenjang: string | null
  telepon: string | null
}

interface PageProps {
  user: User
  siswa: Siswa | null
  flash?: {
    success?: string
    error?: string
  }
  [key: string]: unknown
}

export default function UserProfile() {
  const { user, siswa, flash } = usePage<PageProps>().props

  const { data, setData, put, processing, errors, isDirty } = useForm({
    fullName: user.fullName || '',
    email: user.email,
    nisn: siswa?.nisn || '',
    kelas: siswa?.kelas || '',
    tanggalLahir: siswa?.tanggalLahir ? DateTime.fromISO(siswa.tanggalLahir).toISODate() : '',
    jenjang: siswa?.jenjang || '',
    password: '',
    password_confirmation: '',
    telepon: siswa?.telepon || '',
  })

  // State untuk validasi password
  const [passwordError, setPasswordError] = useState<string | null>(null)

  // State untuk notifikasi Toast
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error',
  })

  // Fungsi validasi password
  const validatePassword = () => {
    if (data.password || data.password_confirmation) {
      if (data.password !== data.password_confirmation) {
        setPasswordError('Konfirmasi password tidak sama dengan password.')
        return false
      }
    }
    setPasswordError(null)
    return true
  }

  // Validasi otomatis saat password berubah
  useEffect(() => {
    validatePassword()
  }, [data.password, data.password_confirmation])

  useEffect(() => {
    if (flash?.success) {
      setToast({ show: true, message: flash.success, type: 'success' })
    } else if (flash?.error) {
      setToast({ show: true, message: flash.error, type: 'error' })
    }
    if (flash?.success || flash?.error) {
      const timer = setTimeout(() => setToast((current) => ({ ...current, show: false })), 5000)
      return () => clearTimeout(timer)
    }
  }, [flash])

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (validatePassword()) {
      put('/profile', {
        preserveScroll: true,
        onSuccess: () => {
          setData((currentData) => ({
            ...currentData,
            password: '',
            password_confirmation: '',
          }))
        },
      })
    }
  }

  function handlePhotoClick() {
    alert('Fitur ganti foto masih dalam pengembangan.')
  }

  return (
    <>
      <Head title="Profil Saya" />
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Profil Saya
          </h1>
          <Link
            href="/dashboard"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            ← Kembali ke Dashboard
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md">
          <form onSubmit={submit} className="space-y-6">
            <div className="flex justify-center mb-6">
              <div
                className="relative group cursor-pointer"
                onClick={handlePhotoClick}
                title="Ganti foto profil"
              >
                <Avatar name={user.fullName || 'User'} className="w-24 h-24 text-3xl" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full flex items-center justify-center transition-all duration-300">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={data.fullName}
                  onChange={(e) => setData('fullName', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed bg-gray-200"
                  required
                  disabled
                />
                {errors.fullName && (
                  <div className="text-xs text-red-500 mt-1">{errors.fullName}</div>
                )}
              </div>

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
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
                {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
              </div>

              <div>
                <label
                  htmlFor="jenjang"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  jenjang <span className="text-red-500">*</span>
                </label>
                <select
                  id="jenjang"
                  value={data.jenjang}
                  onChange={(e) => setData('jenjang', e.target.value)}
                  disabled
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed bg-gray-200"
                >
                  <option value="">Pilih Jenjang</option>
                  <option value="MA">MA</option>
                  <option value="MTS">MTS</option>
                </select>
                {errors.jenjang && <div className="text-xs text-red-500 mt-1">{errors.jenjang}</div>}
              </div>

              <div>
                <label
                  htmlFor="nisn"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  NISN
                </label>
                <input
                  id="nisn"
                  type="text"
                  value={data.nisn}
                  onChange={(e) => setData('nisn', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed bg-gray-200"
                  disabled
                />
                {errors.nisn && <div className="text-xs text-red-500 mt-1">{errors.nisn}</div>}
              </div>

              <div>
                <label
                  htmlFor="telepon"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  telepon
                </label>
                <input
                  id="telepon"
                  type="text"
                  value={data.telepon}
                  onChange={(e) => setData('telepon', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {errors.telepon && <div className="text-xs text-red-500 mt-1">{errors.telepon}</div>}
              </div>

              <div>
                <label
                  htmlFor="kelas"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Kelas
                </label>
                <input
                  id="kelas"
                  type="text"
                  value={data.kelas}
                  onChange={(e) => setData('kelas', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 cursor-not-allowed bg-gray-200"
                  disabled
                />
                {errors.kelas && <div className="text-xs text-red-500 mt-1">{errors.kelas}</div>}
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="tanggalLahir"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Tanggal Lahir
                </label>
                <input
                  id="tanggalLahir"
                  type="date"
                  value={data.tanggalLahir ?? ''}
                  onChange={(e) => setData('tanggalLahir', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {errors.tanggalLahir && (
                  <div className="text-xs text-red-500 mt-1">{errors.tanggalLahir}</div>
                )}
              </div>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={processing || !isDirty || !!passwordError}
                className="inline-flex justify-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`fixed bottom-5 right-5 transition-transform duration-300 z-50 ${toast.show ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]'
          }`}
      >
        <div
          className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800 ring-1 ${toast.type === 'success'
            ? 'ring-green-200 dark:ring-green-700'
            : 'ring-red-200 dark:ring-red-700'
            }`}
          role="alert"
        >
          <div
            className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${toast.type === 'success'
              ? 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200'
              : 'bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200'
              }`}
          >
            {toast.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
          </div>
          <div className="ms-3 text-sm font-normal">{toast.message}</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            onClick={() => setToast({ ...toast, show: false })}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <X size={20} />
          </button>
        </div>
      </div>
    </>
  )
}

UserProfile.layout = (page: any) => <UserLayout children={page} />