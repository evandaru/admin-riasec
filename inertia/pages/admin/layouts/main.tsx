// title: inertia/pages/admin/layouts/main.tsx
import { PropsWithChildren, useState, useEffect } from 'react' // 1. Imports
import { usePage } from '@inertiajs/react'
import Sidebar from './sidebar'
import { Head } from '@inertiajs/react'
import { CheckCircle, X, XCircle } from 'lucide-react'

// Definisikan tipe untuk props halaman
interface PageProps {
  children: PropsWithChildren
  flash?: {
    success?: string
    error?: string
  }
  [key: string]: unknown
}

interface AdminLayoutProps extends PropsWithChildren {
  title?: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  title = title || '' // 1. Set default title if not provided

  const { flash } = usePage<PageProps>().props

  // 2. State & Effect untuk Notifikasi Toast
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error',
  })

  useEffect(() => {
    if (flash?.success) {
      setToast({ show: true, message: flash.success, type: 'success' })
    } else if (flash?.error) {
      setToast({ show: true, message: flash.error, type: 'error' })
    }

    if (flash?.success || flash?.error) {
      const timer = setTimeout(() => {
        setToast((current) => ({ ...current, show: false }))
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [flash])

  return (
    <>
      <Head title="Admin Dashboard" />
      <link rel="icon" href="/public/logo.png"></link>
      <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
        <Sidebar />
        <main className="md:ml-64 p-4 sm:p-6 lg:p-8">{children}</main>

        {/* 3. Tambahkan JSX untuk Toast di sini */}
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
      </div>
    </>
  )
}
