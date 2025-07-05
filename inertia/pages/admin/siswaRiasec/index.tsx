// title: inertia/pages/admin/siswaRiasec/index.tsx
import { Link } from '@inertiajs/react'
import {
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Printer,
  ChevronLeft, // <-- Impor ikon baru
  ChevronRight, // <-- Impor ikon baru
} from 'lucide-react'
import AdminLayout from '../layouts/main'
import { useMemo, useState, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  createColumnHelper,
  flexRender,
  SortingState,
  ColumnDef,
  SortingFn,
  Table, // <-- Impor tipe Table
} from '@tanstack/react-table'

// --- Tipe Data (tidak ada perubahan) ---
interface User {
  id: number
  email: string
}
interface HasilTes {
  id: number
  kodeHolland: string | null
}
interface Siswa {
  id: number
  namaLengkap: string
  nisn: string | null
  kelas: string | null
  jenjang: string | null
  user: User
  hasilTes: HasilTes[]
}

// --- Komponen & Fungsi Helper (tidak ada perubahan) ---
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)
  useEffect(() => setValue(initialValue), [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    return () => clearTimeout(timeout)
  }, [value])
  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
}

const statusTesSortingFn: SortingFn<Siswa> = (rowA, rowB) => {
  const statusA = rowA.original.hasilTes.length > 0
  const statusB = rowB.original.hasilTes.length > 0
  return statusA === statusB ? 0 : statusA ? -1 : 1
}

const kodeHollandSortingFn: SortingFn<Siswa> = (rowA, rowB) => {
  const kodeA = rowA.original.hasilTes[0]?.kodeHolland
  const kodeB = rowB.original.hasilTes[0]?.kodeHolland
  if (kodeA && !kodeB) return -1
  if (!kodeA && kodeB) return 1
  if (!kodeA && !kodeB) return 0
  return (kodeA || '').localeCompare(kodeB || '')
}

