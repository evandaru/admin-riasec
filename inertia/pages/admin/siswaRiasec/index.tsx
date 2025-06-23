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
  SortingFn, // <-- TAMBAHKAN INI
} from '@tanstack/react-table'

// --- Data Interfaces ---
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
  user: User
  hasilTes: HasilTes[]
}

// --- Debounced Input for Search ---
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

// --- Fungsi Sorting Kustom ---
const statusTesSortingFn: SortingFn<Siswa> = (rowA, rowB) => {
  const statusA = rowA.original.hasilTes.length > 0
  const statusB = rowB.original.hasilTes.length > 0
  // Mengurutkan boolean, `true` (sudah tes) akan muncul sebelum `false` (belum tes) saat ascending
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

export default function SiswaIndex({ siswa }: { siswa: Siswa[] }) {
  const data = useMemo(() => siswa, [siswa])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const columnHelper = createColumnHelper<Siswa>()

  const columns = useMemo<ColumnDef<Siswa, any>[]>(
    () => [
      columnHelper.accessor((row, index) => index + 1, {
        id: 'no',
        header: '#',
        size: 50,
      }),
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
      }),
      columnHelper.display({
        id: 'statusTes',
        header: 'Status Tes',
        enableSorting: true, // Aktifkan sorting
        sortingFn: statusTesSortingFn, // Gunakan fungsi kustom
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
        enableSorting: true, // Aktifkan sorting
        sortingFn: kodeHollandSortingFn, // Gunakan fungsi kustom
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
                className={`p-2 rounded-full transition-colors ${!sudahTes ? 'text-gray-300 dark:text-gray-600' : 'text-gray-500 hover:text-orange-600 hover:bg-orange-100 dark:hover:bg-gray-700'}`}
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
        <Link
          href="/admin/siswa-riasec/create"
          className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Tambah Siswa Baru
        </Link>
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

      {/* Pagination Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-900 dark:text-white">
          Halaman {table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50 text-gray-900 dark:text-white dark:border-gray-600"
          >
            {'<<'}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50 text-gray-900 dark:text-white dark:border-gray-600"
          >
            {'<'}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50 text-gray-900 dark:text-white dark:border-gray-600"
          >
            {'>'}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-2 py-1 border rounded-md text-sm disabled:opacity-50 text-gray-900 dark:text-white dark:border-gray-600"
          >
            {'>>'}
          </button>
          <span className="flex items-center gap-1 text-sm text-gray-900 dark:text-white">
            | Ke halaman:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </span>
        </div>
      </div>
    </div>
  )
}

SiswaIndex.layout = (page: any) => <AdminLayout children={page} />
