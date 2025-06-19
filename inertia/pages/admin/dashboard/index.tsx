import { Link } from '@inertiajs/react'
import AdminLayout from '../layouts/main'

export default function AdminDashboard({ user }: { user: { fullName: string } }) {
  return (
    // Layout dashboard yang proper
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
      <div className="mt-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold dark:text-white">Welcome, {user.fullName}!</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          This is the admin control panel. You have super powers here.
        </p>
        <div className="mt-6 flex space-x-4">
          <Link
            href="/admin/users"
            as="button"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Manage Users
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

AdminDashboard.layout = (page: any) => (
<AdminLayout children={page} />
)