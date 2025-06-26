// title: inertia/pages/user/dashboard/index.tsx
import { Head, Link } from '@inertiajs/react'
import UserLayout from '../layouts/main'
import { ArrowRight, CheckCircle, Lightbulb, User } from 'lucide-react'

// Definisikan tipe data untuk props
interface UserProps {
  fullName: string
}

interface SiswaProps {
  id: number
  namaLengkap: string
}

interface HasilTesProps {
  kodeHolland: string
}

interface DashboardProps {
  user: UserProps
  siswa: SiswaProps | null
  latestResult: HasilTesProps | null
}

// Komponen kartu yang dapat digunakan kembali untuk menampilkan informasi
const InfoCard = ({
  title,
  description,
  link,
  linkText,
  icon: Icon,
  enabled = true,
}: {
  title: string
  description: string
  link: string
  linkText: string
  icon: React.ElementType
  enabled?: boolean
}) => {
  const linkClasses = enabled
    ? 'inline-flex items-center font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 group'
    : 'inline-flex items-center font-semibold text-gray-400 dark:text-gray-500 cursor-not-allowed'

  const cardBorder = enabled ? 'border-blue-500' : 'border-gray-400'
  const iconBg = enabled ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'
  const iconColor = enabled
    ? 'text-blue-600 dark:text-blue-400'
    : 'text-gray-500 dark:text-gray-400'

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between transition-all duration-300 border-l-4 ${cardBorder}`}
    >
      <div>
        <div className="flex items-center mb-4">
          <div className={`p-2 rounded-full ${iconBg}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          <h3 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{description}</p>
      </div>
      <Link href={enabled ? link : '#'} as={enabled ? 'a' : 'span'} className={linkClasses}>
        {linkText}
        {enabled && (
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        )}
      </Link>
    </div>
  )
}

// Komponen utama Dasbor
export default function Dashboard({ user, latestResult }: DashboardProps) {
  const hasTakenTest = !!latestResult

  return (
    <>
      <Head title="Dashboard" />
      <div className="space-y-8">
        {/* Header Sambutan */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Selamat Datang, {user.fullName}!
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Ini adalah pusat kendali Anda. Mari kita mulai perjalanan menemukan potensimu.
          </p>
        </div>

        {/* Grid Konten Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kartu Utama Tes RIASEC (col-span-2) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-xl shadow-lg flex flex-col justify-center">
            {hasTakenTest ? (
              <>
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-8 w-8 text-green-300 mr-3" />
                  <h2 className="text-2xl font-bold">Anda Sudah Mengerjakan Tes!</h2>
                </div>
                <p className="text-lg text-blue-100 mb-4">
                  Kode Holland Anda adalah{' '}
                  <strong className="font-mono text-2xl bg-white/20 px-2 py-1 rounded">
                    {latestResult.kodeHolland}
                  </strong>
                  .
                </p>
                <p className="text-blue-200 mb-6">
                  Lihat laporan lengkap untuk memahami artinya dan melihat rekomendasi yang
                  dipersonalisasi untuk Anda.
                </p>
                <Link
                  href="/riasec/result"
                  className="self-start inline-flex items-center px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105"
                >
                  Lihat Laporan Lengkap
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-3">Langkah Pertama Menuju Masa Depan</h2>
                <p className="text-lg text-blue-100 mb-6">
                  Tes RIASEC akan membantumu memahami minat dan kepribadianmu. Hasilnya akan
                  memberikan rekomendasi jurusan dan karir yang paling cocok untukmu.
                </p>
                <Link
                  href="/riasec/test"
                  className="self-start inline-flex items-center px-6 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105"
                >
                  Mulai Tes Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </>
            )}
          </div>

          {/* Kartu Samping */}
          <div className="space-y-8">
            <InfoCard
              title="Profil Saya"
              description="Buka Profile Anda untuk melihat dan mengedit informasi pribadi Anda."
              link="/profile"
              linkText="Lengkapi Profil"
              icon={User}
            />
            <InfoCard
              title="Rekomendasi Program"
              description="Lihat program-program yang direkomendasikan berdasarkan hasil tes Anda."
              link="/riasec/result/#rekomendasi"
              linkText={hasTakenTest ? 'Lihat Rekomendasi' : 'Selesaikan tes dahulu'}
              icon={Lightbulb}
              enabled={hasTakenTest} // Kartu ini hanya aktif jika sudah tes
            />
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.layout = (page: any) => <UserLayout children={page} />
