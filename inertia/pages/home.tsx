import { Link } from '@inertiajs/react'

export default function Home() {
  return (
    // Bikin simpel, bersih, dan to the point
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
        Welcome to YourApp
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        The best place to manage your notes and users.
      </p>
      <div>
        {/* Tombol login yang keren */}
        <Link
          href="/login"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
