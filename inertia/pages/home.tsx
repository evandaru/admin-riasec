import { useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import { Users, ClipboardList, BarChart3, Lightbulb, GraduationCap, Menu, X } from 'lucide-react'

const features = [
  {
    icon: <Users size={24} />,
    title: 'Manajemen Siswa & Tes',
    description: 'Kelola data siswa dan pantau kemajuan tes dengan mudah.',
  },
  {
    icon: <ClipboardList size={24} />,
    title: 'Bank Soal Dinamis',
    description: 'Kontrol penuh atas pertanyaan tes RIASEC Anda.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Laporan Detail & Visual',
    description: 'Hasil tes komprehensif dengan grafik yang mudah dipahami.',
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Rekomendasi Cerdas',
    description: 'Rekomendasi jurusan dan karier yang dipersonalisasi.',
  },
]

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      <Head>
        <title>Platform Tes RIASEC Sekolah</title>
        <meta name="description" content="Platform tes minat bakat RIASEC untuk sekolah modern." />
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* === HEADER & NAVIGASI TETAP DI ATAS (STICKY) === */}
      {/* PERBAIKAN 1: Menambahkan kelas untuk membuat header fixed */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6">
          <nav className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap size={24} className="text-blue-600" />
              <span className="font-bold text-lg">Platform RIASEC</span>
            </Link>

            {/* Tombol Hamburger (Hanya terlihat di mobile) */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-20">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Menu Links (Desktop) */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-gray-600 hover:text-black">
                Fitur
              </Link>
              <Link href="#kontak" className="text-gray-600 hover:text-black">
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

      {/* Menu Overlay untuk Mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          onClick={() => setIsMenuOpen(false)} // Klik di luar menu untuk menutup
        >
          <Link href="#features" className="text-xl text-gray-800">
            Fitur
          </Link>
          <Link href="#kontak" className="text-xl text-gray-800">
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

      <main className="space-y-24 md:space-y-32">
        {/* === HERO SECTION FULL-SCREEN === */}
        {/* PERBAIKAN 2: Menambahkan kelas untuk membuat section setinggi layar dan konten terpusat */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
            Bantu Siswa Temukan Jurusan & Karier Impian
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Platform Tes Minat Bakat RIASEC terintegrasi untuk sekolah. Laporan akurat, manajemen
            mudah, dan bimbingan yang terarah.
          </p>
          <Link
            href="/login"
            className="inline-block mt-8 px-8 py-3 font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform hover:scale-105"
          >
            Login Sekarang Juga
          </Link>
        </section>

        {/* === FEATURES SECTION === */}
        <section id="features" className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Solusi Lengkap untuk Sekolah</h2>
            <p className="text-gray-600 mt-2">
              Fitur yang dirancang untuk bimbingan karier modern.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-blue-100 text-blue-600 p-3 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{feature.title}</h3>
                  <p className="text-gray-600 mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === FOOTER & FINAL CTA === */}
        <footer id="kontak" className="text-center py-16 border-t mt-24">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Siap Mengoptimalkan Bimbingan Karier?
            </h2>
            <p className="text-gray-600 mt-2">
              Daftar sekarang dan rasakan dampaknya bagi sekolah Anda.
            </p>
            <a
              href="https://wa.me/6289678001670?text=Halo%20Saya%20ingin%20mendaftar%20dan%20minta%20demo%20Platform%20RIASEC"
              className="inline-block mt-6 px-8 py-3 font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-transform hover:scale-105"
            >
              Daftar & Minta Demo
            </a>
            <p className="text-sm text-gray-500 mt-12">
              © {new Date().getFullYear()} Platform RIASEC Anda. Hak Cipta Dilindungi.
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