// --- KOMPONEN PAGINATION BARU ---
function Pagination({ table }: { table: Table<Siswa> }) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()

  const getPaginationButtons = () => {
    const buttons = []
    const context = 1 // Jumlah halaman di sekitar halaman saat ini

    // Selalu tampilkan halaman pertama
    buttons.push(1)

    // Elipsis kiri
    if (currentPage > context + 2) {
      buttons.push('...')
    }

    // Halaman di sekitar halaman saat ini
    for (let i = currentPage - context; i <= currentPage + context; i++) {
      if (i > 1 && i < totalPages) {
        buttons.push(i)
      }
    }

    // Elipsis kanan
    if (currentPage < totalPages - context - 1) {
      buttons.push('...')
    }

    // Selalu tampilkan halaman terakhir
    if (totalPages > 1) {
      buttons.push(totalPages)
    }

    return [...new Set(buttons)] // Hapus duplikat
  }

  const paginationButtons = getPaginationButtons()
  if (totalPages <= 1) return null // Jangan tampilkan pagination jika hanya ada 1 halaman

  return (
    <nav aria-label="Pagination">
      <ul className="inline-flex items-center -space-x-px text-sm">
        <li>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </li>
        {paginationButtons.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                ...
              </span>
            ) : (
              <button
                onClick={() => table.setPageIndex((page as number) - 1)}
                className={`flex items-center justify-center px-3 h-8 leading-tight border ${currentPage === page
                  ? 'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

// --- KOMPONEN UTAMA ---
export default function SiswaIndex({ siswa }: { siswa: Siswa[] }) {
  const data = useMemo(() => siswa, [siswa])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columnHelper = createColumnHelper<Siswa>()

  const columns = useMemo<ColumnDef<Siswa, any>[]>(() => [
    columnHelper.accessor(
      (_row: Siswa, index: number): number =>
        table.getState().pagination.pageIndex * table.getState().pagination.pageSize + index + 1,
      {
        id: 'no',
        header: '#',
        size: 50,
        enableSorting: false,
      }
    ),
      columnHelper.accessor('namaLengkap', {
        header: 'Nama Lengkap',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.user?.email, {
        id: 'email',
        header: 'Email',
        cell: (info) => info.getValue() || 'N/A',
      }),
      columnHelper.accessor('kelas', {
        header: 'Kelas',
        cell: (info) => info.getValue() || '-',
        size: 80,
      }),
      columnHelper.accessor('jenjang', {
        header: 'Jenjang',
        cell: (info) => info.getValue() || '-',
        size: 90,
      }),
      columnHelper.display({
        id: 'statusTes',
        header: 'Status Tes',
        enableSorting: true,
        sortingFn: statusTesSortingFn,
        cell: ({ row }) => {
          const sudahTes = row.original.hasilTes && row.original.hasilTes.length > 0
          return sudahTes ? (
            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Sudah Tes
            </span>
          ) : (
            <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              Belum Tes
            </span>
          )
        },
      }),
      columnHelper.display({
        id: 'kodeHolland',
        header: 'Hasil (Kode)',
        enableSorting: true,
        sortingFn: kodeHollandSortingFn,
        cell: ({ row }) => {
          const hasilTerbaru =
            row.original.hasilTes && row.original.hasilTes.length > 0
              ? row.original.hasilTes[0]
              : null
          return <span className="font-mono">{hasilTerbaru?.kodeHolland || '-'}</span>
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Aksi',
        size: 140,
        cell: ({ row }) => {
          const item = row.original
          const sudahTes = item.hasilTes && item.hasilTes.length > 0
          return (
            <div className="flex items-center justify-end space-x-1">
              <Link
                href={`/admin/siswa-riasec/${item.id}`}
                title="Lihat Detail"
                className="p-2 text-gray-500 rounded-full transition-colors hover:text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                <Eye size={18} />
              </Link>
              <Link
                href={`/admin/siswa-riasec/${item.id}/edit`}
                title="Edit Siswa"
                className="p-2 text-gray-500 rounded-full transition-colors hover:text-indigo-600 hover:bg-indigo-100 dark:hover:bg-gray-700"
              >
                <Pencil size={18} />
              </Link>
              <Link
                href={`/admin/siswa-riasec/${item.id}/reset`}
                method="post"
                as="button"
                title="Reset Tes"
                className={`p-2 rounded-full transition-colors ${!sudahTes ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'text-gray-500 hover:text-orange-600 hover:bg-orange-100 dark:hover:bg-gray-700'}`}
                disabled={!sudahTes}
                onBefore={() => confirm('Yakin ingin mereset tes siswa ini?')}
              >
                <RefreshCw size={18} />
              </Link>
              <Link
                href={`/admin/siswa-riasec/${item.id}`}
                method="delete"
                as="button"
                title="Hapus Siswa"
                className="p-2 text-gray-500 rounded-full transition-colors hover:text-red-600 hover:bg-red-100 dark:hover:bg-gray-700"
                onBefore={() => confirm('Yakin ingin menghapus data siswa ini?')}
              >
                <Trash2 size={18} />
              </Link>
            </div>
          )
        },
      }),
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manajemen Siswa</h1>
        <div className="flex items-center space-x-2">
          <Link
            href="/admin/print/all-students"
            target="_blank"
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <Printer className="w-4 h-4 mr-2" />
            Cetak Semua
          </Link>
          <Link
            href="/admin/siswa-riasec/create"
            className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Tambah Siswa Baru
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="w-full max-w-sm p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Cari semua kolom..."
        />
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center gap-2'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <ChevronUp size={16} />,
                          desc: <ChevronDown size={16} />,
                        }[header.column.getIsSorted() as string] ??
                          (header.column.getCanSort() ? <ChevronsUpDown size={16} /> : null)}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION SECTION (TELAH DIPERBARUI) --- */}
      <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Halaman{' '}
          <strong className="font-medium text-gray-900 dark:text-white">
            {table.getState().pagination.pageIndex + 1}
          </strong>{' '}
          dari{' '}
          <strong className="font-medium text-gray-900 dark:text-white">
            {table.getPageCount()}
          </strong>
        </div>
        <Pagination table={table} />
      </div>
    </div>
  )
}

SiswaIndex.layout = (page: any) => <AdminLayout children={page} />