// title: app/controllers/admin/dashboard_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Siswa from '#models/siswa'
import Hasil from '#models/hasil'
import db from '@adonisjs/lucid/services/db'

export default class AdminDashboardController {
  async index({ auth, inertia, request }: HttpContext) {
    const admin = auth.user!

    // 1. Hitung total siswa
    const totalSiswa = await Siswa.query().count('* as total')

    // 2. Hitung siswa yang sudah tes
    const siswaSudahTes = await Hasil.query().countDistinct('siswa_id as total')

    // 3. Hitung distribusi tipe dominan RIASEC
    const riasecCounts = await db
      .from('hasil_tes')
      .select(db.raw('SUBSTRING(kode_holland, 1, 1) as type'))
      .count('* as count')
      .whereNotNull('kode_holland')
      .groupBy('type')

    // Siapkan struktur data untuk memastikan semua tipe ada
    const riasecDistribution = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
    riasecCounts.forEach((item: { type: keyof typeof riasecDistribution; count: number }) => {
      if (item.type in riasecDistribution) {
        riasecDistribution[item.type] = Number(item.count) // Pastikan count adalah number
      }
    })

    // 4. Ambil 5 siswa yang baru saja menyelesaikan tes
    // --- PERUBAHAN DI SINI ---
    // Mengurutkan berdasarkan `tanggal_tes` untuk akurasi waktu penyelesaian tes.
    const recentTestTakers = await Hasil.query()
      .preload('siswa')
      .orderBy('tanggal_tes', 'desc') // DIUBAH DARI 'created_at'
      .limit(5)

    // 5. Kirim semua statistik ke view
    const stats = {
      totalSiswa: totalSiswa[0].$extras.total,
      siswaSudahTes: siswaSudahTes[0].$extras.total,
      siswaBelumTes: totalSiswa[0].$extras.total - siswaSudahTes[0].$extras.total,
      // eslint-disable-next-line @unicorn/no-await-expression-member
      totalAdmin: (await User.query().where('role', 'admin').count('* as total'))[0].$extras.total,
      riasecDistribution,
      recentTestTakers: recentTestTakers.map((hasil) => hasil.serialize()),
    }

    return inertia.render('admin/dashboard/index', {
      user: admin.serialize(),
      stats,
      url: request.url(),
    })
  }
}
