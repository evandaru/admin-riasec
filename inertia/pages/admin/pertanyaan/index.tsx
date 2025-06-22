import { Link } from '@inertiajs/react'
import { Pencil, Trash2, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
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
  ColumnFiltersState, // BARU: Impor tipe untuk filter kolom
} from '@tanstack/react-table'

// --- Data Interface (tidak berubah) ---
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

// --- Komponen Utama ---
export default function PertanyaanIndex({ pertanyaan }: { pertanyaan: Pertanyaan[] }) {
  const data = useMemo(() => pertanyaan, [pertanyaan])

  // --- State untuk tabel ---
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  // BARU: State untuk menyimpan filter per kolom
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
      // ... Definisi kolom lainnya tidak berubah ...
      columnHelper.accessor((row, index) => index + 1, {
        id: 'no',
        header: '#',
        size: 50,
        enableSorting: false,
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
    // DIUBAH: Tambahkan state filter kolom
    state: { sorting, globalFilter, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    // BARU: Tambahkan handler untuk perubahan filter kolom
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Ini yang akan memproses filter
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

      {/* DIUBAH: Kelompokkan kontrol filter */}
      <div className="flex items-center gap-4 mb-4">
        {/* Global Search */}
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="w-full max-w-sm p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Cari semua kolom..."
        />

        {/* BARU: Filter Dropdown untuk Tipe RIASEC */}
        <div>
          <select
            value={(table.getColumn('tipeRiasec')?.getFilterValue() as string) ?? ''}
            onChange={(e) => table.getColumn('tipeRiasec')?.setFilterValue(e.target.value)}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Semua Tipe</option>
            {/* Opsi untuk setiap tipe RIASEC */}
            {['R', 'I', 'A', 'S', 'E', 'C'].map((tipe) => (
              <option key={tipe} value={tipe}>
                 {tipe}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Bagian Tabel dan Paginasi (TIDAK BERUBAH) --- */}
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

      <div className="mt-6 flex items-center justify-between">
        {/* ... Kontrol Paginasi ... */}
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
        {/* ... */}
      </div>
    </div>
  )
}

PertanyaanIndex.layout = (page: any) => <AdminLayout children={page} />
