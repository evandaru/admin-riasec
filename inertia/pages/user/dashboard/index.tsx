import { Link } from '@inertiajs/react'

import UserLayout from '../layouts/main'

export default function Dashboard({ user }: { user: { fullName: string } }) {
  return (
    // Mirip admin, tapi buat user biasa
    <div className="p-8 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Dashboard</h1>
      <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold dark:text-white">Welcome, {user.fullName}!</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here you can manage your personal notes.
        </p>
        <div className="mt-6 flex space-x-4">
          <Link
            href="/notes"
            as="button"
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            My Notes
          </Link>
          <Link
            href="/logout"
            method="post"
            as="button"
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  )
}

Dashboard.layout = (page: any) => (
  <UserLayout children={page} />
)