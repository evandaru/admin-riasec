// title: inertia/pages/admin/users/create.tsx
import { Link, useForm, Head } from '@inertiajs/react'

export default function CreateUser() {
  const { data, setData, post, processing, errors } = useForm({
    fullName: '',
    email: '',
    password: '',
    role: 'user' as 'user' | 'admin',
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/admin/users')
  }

  return (
    <>
      <Head title="Create User" />
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create New User</h1>
          <Link href="/admin/users" className="text-indigo-600 hover:underline">
            &larr; Back to Users
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={submit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={data.fullName}
                onChange={(e) => setData('fullName', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.fullName && (
                <div className="text-xs text-red-500 mt-1">{errors.fullName}</div>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={data.password}
                autoComplete="new-password"
                onChange={(e) => setData('password', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              {errors.password && (
                <div className="text-xs text-red-500 mt-1">{errors.password}</div>
              )}
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                value={data.role}
                onChange={(e) => setData('role', e.target.value as 'user' | 'admin')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              {errors.role && <div className="text-xs text-red-500 mt-1">{errors.role}</div>}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400"
              >
                {processing ? 'Creating...' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
