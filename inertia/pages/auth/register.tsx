// title: inertia/pages/auth/register.tsx
import { useForm, Link, Head } from '@inertiajs/react'
import React from 'react'

export default function Register() {
  const { data, setData, post, processing, errors } = useForm({
    fullName: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/register')
  }

  return (
    <>
      <Head title="Register" />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Create an Account
          </h1>
          <form onSubmit={submit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={data.fullName}
                onChange={(e) => setData('fullName', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
              />
              {errors.fullName && (
                <div className="mt-1 text-xs text-red-500">{errors.fullName}</div>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
              />
              {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={data.password}
                autoComplete="new-password"
                onChange={(e) => setData('password', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
              />
              {errors.password && (
                <div className="mt-1 text-xs text-red-500">{errors.password}</div>
              )}
            </div>

            {/* Password Confirmation */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                autoComplete="new-password"
                onChange={(e) => setData('password_confirmation', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
              >
                {processing ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
          <div className="text-center text-sm">
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
