import { Link } from '@inertiajs/react'
import {
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
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
  ColumnFiltersState,
  Table,
} from '@tanstack/react-table'

// --- Tipe Data (tidak berubah) ---
interface Pertanyaan {
  id: number
  teksPertanyaan: string
  tipeRiasec: 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
  nomorUrut: number | null
}

// --- Debounced Input for Search (tidak berubah) ---
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

// --- KOMPONEN PAGINATION BARU ---
function Pagination({ table }: { table: Table<Pertanyaan> }) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()

  const getPaginationButtons = () => {
    const buttons: (string | number)[] = []
    const context = 1

    buttons.push(1)
    if (currentPage > context + 2) {
      buttons.push('...')
    }
    for (let i = Math.max(2, currentPage - context); i <= Math.min(totalPages - 1, currentPage + context); i++) {
      buttons.push(i)
    }
    if (currentPage < totalPages - context - 1) {
      buttons.push('...')
    }
    if (totalPages > 1) {
      buttons.push(totalPages)
    }
    return [...new Set(buttons)]
  }

  const paginationButtons = getPaginationButtons()
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination">
      <ul className="inline-flex items-center -space-x-px text-sm">
        <li>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
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
                    ? 'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
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
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </li>
      </ul>
    </nav>
  )
}


// --- Komponen Utama ---
export default function PertanyaanIndex({ pertanyaan }: { pertanyaan: Pertanyaan[] }) {
  const data = useMemo(() => pertanyaan, [pertanyaan])
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const riasecColors: Record<string, string> = {
    R: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    I: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    A: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    S: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    E: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    C: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  }

  const columnHelper = createColumnHelper<Pertanyaan>()

  const columns = useMemo<ColumnDef<Pertanyaan, any>[]>(
    () => [
      columnHelper.accessor((row, index) => index, { // Gunakan index sebagai basis
        id: 'no',
        header: '#',
        size: 50,
        enableSorting: false,
        cell: (info) => // Kalkulasi nomor baris di dalam cell render
          info.row.index + 1 + info.table.getState().pagination.pageIndex * info.table.getState().pagination.pageSize,
      }),
      columnHelper.accessor('tipeRiasec', {
        header: 'Tipe',
        size: 100,
        cell: (info) => (
          <div className="text-center">
            <span
              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${riasecColors[info.getValue()]}`}
            >
              {info.getValue()}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor('teksPertanyaan', {
        header: 'Teks Pertanyaan',
        cell: (info) => <div className="whitespace-normal">{info.getValue()}</div>,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Aksi',
        size: 120,
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex items-center justify-end space-x-1">
              <Link
                href={`/admin/pertanyaan/${item.id}/edit`}
                title="Edit Pertanyaan"
                className="p-2 text-gray-500 rounded-full transition-colors hover:text-indigo-600 hover:bg-indigo-100 dark:hover:bg-gray-700"
              >
                <Pencil size={18} />
              </Link>
              <Link
                href={`/admin/pertanyaan/${item.id}`}
                method="delete"
                as="button"
                title="Hapus Pertanyaan"
                className="p-2 text-gray-500 rounded-full transition-colors hover:text-red-600 hover:bg-red-100 dark:hover:bg-gray-700"
                onBefore={() => confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?')}
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
    state: { sorting, globalFilter, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Manajemen Pertanyaan RIASEC
        </h1>
        <Link
          href="/admin/pertanyaan/create"
          className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          Tambah Pertanyaan
        </Link>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="w-full max-w-sm p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Cari semua kolom..."
        />

        <div>
          <select
            value={(table.getColumn('tipeRiasec')?.getFilterValue() as string) ?? ''}
            onChange={(e) => table.getColumn('tipeRiasec')?.setFilterValue(e.target.value)}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Semua Tipe</option>
            {['R', 'I', 'A', 'S', 'E', 'C'].map((tipe) => (
              <option key={tipe} value={tipe}>
                Tipe {tipe}
              </option>
            ))}
          </select>
        </div>
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
                        {{ asc: <ChevronUp size={16} />, desc: <ChevronDown size={16} /> }[
                          header.column.getIsSorted() as string
                        ] ?? (header.column.getCanSort() ? <ChevronsUpDown size={16} /> : null)}
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
                  <td key={cell.id} className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
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
        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
          <span>
            Halaman{' '}
            <strong className="font-medium text-gray-900 dark:text-white">
              {table.getState().pagination.pageIndex + 1}
            </strong>{' '}
            dari{' '}
            <strong className="font-medium text-gray-900 dark:text-white">
              {table.getPageCount()}
            </strong>
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="flex items-center gap-1">
            Ke Halaman:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </span>
        </div>

        <Pagination table={table} />

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">Baris per halaman:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
            className="p-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {[10, 20, 50, 100].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

PertanyaanIndex.layout = (page: any) => <AdminLayout children={page} />