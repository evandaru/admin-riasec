import type { HttpContext } from '@adonisjs/core/http'
import Siswa from '#models/siswa'
import Hasil from '#models/hasil'
import RiasecService from '#services/riasec_service'

export default class PrintController {
  /**
   * Mengambil semua data siswa dan merender tabel yang bisa dicetak.
   */
  public async printAllSiswa({ inertia }: HttpContext) {
    const allSiswa = await Siswa.query()
      .preload('user', (query) => query.select('email'))
      .preload('hasilTes', (query) => query.orderBy('tanggal_tes', 'desc'))
      .orderBy('nama_lengkap', 'asc')

    // Serialisasi sederhana untuk tampilan cetak
    const serializedSiswa = allSiswa.map((s) => {
      const siswaData = s.serialize({
        relations: {
          user: {
            fields: ['email'],
          },
        },
      })
      // Tambahkan hasil tes terbaru secara manual
      siswaData.hasilTes = s.hasilTes.length > 0 ? [s.hasilTes[0].serialize()] : []
      return siswaData
    })

    return inertia.render('admin/print/all_students', {
      siswa: serializedSiswa,
    })
  }

  /**
   * Mengambil detail tes satu siswa dan merender laporan yang bisa dicetak.
   */
  public async printStudentDetail({ inertia, params }: HttpContext) {
    const siswa = await Siswa.query().where('id', params.id).preload('user').firstOrFail()

    const hasilTes = await Hasil.query()
      .where('siswa_id', siswa.id)
      .orderBy('tanggal_tes', 'desc')
      .first()

    const riasecService = new RiasecService()
    const recommendedInterests = hasilTes
      ? await riasecService.getInterestRecommendations(hasilTes, 10) // Ambil lebih banyak untuk laporan
      : []

    return inertia.render('admin/print/student_detail', {
      siswa: siswa.serialize(),
      hasilTes: hasilTes ? hasilTes.serialize() : null,
      recommendedInterests,
    })
  }
}
