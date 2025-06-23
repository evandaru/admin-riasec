import { Head, Link, usePage } from '@inertiajs/react'
import UserLayout from '../layouts/main'

interface User {
  fullName: string
}

interface IndexPageProps {
  user: User
}

export default function RiasecIndexPage() {
  const { user } = usePage<IndexPageProps>().props

  // Data untuk tipe RIASEC (bisa diganti dengan ikon/gambar nanti)
  const riasecTypes = [
    {
      code: 'R',
      name: 'Realistic',
      desc: 'Suka kerja fisik, alat, atau outdoor. Contoh: Mekanik, Petani.',
      icon: '🔧',
    },
    {
      code: 'I',
      name: 'Investigative',
      desc: 'Penyuka riset, analisis, dan problem-solving. Contoh: Ilmuwan, Data Analyst.',
      icon: '🔬',
    },
    {
      code: 'A',
      name: 'Artistic',
      desc: 'Kreatif, ekspresif, dan suka seni. Contoh: Desainer, Musisi.',
      icon: '🎨',
    },
    {
      code: 'S',
      name: 'Social',
      desc: 'Suka bantu orang, ngajar, atau kolaborasi. Contoh: Guru, Perawat.',
      icon: '🤝',
    },
    {
      code: 'E',
      name: 'Enterprising',
      desc: 'Ambisius, suka memimpin, dan bisnis. Contoh: Pengusaha, Marketing.',
      icon: '💼',
    },
    {
      code: 'C',
      name: 'Conventional',
      desc: 'Terorganisir, suka data dan rutinitas. Contoh: Akuntan, Admin.',
      icon: '📊',
    },
  ]

  return (
    <>
      <Head title="Tes Minat RIASEC" />
      {/* Gradient background biar vibes */}
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg mb-8 animate-fade-in">
            <img
              className="w-full h-64 sm:h-80 object-cover rounded-xl mb-6"
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1674&auto=format&fit=crop"
              alt="Ilustrasi karier"
            />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
              Halo, {user.fullName}! 👋
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Siap cari tahu karier yang *bikin lo on fire*? Tes RIASEC ini bakal bantu lo nemuin
              tipe kepribadian dan potensi karier yang *nggak bikin burnout*! 🚀
            </p>
            <Link
              href="/riasec/test"
              className="inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300"
            >
              Mulai Tes Sekarang! 🔥
            </Link>
          </section>

          {/* Apa Itu RIASEC? */}
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg mb-8 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Apa Sih RIASEC Itu? 🤔
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              RIASEC adalah model buat ngerti tipe kepribadian lo berdasarkan minat. Ada 6 tipe, dan
              tiap tipe punya *vibes* karier yang cocok. Cek di bawah!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {riasecTypes.map((type) => (
                <div
                  key={type.code}
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-start space-x-4 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {type.code} - {type.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cara Ngerjain Tes */}
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg mb-8 animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Cara Ngerjain Tes Ini 📝
            </h2>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>
                  Klik soal atau toggle “Yeah!” kalo lo ngerasa cocok sama pernyataan. Biarin “Nope”
                  kalo nggak.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>Jawab jujur! Nggak usah overthinking, ikutin insting lo aja.</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span>
                  Tes ini cuma butuh 5-10 menit. Selesai, lo bakal dapet hasil yang *bikin lo
                  mangap*! 😎
                </span>
              </li>
            </ul>
          </section>

          {/* Kenapa Harus Coba? */}
          <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg animate-slide-up">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Kenapa Lo Harus Coba? 💪
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Tes RIASEC bakal kasih lo insight kece soal:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎯</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Karier yang cocok sama passion lo.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🧠</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Tipe kepribadian yang bikin lo *stand out*.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🚀</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Langkah awal buat rencana masa depan yang *lit*.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">😎</span>
                <p className="text-gray-700 dark:text-gray-300">
                  Nggak bikin bosen, hasilnya langsung actionable!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Animasi CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </>
  )
}

RiasecIndexPage.layout = (page: any) => <UserLayout children={page} />
