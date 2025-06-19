import { useState } from 'react';
import { Menu, X, LayoutDashboard, BookOpen, ClipboardList, GraduationCap, Bell, CalendarDays, Users, Library, CheckCircle, Wallet, LifeBuoy, Phone, Settings, LogOut, NotebookText, NotebookPen } from 'lucide-react';
import { Link } from '@inertiajs/react';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Class untuk link yang disabled
  const disabledLinkClass = "pointer-events-none opacity-50 cursor-not-allowed";

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
        className={`fixed inset-y-0 left-0 w-64 h-screen px-4 py-8 overflow-y-auto bg-white dark:bg-gray-900 border-r dark:border-gray-700 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 flex flex-col`}
      >
        {/* Logo */}
        <a href="#">
          <img
            className="w-auto h-6 sm:h-7"
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
          />
        </a>

        {/* Search Bar (tetep aktif biar bisa nyari) */}
        {/* <div className="relative mt-6">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            placeholder="Search"
          />
        </div> */}

        {/* Navigation */}
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            {/* Kategori Utama: Dashboard (DISABLED) */}
            <a
              href="/dashboard"
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="mx-4 font-medium">Dashboard</span>
            </a>

            {/* Kategori: Akademik */}
            <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4">Akademik</p>
            <a
              // href="/jadwal" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <CalendarDays className="w-5 h-5" />
              <span className="mx-4 font-medium">Jadwal Kelas</span>
            </a>
            <a
              // href="/materi" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="mx-4 font-medium">Materi Belajar</span>
            </a>
            <a
              // href="/tugas" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <ClipboardList className="w-5 h-5" />
              <span className="mx-4 font-medium">Tugas & PR</span>
            </a>
            <a
              href="/admin/users" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 `}
            >
              <GraduationCap className="w-5 h-5" />
              <span className="mx-4 font-medium">Daftar Users</span>
            </a>
            {/* RIASEC Test (ENABLED) */}


            {/* Kategori: Kehidupan Sekolah (DISABLED) */}
            <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4">Test Riasec</p>
            <a
              href="/admin/siswa-riasec" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 `}
            >
              <NotebookText className="w-5 h-5" />
              <span className="mx-4 font-medium">Daftar Siswa Test</span>
            </a>
            <a
              href="/kalender" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 `}
            >
              <NotebookPen className="w-5 h-5" />
              <span className="mx-4 font-medium">Pertanyaan</span>
            </a>
            <a
              // href="/ekskul" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <Users className="w-5 h-5" />
              <span className="mx-4 font-medium">Ekskul Gaul</span>
            </a>
            <a
              // href="/perpustakaan" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <Library className="w-5 h-5" />
              <span className="mx-4 font-medium">Perpus Online</span>
            </a>

            {/* Kategori: Administrasi & Bantuan (DISABLED) */}
            <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4">Administrasi & Bantuan</p>
            <a
              // href="/absensi" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <CheckCircle className="w-5 h-5" />
              <span className="mx-4 font-medium">Absensi Kece</span>
            </a>
            <a
              // href="/pembayaran" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <Wallet className="w-5 h-5" />
              <span className="mx-4 font-medium">Bayar-bayar SPP</span>
            </a>
            <a
              // href="/bantuan" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <LifeBuoy className="w-5 h-5" />
              <span className="mx-4 font-medium">Tanya-tanya Dong</span>
            </a>
            <a
              // href="/kontak" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 ${disabledLinkClass}`}
            >
              <Phone className="w-5 h-5" />
              <span className="mx-4 font-medium">Kontak Sekolah</span>
            </a>
          </nav>

          {/* Profile Section */}
          <div className="mt-auto">
            <p className="text-xs font-semibold text-gray-400 uppercase mt-6 mb-2 px-4">Akun</p>
            {/* Profil Gue (DISABLED) */}
            <a
              // href="/profil" // Dihapus href-nya
              className={`flex items-center px-4 -mx-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md ${disabledLinkClass}`}
            >
              <img
                className="object-cover mx-2 rounded-full h-9 w-9"
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                alt="avatar"
              />
              <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">
                John Doe
              </span>
            </a>
            {/* Settingan (DISABLED) */}
            <a
              // href="/settings" // Dihapus href-nya
              className={`flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700 mt-2 ${disabledLinkClass}`}
            >
              <Settings className="w-5 h-5" />
              <span className="mx-4 font-medium">Settingan</span>
            </a>
            {/* Cabut Dulu (ENABLED) */}
            <Link
              href="/logout"
              method="post"
              as="button"
              className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 transition-colors duration-300 transform rounded-md hover:bg-red-100 dark:hover:bg-red-800 dark:hover:text-red-200 hover:text-red-700 mt-2"
            >
              <LogOut className="w-5 h-5" /> {/* Icon LogOut */}
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
  );
};

export default Sidebar;