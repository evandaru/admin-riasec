// inertia/pages/user/layouts/main.tsx

import { PropsWithChildren } from 'react'
import Sidebar from './sidebar' // Sidebar-nya tetap sama
import { Head } from '@inertiajs/react'

export default function UserLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Head title="User Dashboard" />

      {/* Struktur ini lebih bener. Sidebar dan Main Content itu sibling.
        Sidebar akan ngatur posisinya sendiri (fixed di mobile, static di desktop).
      */}
      <div className="bg-gray-100 dark:bg-gray-800 min-h-screen">
        <Sidebar />

        {/* Di layar kecil (mobile), main content bakal full-width.
          Di layar medium ke atas (md), kita kasih margin kiri seukuran lebar sidebar (w-64).
          Ini yang bikin kontennya gak ketimpa sidebar.
        */}
        <main className="md:ml-64 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </>
  )
}