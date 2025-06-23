import { useState } from 'react'
import {
  Menu,
  X,
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  NotebookText,
  NotebookPen,
  Settings,
  LogOut,
} from 'lucide-react'
import { Link, usePage } from '@inertiajs/react'
import Avatar from '~/components/avatar'

// Definisikan tipe untuk props user
interface User {
  fullName: string | null
  email: string
}

interface PageProps {
  user: User
  url: string
  [key: string]: unknown
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { user, url } = usePage<PageProps>().props
  const toggleSidebar = () => setIsOpen(!isOpen)

  const disabledLinkClass = 'pointer-events-none opacity-50 cursor-not-allowed'

  const isActive = (href: string) => {
    if (!url) {
      console.warn('URL is undefined in usePage().props')
      return false
    }
    return url.startsWith(href)
  }

  const linkBaseClass =
    'flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700'

  // Simpan nama user dalam variabel agar lebih bersih
  const userName = user?.fullName || 'Admin'

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
        <Link href="/admin/dashboard">
          <img
            className="w-auto h-6 sm:h-7"
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
          />
        </Link>

        {/* Navigation */}
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            {/* ... (semua link navigasi lainnya tetap sama) ... */}
            <Link
              href="/admin/dashboard"
              className={`${linkBaseClass} ${
                isActive('/admin/dashboard')
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200'
                  : ''
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="mx-4 font-medium">Dashboard</span>
            </Link>

            <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4">Akademik</p>
            <a href="#" className={`${linkBaseClass} ${disabledLinkClass}`}>
              <CalendarDays className="w-5 h-5" />
              <span className="mx-4 font-medium">Jadwal Kelas</span>
            </a>
            <a href="#" className={`${linkBaseClass} ${disabledLinkClass}`}>
              <BookOpen className="w-5 h-5" />
              <span className="mx-4 font-medium">Materi Belajar</span>
            </a>

            <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4">
              Test Riasec
            </p>
            <Link
              href="/admin/siswa-riasec"
              className={`${linkBaseClass} ${
                isActive('/admin/siswa-riasec')
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200'
                  : ''
              }`}
            >
              <NotebookText className="w-5 h-5" />
              <span className="mx-4 font-medium">Daftar Siswa Test</span>
            </Link>
            <Link
              href="/admin/pertanyaan"
              className={`${linkBaseClass} ${
                isActive('/admin/pertanyaan')
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200'
                  : ''
              }`}
            >
              <NotebookPen className="w-5 h-5" />
              <span className="mx-4 font-medium">Pertanyaan</span>
            </Link>
          </nav>

          {/* Profile Section */}
          <div className="mt-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4">Akun</p>

            {/* 2. GANTI BAGIAN INI DARI <img> MENJADI <Avatar> */}
            <Link
              href="/admin/profile"
              className={`${linkBaseClass} -mx-2 ${
                isActive('/admin/profile') ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
            >
              <Avatar name={userName} className="h-9 w-9 mx-2" />
              <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">{userName}</span>
            </Link>

            {/* Settingan (DISABLED) */}
            <a href="#" className={`${linkBaseClass} mt-2 ${disabledLinkClass}`}>
              <Settings className="w-5 h-5" />
              <span className="mx-4 font-medium">Settingan</span>
            </a>

            {/* Logout */}
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
