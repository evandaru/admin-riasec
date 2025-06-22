// title: inertia/pages/admin/profile/index.tsx
import { Link, useForm, Head, usePage } from '@inertiajs/react'
import AdminLayout from '../layouts/main'
import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

// Definisikan tipe data untuk prop
interface User {
  id: number
  fullName: string | null
  email: string
}

interface PageProps {
  user: User
  flash?: {
    success?: string
    error?: string
  }
}

export default function AdminProfile() {
  const { user, flash } = usePage<PageProps>().props

  const { data, setData, put, processing, errors } = useForm({
    fullName: user.fullName || '',
    email: user.email,
    password: '',
    password_confirmation: '',
  })

  // CUKUP SATU STATE untuk notifikasi "toast"
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error',
  })

  // useEffect untuk memantau perubahan pada flash message dari backend
  useEffect(() => {
    if (flash?.success) {
      setToast({ show: true, message: flash.success, type: 'success' })
    } else if (flash?.error) {
      setToast({ show: true, message: flash.error, type: 'error' })
    }

    // Otomatis sembunyikan toast setelah 5 detik
    if (flash?.success || flash?.error) {
      const timer = setTimeout(() => {
        setToast((current) => ({ ...current, show: false }))
      }, 5000)
      // Cleanup timer jika komponen di-unmount atau flash berubah lagi
      return () => clearTimeout(timer)
    }
  }, [flash])

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    put('/admin/profile', {
      preserveScroll: true,
      onSuccess: () => {
        // Kosongkan field password setelah berhasil update
        setData((currentData) => ({
          ...currentData,
          password: '',
          password_confirmation: '',
        }))
      },
    })
  }

  return (
    <>
      <Head title="My Profile" />
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            My Profile
          </h1>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            ← Kembali
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md">
          <form onSubmit={submit} className="space-y-6">
            {/* Form fields... (sama seperti kode Anda) */}
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
                className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
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
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  className="mt-1 block w-full px-3 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div className="flex justify-end pt-2">
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

      {/* --- Floating Toast Notification --- */}
      <div
        className={`fixed bottom-5 right-5 transition-transform duration-300 z-50 ${
          toast.show ? 'translate-x-0' : 'translate-x-[calc(100%+2rem)]'
        }`}
      >
        <div
          className={`flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow-lg dark:text-gray-400 dark:bg-gray-800 ring-1 ${
            toast.type === 'success'
              ? 'ring-green-200 dark:ring-green-700'
              : 'ring-red-200 dark:ring-red-700'
          }`}
          role="alert"
        >
          <div
            className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${
              toast.type === 'success'
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

// Menggunakan layout admin yang sudah ada
AdminProfile.layout = (page: any) => <AdminLayout children={page} />
