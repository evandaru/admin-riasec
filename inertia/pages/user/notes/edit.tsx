// title: inertia/pages/user/notes/edit.tsx
import { useForm, Link } from '@inertiajs/react'

interface Note {
  id: number
  title: string
  content: string
}

export default function EditNote({ note }: { note: Note }) {
  const { data, setData, put, processing, errors } = useForm({
    title: note.title,
    content: note.content,
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    put(`/notes/${note.id}`)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Edit Note</h1>
      <Link href="/notes" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
        &larr; Back to Notes
      </Link>

      <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
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
              rows={8}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.content && <div className="mt-1 text-xs text-red-500">{errors.content}</div>}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
            >
              {processing ? 'Saving...' : 'Update Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
