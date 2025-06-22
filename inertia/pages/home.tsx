import { Link } from '@inertiajs/react'

// Komponen Ikon (ditempatkan di sini agar mudah digunakan)

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">

      {/* 1. Bagian Hero */}
      <section className="relative flex items-center justify-center min-h-screen px-4 text-center bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-blue-900/30">
        <div className="z-10">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            Bantu Siswa Temukan
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
              Jurusan dan Karier Impian
            </span>
          </h1>
          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 md:text-xl dark:text-gray-300">
            Platform Tes Minat Bakat RIASEC yang terintegrasi, dirancang khusus untuk sekolah modern. Dapatkan laporan akurat dan mudahkan proses bimbingan karier.
          </p>
          <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
            <Link
              href="/register" // Arahkan ke halaman pendaftaran atau login
              className="inline-block px-8 py-3 font-semibold text-white transition-transform transform bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Coba Demo Gratis
            </Link>
            <Link
              href="#features"
              className="inline-block px-8 py-3 font-semibold text-blue-600 transition-colors bg-transparent rounded-full dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-800"
            >
              Lihat Fitur →
            </Link>
          </div>
        </div>
      </section>


      {/* 3. Bagian Solusi & Cara Kerja */}
      <section className="py-16 bg-blue-50 sm:py-24 dark:bg-gray-800/50" id="features">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Solusi Cerdas untuk Sekolah Anda</h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-400">Dengan Tes RIASEC, kami mengubah kebingungan menjadi kejelasan. Cukup dalam 3 langkah mudah.</p>
          </div>
          <div className="relative grid gap-10 md:grid-cols-3">
            {/* Garis Penghubung (Hanya tampil di desktop) */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 dark:bg-gray-600 hidden md:block" style={{ transform: 'translateY(-50%)', zIndex: 0 }}></div>

            <div className="relative z-10 p-6 text-center bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-center mx-auto mb-4 font-bold text-white bg-blue-500 rounded-full w-14 h-14">1</div>
              <h3 className="text-lg font-semibold">Buat Sesi Tes</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Admin membuat jadwal dan membagikan kode akses unik kepada siswa hanya dalam beberapa klik.</p>
            </div>
            <div className="relative z-10 p-6 text-center bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-center mx-auto mb-4 font-bold text-white bg-blue-500 rounded-full w-14 h-14">2</div>
              <h3 className="text-lg font-semibold">Siswa Mengerjakan</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Siswa mengerjakan tes online di mana saja melalui komputer atau smartphone dengan antarmuka yang ramah.</p>
            </div>
            <div className="relative z-10 p-6 text-center bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center justify-center mx-auto mb-4 font-bold text-white bg-blue-500 rounded-full w-14 h-14">3</div>
              <h3 className="text-lg font-semibold">Analisis Hasilnya</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Dapatkan laporan individual yang detail dan rekapitulasi sekolah secara real-time untuk sesi konseling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bagian Testimoni */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Dipercaya oleh Para Pendidik</h2>
          <figure className="mt-10">
            <blockquote className="text-lg italic text-gray-700 md:text-xl dark:text-gray-300">
              <p>"Laporan hasil tes RIASEC dari platform ini sangat membantu kami. Sesi konseling menjadi lebih terarah dan produktif. Siswa dan orang tua merasa lebih tercerahkan dalam mengambil keputusan."</p>
            </blockquote>
            <figcaption className="mt-6">
              <img className="w-16 h-16 mx-auto rounded-full" src="https://i.pravatar.cc/150?u=anisa" alt="Foto Ibu Anisa" />
              <div className="mt-3">
                <cite className="font-semibold not-italic">Ibu Anisa Wulandari, S.Pd.</cite>
                <br />
                <cite className="text-gray-500 not-italic">Guru Bimbingan & Konseling, SMAN 2 Maju Jaya</cite>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 5. Bagian CTA Terakhir */}
      <section className="text-white bg-blue-600 dark:bg-blue-700">
        <div className="max-w-4xl px-4 py-16 mx-auto text-center sm:py-20">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Siap Mengoptimalkan Layanan Bimbingan Karier?</h2>
          <p className="mt-4 text-lg text-blue-100">Lihat sendiri bagaimana platform kami dapat memberikan dampak positif bagi siswa dan sekolah Anda.</p>
          <Link
            href="/register"
            className="inline-block px-10 py-4 mt-8 font-bold text-blue-600 transition-transform transform bg-white rounded-full shadow-lg hover:scale-105"
          >
            Daftar & Minta Akses Demo
          </Link>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="text-gray-400 bg-gray-800 dark:bg-black">
        <div className="max-w-6xl px-4 py-12 mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-lg font-bold text-white">Platform RIASEC Sekolah</h3>
              <p className="mt-2 text-sm">Membantu generasi muda Indonesia menemukan potensi terbaiknya melalui teknologi.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Navigasi</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
                <li><a href="#features" className="hover:text-white">Fitur</a></li>
                <li><a href="#" className="hover:text-white">Harga</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Kontak</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="mailto:info@sekolah.app" className="hover:text-white">info@sekolah.app</a></li>
                <li><a href="tel:+6221123456" className="hover:text-white">(021) 123-456</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 text-sm text-center border-t border-gray-700">
            <p>&copy; {new Date().getFullYear()} Platform RIASEC Anda. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}