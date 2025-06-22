// title: inertia/pages/admin/pertanyaan/create.tsx
import { Link, useForm, Head } from '@inertiajs/react'
import AdminLayout from '../layouts/main'

export default function CreatePertanyaan() {
  const { data, setData, post, processing, errors } = useForm({
    teksPertanyaan: '',
    tipeRiasec: 'R' as 'R' | 'I' | 'A' | 'S' | 'E' | 'C', // Default ke 'R'
  })

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    post('/admin/pertanyaan')
  }

  return (
    <>
      <Head title="Tambah Pertanyaan RIASEC" />
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tambah Pertanyaan Baru
          </h1>
          <Link
            href="/admin/pertanyaan"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            ← Kembali ke Daftar
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <form onSubmit={submit} className="space-y-6">
            {/* Tipe RIASEC */}
            <div>
              <label
                htmlFor="tipeRiasec"
                className="block  text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tipe RIASEC <span className="text-red-500">*</span>
              </label>
              <select
                id="tipeRiasec"
                value={data.tipeRiasec}
                onChange={(e) => setData('tipeRiasec', e.target.value as typeof data.tipeRiasec)}
                className="mt-1 px-3 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="R">R - Realistic</option>
                <option value="I">I - Investigative</option>
                <option value="A">A - Artistic</option>
                <option value="S">S - Social</option>
                <option value="E">E - Enterprising</option>
                <option value="C">C - Conventional</option>
              </select>
              {errors.tipeRiasec && (
                <div className="text-xs text-red-500 mt-1">{errors.tipeRiasec}</div>
              )}
            </div>

            {/* Teks Pertanyaan */}
            <div>
              <label
                htmlFor="teksPertanyaan"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Teks Pertanyaan <span className="text-red-500">*</span>
              </label>
              <textarea
                id="teksPertanyaan"
                rows={4}
                value={data.teksPertanyaan}
                onChange={(e) => setData('teksPertanyaan', e.target.value)}
                className="mt-1 block px-3 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Contoh: Saya suka bekerja dengan peralatan mesin."
                required
              />
              {errors.teksPertanyaan && (
                <div className="text-xs text-red-500 mt-1">{errors.teksPertanyaan}</div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={processing}
                className="inline-flex justify-center px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 transition-colors"
              >
                {processing ? 'Menyimpan...' : 'Simpan Pertanyaan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

// Menggunakan layout admin yang sudah ada
CreatePertanyaan.layout = (page: any) => <AdminLayout children={page} />
