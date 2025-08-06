import { useState } from 'react'
import { useForm, Link, Head } from '@inertiajs/react'
import { GraduationCap, Menu, X } from 'lucide-react' // Import ikon yang dibutuhkan

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  // State untuk menu mobile, sama seperti di halaman Home
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [alert, setAlert] = useState({
    show: false,
    type: 'success',
    message: '',
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/login', {
      onSuccess: () => {
        setAlert({
          show: true,
          type: 'success',
          message: 'Login berhasil! Anda akan diarahkan...',
        })
        // Redirect akan ditangani oleh Inertia secara otomatis
      },
      onError: (errors) => {
        // Menggunakan pesan error dari server jika ada, jika tidak, tampilkan pesan default
        const errorMessage =
          errors.email || errors.password || 'Login gagal. Periksa kembali email dan password Anda.'
        setAlert({
          show: true,
          type: 'error',
          message: errorMessage,
        })
      },
    })
  }

  const closeAlert = () => {
    setAlert({ ...alert, show: false })
  }

  return (
    <div className="bg-white text-gray-800 font-sans antialiased min-h-screen flex flex-col">
      <Head>
        <title>Login - Platform Tes RIASEC</title>
        <meta name="description" content="Login ke platform tes minat bakat RIASEC." />
        <link rel="icon" href="/logo.png" />
      </Head>

      <header className="sticky top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap size={24} className="text-blue-600" />
              <span className="font-bold text-lg">Platform RIASEC</span>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-20">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/#features" className="text-gray-600 hover:text-black">
                Fitur
              </Link>
              <Link href="/#kontak" className="text-gray-600 hover:text-black">
                Kontak
              </Link>
              <Link
                href="/login"
                className="ml-4 px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link href="/#features" className="text-xl text-gray-800">
            Fitur
          </Link>
          <Link href="/#kontak" className="text-xl text-gray-800">
            Kontak
          </Link>
          <Link
            href="/login"
            className="mt-4 px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-full"
          >
            Login
          </Link>
        </div>
      )}

      {/* === KONTEN UTAMA (Form Login) === */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          {/* Logo & Judul Form */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Login ke Akun Anda</h1>
            <p className="mt-2 text-sm text-gray-600">
              Selamat datang kembali! Silakan masukkan data Anda.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="anda@email.com"
                required
              />
              {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                autoComplete="current-password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="••••••••"
                required
              />
              {errors.password && <div className="mt-1 text-xs text-red-500">{errors.password}</div>}
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
              >
                {processing ? 'Memproses...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Floating Alert */}
      {alert.show && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 rounded-md flex justify-between items-center shadow-lg transition-opacity duration-300 ${alert.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
            }`}
        >
          <span>{alert.message}</span>
          <button
            onClick={closeAlert}
            className="text-sm font-medium focus:outline-none hover:opacity-75"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}