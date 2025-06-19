import Siswa from '#models/siswa'
import type { HttpContext } from '@adonisjs/core/http'

export default class SiswaRiasecsController {
  async index({ inertia }: HttpContext) {
    // Mengambil data siswa beserta relasi yang dibutuhkan
    const siswa = await Siswa.query()
      .preload('user') // Memuat relasi 'user' untuk mendapatkan data email
      .preload('hasilTes', (query) => {
        // Memuat relasi 'hasilTes' dan mengurutkannya
        // agar tes terbaru selalu menjadi item pertama dalam array
        query.orderBy('tanggal_tes', 'desc')
      })
      .orderBy('nama_lengkap', 'asc') // Mengurutkan daftar siswa berdasarkan nama secara alfabetis

    // Mengirim data 'siswa' yang sudah lengkap dengan relasinya ke komponen Inertia
    return inertia.render('admin/siswaRiasec/index', { siswa })
  }
}
