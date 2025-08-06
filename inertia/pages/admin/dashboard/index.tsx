import AdminLayout from '../layouts/main'
import { Award, Users, UserCheck, UserX } from 'lucide-react'
import { DateTime } from 'luxon'
import { useState, useEffect } from 'react'

interface HasilTes {
  id: number
  kodeHolland: string
  tanggalTes: string
  siswa: { namaLengkap: string }
}
const ActivityItem = ({ hasil }: { hasil: HasilTes }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null)

  useEffect(() => {
    const localDate = DateTime.fromISO(hasil.tanggalTes).toLocaleString(DateTime.DATE_MED)
    setFormattedDate(localDate)
  }, [hasil.tanggalTes]) 

  return (
    <li className="py-3 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {hasil.siswa.namaLengkap}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Selesai: {formattedDate || 'Memuat...'}
        </p>
      </div>
      <span className="px-2 py-1 text-xs font-mono font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
        {hasil.kodeHolland}
      </span>
    </li>
  )
}

const RecentActivity = ({ recentTestTakers }: { recentTestTakers: HasilTes[] }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Aktivitas Tes Terbaru
    </h3>
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {recentTestTakers.length > 0 ? (
        recentTestTakers.map((hasil) => <ActivityItem key={hasil.id} hasil={hasil} />)
      ) : (
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">
          Belum ada aktivitas tes terbaru.
        </p>
      )}
    </ul>
  </div>
)

export default function AdminDashboard({ user, stats }: any) {
  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </div>
  )
  const RiasecChart = ({ data }: any) => {
    const riasecDetails: any = {
      R: { name: 'Realistic', color: 'bg-red-500' },
      I: { name: 'Investigative', color: 'bg-blue-500' },
      A: { name: 'Artistic', color: 'bg-yellow-500' },
      S: { name: 'Social', color: 'bg-green-500' },
      E: { name: 'Enterprising', color: 'bg-purple-500' },
      C: { name: 'Conventional', color: 'bg-indigo-500' },
    }
    const maxValue = Math.max(...(Object.values(data) as number[]), 1)
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Distribusi Tipe Dominan RIASEC
        </h3>
        <div className="space-y-4">
          {Object.entries(data).map(([type, count]: any) => (
            <div key={type} className="flex items-center">
              <span className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300">
                {riasecDetails[type]?.name || type}
              </span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                <div
                  className={`${riasecDetails[type]?.color || 'bg-gray-500'} h-6 rounded-full flex items-center justify-start pl-2`}
                  style={{ width: `${(count / maxValue) * 100}%` }}
                >
                  <span className="text-sm font-bold text-white">{count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Selamat datang kembali, {user.fullName}! Berikut ringkasan aktivitas di platform Anda.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Siswa" value={stats.totalSiswa} icon={Users} color="bg-blue-500" />
        <StatCard
          title="Sudah Tes"
          value={stats.siswaSudahTes}
          icon={UserCheck}
          color="bg-green-500"
        />
        <StatCard
          title="Belum Tes"
          value={stats.siswaBelumTes}
          icon={UserX}
          color="bg-yellow-500"
        />
        <StatCard title="Total Admin" value={stats.totalAdmin} icon={Award} color="bg-red-500" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RiasecChart data={stats.riasecDistribution} />
        </div>
        <div>
          <RecentActivity recentTestTakers={stats.recentTestTakers} />
        </div>
      </div>
    </div>
  )
}
AdminDashboard.layout = (page: any) => <AdminLayout children={page} />
