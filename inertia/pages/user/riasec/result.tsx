import { Head, usePage, Link } from '@inertiajs/react'
import UserLayout from '../layouts/main'
import { Lightbulb } from 'lucide-react'
import { useState } from 'react' // Pastikan useState diimpor

// --- DATA DESKRIPSI RIASEC ---
const descriptions = {
  R: {
    name: 'Realistic (The Doer)',
    desc: 'Suka kerja pake tangan, alat, atau di outdoor. Lo tipe yang praktis dan nggak takut kotor! Contoh: Mekanik, Petani.',
    color: 'bg-orange-500',
    icon: '🔧',
    tips: [
      'Coba kursus teknis kayak mekanik atau bangunan.',
      'Join kegiatan outdoor kayak hiking atau camping.',
      'Praktekin skill lo di proyek DIY!',
    ],
  },
  I: {
    name: 'Investigative (The Thinker)',
    desc: 'Penyuka riset, analisis, dan pecahin masalah. Lo paling jago kalo disuruh mikir kritis! Contoh: Ilmuwan, Data Analyst.',
    color: 'bg-sky-500',
    icon: '🔬',
    tips: [
      'Ikut bootcamp data science atau coding.',
      'Baca jurnal ilmiah atau podcast soal teknologi.',
      'Coba bikin proyek riset kecil!',
    ],
  },
  A: {
    name: 'Artistic (The Creator)',
    desc: 'Kreatif abis, suka seni, dan nggak suka aturan ketat. Lo paling *shine* kalo bisa ekspresiin diri! Contoh: Desainer, Musisi.',
    color: 'bg-purple-500',
    icon: '🎨',
    tips: [
      'Join komunitas seni atau workshop kreatif.',
      'Bikin portofolio digital buat karya lo.',
      'Eksplor software desain kayak Figma atau Procreate!',
    ],
  },
  S: {
    name: 'Social (The Helper)',
    desc: 'Suka bantu orang, ngajar, atau kerja bareng tim. Lo tipe yang bikin orang nyaman! Contoh: Guru, Perawat.',
    color: 'bg-emerald-500',
    icon: '🤝',
    tips: [
      'Ikut volunteer di komunitas lokal.',
      'Coba kursus public speaking atau mentoring.',
      'Networking sama orang-orang di bidang sosial!',
    ],
  },
  E: {
    name: 'Enterprising (The Persuader)',
    desc: 'Ambisius, suka memimpin, dan jago jualan ide. Lo tipe yang nggak takut ambil risiko! Contoh: Pengusaha, Marketing.',
    color: 'bg-red-500',
    icon: '💼',
    tips: [
      'Ikut pelatihan bisnis atau leadership.',
      'Coba bikin side hustle kecil.',
      'Join komunitas startup atau entrepreneur!',
    ],
  },
  C: {
    name: 'Conventional (The Organizer)',
    desc: 'Rapi, suka data, dan jago ngatur. Lo paling betah kalo semuanya terorganisir! Contoh: Akuntan, Admin.',
    color: 'bg-yellow-500',
    icon: '📊',
    tips: [
      'Coba kursus akuntansi atau manajemen data.',
      'Gunain tools kayak Notion buat ngatur hidup lo.',
      'Ikut pelatihan administrasi atau Excel!',
    ],
  },
}

// --- Tipe Data untuk Props ---
interface Program {
  id: number
  name: string
  description: string | null
}

interface Interest {
  id: number
  name: string
  description: string
}

interface HasilTes {
  id: number
  kodeHolland: string
  skorR: number
  skorI: number
  skorA: number
  skorS: number
  skorE: number
  skorC: number
  siswa: {
    namaLengkap: string
  }
}

interface ResultPageProps {
  hasilTes: HasilTes
  recommendedPrograms: Program[]
  recommendedInterests: Interest[]
}

