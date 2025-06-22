// title: inertia/pages/admin/layouts/sidebar.tsx
import { useState } from 'react'
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  GraduationCap,
  CalendarDays,
  Users,
  Library,
  CheckCircle,
  Wallet,
  LifeBuoy,
  Phone,
  Settings,
  LogOut,
  NotebookText,
  NotebookPen,
} from 'lucide-react'
import { Link, usePage } from '@inertiajs/react' // 1. Impor usePage

// Definisikan tipe untuk props user yang kita harapkan dari Inertia
interface User {
  fullName: string | null
  email: string
}

interface PageProps {
  user: User
  // Anda bisa tambahkan properti lain yang mungkin ada di props
  [key: string]: unknown
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { user } = usePage<PageProps>().props // 2. Ambil data user dari props

  const toggleSidebar = () => setIsOpen(!isOpen)

  // Class untuk link yang disabled
  const disabledLinkClass = 'pointer-events-none opacity-50 cursor-not-allowed'

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 h-screen px-4 py-8 overflow-y-auto bg-white dark:bg-gray-900 border-r dark:border-gray-700 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 flex flex-col`}
      >
        {/* Logo */}
        <a href="/admin/dashboard">
          <img
            className="w-auto h-6 sm:h-7"
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
          />
        </a>

        {/* Navigation */}
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            {/* Kategori Utama: Dashboard */}
            <Link
              href="/admin/dashboard" // Ganti 'a' menjadi 'Link' dan href yang benar
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="mx-4 font-medium">Dashboard</span>
            </Link>

            {/* Kategori: Akademik */}
            <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4">Akademik</p>
            <a
              href="#"
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <CalendarDays className="w-5 h-5" />
              <span className="mx-4 font-medium">Jadwal Kelas</span>
            </a>
            <a
              href="#"
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="mx-4 font-medium">Materi Belajar</span>
            </a>
            <Link
              href="/admin/users"
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 `}
            >
              <GraduationCap className="w-5 h-5" />
              <span className="mx-4 font-medium">Daftar Users</span>
            </Link>

            {/* Kategori: Test Riasec */}
            <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4">
              Test Riasec
            </p>
            <Link
              href="/admin/siswa-riasec"
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 `}
            >
              <NotebookText className="w-5 h-5" />
              <span className="mx-4 font-medium">Daftar Siswa Test</span>
            </Link>
            <Link
              href="/admin/pertanyaan"
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 `}
            >
              <NotebookPen className="w-5 h-5" />
              <span className="mx-4 font-medium">Pertanyaan</span>
            </Link>
          </nav>

          {/* Profile Section */}
          <div className="mt-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4">Akun</p>
            {/* 3. Buat link profil menjadi aktif */}
            <Link
              href="/admin/profile"
              className={`flex items-center px-4 -mx-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md`}
            >
              <img
                className="object-cover mx-2 rounded-full h-9 w-9"
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt="avatar"
              />
              {/* 4. Tampilkan nama user yang login, berikan fallback */}
              <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
                {user?.fullName || 'Admin'}
              </span>
            </Link>

            {/* Settingan (DISABLED) */}
            <a
              href="#"
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 mt-2 ${disabledLinkClass}`}
            >
              <Settings className="w-5 h-5" />
              <span className="mx-4 font-medium">Settingan</span>
            </a>

            {/* 5. Tambahkan `onBefore` untuk konfirmasi logout */}
            <Link
              href="/logout"
              method="post"
              as="button"
              onBefore={() => confirm('Apakah Anda yakin ingin keluar?')}
              className="w-full flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-red-100 dark:hover:bg-red-800 dark:hover:text-red-200 hover:text-red-700 mt-2"
            >
              <LogOut className="w-5 h-5" />
              <span className="mx-4 font-medium">Cabut Dulu</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  )
}

export default Sidebar
