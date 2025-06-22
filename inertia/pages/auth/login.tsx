import { useForm, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  // State for alert feedback
  const [alert, setAlert] = useState({
    show: false,
    type: 'success', // 'success' or 'error'
    message: '',
  });

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    post('/login', {
      onSuccess: () => {
        setAlert({
          show: true,
          type: 'success',
          message: 'Login successful! Redirecting...',
        });
        // Optional: Clear alert after a few seconds
        setTimeout(() => setAlert({ show: false, type: 'success', message: '' }), 3000);
      },
      onError: () => {
        setAlert({
          show: true,
          type: 'error',
          message: 'Login failed. Please check your credentials.',
        });
      },
    });
  }

  // Function to close the alert
  const closeAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Form Card */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Login</h1>
        <form onSubmit={submit} className="space-y-6">
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
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
            {errors.email && <div className="mt-1 text-xs text-red-500">{errors.email}</div>}
          </div>

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
              onChange={(e) => setData('password', e.target.value)}
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
            {errors.password && <div className="mt-1 text-xs text-red-500">{errors.password}</div>}
          </div>

          <div>
            <button
              type="submit"
              disabled={processing}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {processing ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="text-center text-sm">
          <Link
            href="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>

      {/* Floating Alert - Positioned at the bottom of the screen */}
      {alert.show && (
        <div
          className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 rounded-md flex justify-between items-center shadow-lg transition-opacity duration-300 ${alert.type === 'success'
              ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'
            }`}
        >
          <span>{alert.message}</span>
          <button
            onClick={closeAlert}
            className="text-sm font-medium focus:outline-none hover:opacity-75"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}