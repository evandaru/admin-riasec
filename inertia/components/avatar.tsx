import React from 'react'

// Palet warna yang bagus dan mudah diakses (background + warna teks)
const colorPalette = [
  { bg: 'bg-red-500', text: 'text-white' },
  { bg: 'bg-orange-500', text: 'text-white' },
  { bg: 'bg-amber-500', text: 'text-white' },
  { bg: 'bg-green-500', text: 'text-white' },
  { bg: 'bg-teal-500', text: 'text-white' },
  { bg: 'bg-blue-500', text: 'text-white' },
  { bg: 'bg-indigo-500', text: 'text-white' },
  { bg: 'bg-purple-500', text: 'text-white' },
  { bg: 'bg-pink-500', text: 'text-white' },
]

/**
 * Menghasilkan warna yang konsisten dari palet berdasarkan input string.
 * Ini memastikan warna avatar akan selalu sama untuk nama yang sama.
 * @param str String input (contoh: nama lengkap pengguna)
 * @returns Objek warna dari palet
 */
const getColorFromString = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash % colorPalette.length)
  return colorPalette[index]
}

interface AvatarProps {
  name: string
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ name, className = 'h-9 w-9' }) => {
  // Ambil huruf pertama, default ke 'A' jika nama kosong
  const initial = name ? name.charAt(0).toUpperCase() : 'A'

  // Dapatkan warna yang konsisten berdasarkan nama
  const color = getColorFromString(name || 'Default')

  return (
    <div
      className={`
        ${className}
        ${color.bg}
        flex
        items-center
        justify-center
        rounded-full
        font-bold
        select-none
      `}
      title={name} // Tambahkan tooltip dengan nama lengkap
    >
      <span className={color.text}>{initial}</span>
    </div>
  )
}

export default Avatar