// --- Komponen Utama ---
export default function RiasecResultPage() {
  const { hasilTes, recommendedInterests } = usePage<ResultPageProps>().props

  // State untuk mengontrol visibilitas rekomendasi minat
  const [showAllInterests, setShowAllInterests] = useState(false)

  // Kumpulkan skor mentah
  const rawScores = [
    { type: 'R', score: hasilTes.skorR },
    { type: 'I', score: hasilTes.skorI },
    { type: 'A', score: hasilTes.skorA },
    { type: 'S', score: hasilTes.skorS },
    { type: 'E', score: hasilTes.skorE },
    { type: 'C', score: hasilTes.skorC },
  ]

  // Cari skor tertinggi untuk normalisasi bar
  const maxScore = Math.max(...rawScores.map((s) => s.score), 1)

  // Urutkan skor dari tertinggi ke terendah
  const scores = [...rawScores].sort((a, b) => b.score - a.score)

  // Ambil 3 tipe teratas dari kode Holland
  const topThreeTypes = hasilTes.kodeHolland.split('') as (keyof typeof descriptions)[]

  // Logika untuk menentukan item minat yang akan ditampilkan
  const interestsToDisplay = showAllInterests
    ? recommendedInterests
    : recommendedInterests.slice(0, 3)

  return (
    <>
      <Head title={`Hasil Tes RIASEC - ${hasilTes.kodeHolland}`} />

      <div className="">
        <div className="max-w-4xl mx-auto">
          {/* Section: Apa Arti Kode Holland? */}
          <section className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg mb-8 animate-fade-in">
            <h2 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 text-center mb-4">
              Apa Arti Kode Holland Lo? 🤔
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-center mb-6 max-w-2xl mx-auto">
              Kode Holland (RIASEC) adalah 3 huruf yang nunjukin tipe kepribadian lo berdasarkan
              minat. Ini bantu lo nemuin karier yang *bikin lo on fire*! Cek hasil lo di bawah! 🔥
            </p>
          </section>

          {/* Section: Hasil Tes RIASEC */}
          <section className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg mb-8 animate-slide-up">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                Hasil Tes Lo, {hasilTes.siswa.namaLengkap}! 🎉
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Ini kode Holland lo, yang nunjukin tipe kepribadian karir paling cocok buat lo. Skor
                di bawah kasih detail minat lo!
              </p>
              <div className="my-6">
                <p className="text-lg text-gray-500">Kode Holland Lo:</p>
                <p className="text-5xl sm:text-6xl font-bold text-indigo-600 dark:text-indigo-400 tracking-widest my-2 animate-pop-up">
                  {hasilTes.kodeHolland}
                </p>
              </div>
            </div>

            {/* Rincian Skor */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center sm:text-left">
                Rincian Skor Lo 📊
              </h3>
              <div className="space-y-4">
                {scores.map(({ type, score }) => {
                  const percentage = (score / maxScore) * 100
                  const typeInfo = descriptions[type as keyof typeof descriptions]
                  return (
                    <div key={type} className="flex items-center gap-x-4">
                      <div className="w-48 shrink-0 text-right flex items-center justify-end space-x-2">
                        <span className="text-2xl">{typeInfo.icon}</span>
                        <span className="font-bold text-gray-700 dark:text-gray-200">
                          {typeInfo.name}
                        </span>
                      </div>
                      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 relative overflow-hidden">
                        <div
                          className={`${typeInfo.color} h-8 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${percentage}%` }}
                        />
                        <span
                          className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold ${
                            percentage > 15 ? 'text-white' : 'text-gray-800 dark:text-gray-200'
                          }`}
                        >
                          {score}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Deskripsi Tipe Kepribadian */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center sm:text-left">
                Tipe Kepribadian Top Lo 🌟
              </h3>
              <div className="space-y-6">
                {topThreeTypes.map((type) => {
                  const typeInfo = descriptions[type]
                  return (
                    <div
                      key={type}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-5 h-5 rounded-full ${typeInfo.color} mr-3 flex-shrink-0`}
                        ></div>
                        <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                          {typeInfo.name}
                        </h4>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{typeInfo.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Section: Next Steps */}
          <section className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg mb-8 animate-slide-up">
            <div className="text-center mb-8">
              <Lightbulb className="mx-auto h-12 w-12 text-indigo-500" />
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">
                Next Steps Buat Lo! 💡
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Biar potensi lo makin *meledak*, coba langkah-langkah ini berdasarkan tipe
                kepribadian lo!
              </p>
            </div>
            <div className="space-y-6">
              {topThreeTypes.map((type) => {
                const typeInfo = descriptions[type]
                return (
                  <div
                    key={type}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-3">{typeInfo.icon}</span>
                      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        Tips buat {typeInfo.name}
                      </h4>
                    </div>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      {typeInfo.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-indigo-500 mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Section: Rekomendasi Minat */}
          <section
            id="rekomendasi"
            className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-xl shadow-lg mb-8 animate-slide-up"
          >
            <div className="text-center mb-8">
              <Lightbulb className="mx-auto h-12 w-12 text-indigo-500" />
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">
                Rekomendasi Minat & Hobi 🧠
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Hobi lo bisa jadi jalan buat ngembangin potensi! Cek aktivitas kece ini berdasarkan
                kepribadian lo.
              </p>
            </div>
            {recommendedInterests && recommendedInterests.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {interestsToDisplay.map((interest) => (
                    <div
                      key={interest.id}
                      className="group border border-gray-200 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center text-center transform hover:shadow-xl hover:scale-105 transition-all duration-300 bg-gray-50 dark:bg-gray-700"
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {interest.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2 flex-grow line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        {interest.description || 'Deskripsi belum tersedia.'}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tombol "Lihat Semua" (muncul saat item disembunyikan) */}
                {recommendedInterests.length > 3 && !showAllInterests && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setShowAllInterests(true)}
                      className="bg-indigo-100 text-indigo-700 font-semibold py-2 px-6 rounded-lg hover:bg-indigo-200 transition-all"
                    >
                      Lihat Semua Rekomendasi
                    </button>
                  </div>
                )}

                {/* Tombol "Lihat Lebih Sedikit" (muncul saat semua item ditampilkan) */}
                {recommendedInterests.length > 3 && showAllInterests && (
                  <div className="text-center mt-8">
                    <button
                      onClick={() => setShowAllInterests(false)}
                      className="bg-gray-100 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all"
                    >
                      Lihat Lebih Sedikit
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">
                  Belum ada rekomendasi minat buat lo. Cek lagi nanti, ya! 😎
                </p>
              </div>
            )}
          </section>

          {/* Section: Rekomendasi Program (Bisa ditambahkan di sini jika perlu) */}
        </div>
      </div>

      {/* Animasi CSS */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pop-up {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-pop-up { animation: pop-up 0.5s ease-out; }
      `}</style>
    </>
  )
}

RiasecResultPage.layout = (page: any) => <UserLayout children={page} />
