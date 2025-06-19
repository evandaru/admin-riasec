// title: inertia/pages/user/notes/index.tsx
import { Link, useForm } from '@inertiajs/react'
import UserLayout from '../layouts/main'

interface Note {
  id: number
  title: string
  content: string
}

export default function NotesIndex({ notes }: { notes: Note[] }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    content: '',
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Kalo berhasil, form-nya kita reset biar kosong lagi
    post('/notes', {
      onSuccess: () => reset(),
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Notes</h1>
        <Link
          href="/dashboard"
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          &larr; Back to Dashboard
        </Link>
      </div>

      {/* Form buat bikin catatan baru, kita bungkus dalam card */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Create New Note
        </h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="What's on your mind?"
            />
            {errors.title && <div className="mt-1 text-xs text-red-500">{errors.title}</div>}
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Content
            </label>
            <textarea
              id="content"
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Jot down your thoughts..."
            />
            {errors.content && <div className="mt-1 text-xs text-red-500">{errors.content}</div>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Saving...' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>

      <hr className="my-8 border-gray-200 dark:border-gray-700" />

      {/* Daftar catatan dalam bentuk grid cards, lebih modern! */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between transition hover:shadow-lg"
            >
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <Link
                  href={`/notes/${note.id}/edit`}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Edit
                </Link>
                <Link
                  href={`/notes/${note.id}`}
                  method="delete"
                  as="button"
                  className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  onBefore={() => confirm('Are you sure you want to delete this note?')}
                >
                  Delete
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            You haven't created any notes yet.
          </p>
        )}
      </div>
    </div>
  )
}

NotesIndex.layout = (page: any) => (
  <UserLayout children={page} />
)