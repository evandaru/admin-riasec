import { Head, Link } from '@inertiajs/react'

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen font-sans">
      <Head title="HomePage" />
      <link rel="icon" href="/public/logo.png" />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-10 dark:opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight animate-fade-in-up">
            Bantu Siswa Temukan
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              Jurusan & Karier Impian
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Platform Tes Minat Bakat RIASEC terintegrasi untuk sekolah modern. Laporan akurat, bimbingan karier yang mudah.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              href="/login"
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Coba Demo Gratis
            </Link>
            <Link
              href="#features"
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 bg-transparent border border-blue-600 dark:border-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Lihat Fitur →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800/50" id="features">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold animate-fade-in">Solusi Cerdas untuk Sekolah Anda</h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-fade-in animation-delay-200">
              Ubah kebingungan menjadi kejelasan dengan Tes RIASEC dalam 3 langkah sederhana.
            </p>
          </div>
          <div className="relative grid gap-6 sm:gap-8 md:grid-cols-3">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 hidden md:block transform -translate-y-1/2 z-0" />
            {[
              {
                step: 1,
                title: "Buat Sesi Tes",
                desc: "Admin membuat jadwal dan membagikan kode akses unik kepada siswa hanya dalam beberapa klik.",
              },
              {
                step: 2,
                title: "Siswa Mengerjakan",
                desc: "Siswa mengerjakan tes online di mana saja melalui komputer atau smartphone dengan antarmuka ramah.",
              },
              {
                step: 3,
                title: "Analisis Hasil",
                desc: "Dapatkan laporan individual yang detail dan rekapitulasi sekolah secara real-time untuk konseling.",
              },
            ].map((item, index) => (
              <div
                key={item.step}
                className="relative z-10 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-center mx-auto mb-4 font-bold text-white bg-blue-600 rounded-full w-12 h-12 sm:w-14 sm:h-14">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold animate-fade-in">Dipercaya oleh Para Pendidik</h2>
          <figure className="mt-10 animate-fade-in-up animation-delay-200">
            <blockquote className="text-base sm:text-lg md:text-xl italic text-gray-700 dark:text-gray-300">
              <p>"Laporan hasil tes RIASEC sangat membantu. Sesi konseling menjadi lebih terarah dan produktif. Siswa dan orang tua merasa lebih tercerahkan."</p>
            </blockquote>
            <figcaption className="mt-6">
              <img
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full border-2 border-blue-600 dark:border-blue-400"
                src="https://i.pravatar.cc/150?u=anisa"
                alt="Foto Ibu Anisa"
              />
              <div className="mt-4">
                <cite className="font-semibold not-italic text-gray-800 dark:text-gray-200">Ibu Anisa Wulandari, S.Pd.</cite>
                <br />
                <cite className="text-gray-500 dark:text-gray-400 not-italic text-sm">Guru Bimbingan & Konseling, SMAN 2 Maju Jaya</cite>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-700 dark:to-teal-600 text-white">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold animate-fade-in">
            Optimalkan Bimbingan Karier Sekolah Anda
          </h2>
          <p className="mt-4 text-base sm:text-lg text-blue-100 animate-fade-in animation-delay-200">
            Rasakan dampak positif platform kami bagi siswa dan sekolah Anda.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-3 sm:px-10 sm:py-4 mt-8 text-sm sm:text-base font-bold text-blue-600 bg-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Daftar & Minta Akses Demo
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 dark:bg-black text-gray-400">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mx-auto">
          <div className="grid gap-8 sm:gap-12 md:grid-cols-4">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold text-white">Platform RIASEC Sekolah</h3>
              <p className="mt-2 text-sm">Membantu generasi muda Indonesia menemukan potensi terbaiknya melalui teknologi.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white">Navigasi</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Tentang Kami</a></li>
                <li><a href="#features" className="hover:text-white transition-colors duration-200">Fitur</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Harga</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white">Kontak</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="mailto:info@sekolah.app" className="hover:text-white transition-colors duration-200">info@sekolah.app</a></li>
                <li><a href="tel:+6221123456" className="hover:text-white transition-colors duration-200">(021) 123-456</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 text-sm text-center border-t border-gray-700">
            <p>© {new Date().getFullYear()} Platform RIASEC Anda. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* Tailwind Animation Styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}