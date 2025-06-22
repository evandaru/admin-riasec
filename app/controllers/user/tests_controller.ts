// title: app/controllers/user/tests_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import Siswa from '#models/siswa'
import Hasil from '#models/hasil'
import RiasecPertanyaan from '#models/riasec_pertanyaan'
import RiasecService from '#services/riasec_service'
import { getHybridRecommendations } from '#services/recommendation_service'
// Import model MinatBakat tidak lagi diperlukan di sini
// import Interest from '#models/minat_bakat'

export default class TestsController {
  /**
   * Menampilkan halaman utama: hasil terakhir jika ada, atau halaman untuk memulai tes.
   */
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user!
    const siswa = await Siswa.findBy('user_id', user.id)

    if (siswa) {
      const lastResult = await Hasil.query()
        .where('siswa_id', siswa.id)
        .preload('siswa')
        .orderBy('created_at', 'desc')
        .first()

      if (lastResult) {
        return this._renderResultPage(inertia, siswa, lastResult)
      }
    }
    return inertia.render('user/riasec/index', { user: user.serialize() })
  }

  /**
   * Memulai sesi tes baru.
   */
  async start({ auth, inertia, response }: HttpContext) {
    const user = auth.user!
    const siswa = await Siswa.findByOrFail('user_id', user.id)

    const lastResult = await Hasil.query().where('siswa_id', siswa.id).first()
    if (lastResult) {
      return response.redirect().toRoute('riasec.result') // Langsung ke hasil jika sudah ada
    }

    const questions = await RiasecPertanyaan.query().orderBy('nomor_urut', 'asc')
    return inertia.render('user/riasec/test', { questions })
  }

  /**
   * Menyimpan jawaban tes dan memproses hasilnya melalui service.
   */
  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const answers: Record<string, number> = request.input('answers')
    const siswa = await Siswa.findByOrFail('user_id', user.id)

    const riasecService = new RiasecService()
    await riasecService.processTest(siswa.id, answers)

    return response.redirect().toRoute('riasec.result')
  }

  /**
   * Menampilkan halaman hasil tes milik pengguna yang sedang login.
   */
  async showMyResult({ auth, inertia, response }: HttpContext) {
    const user = auth.user!
    const siswa = await Siswa.findByOrFail('user_id', user.id)

    const hasilTes = await Hasil.query()
      .where('siswa_id', siswa.id)
      .preload('siswa')
      .orderBy('created_at', 'desc')
      .first()

    if (!hasilTes) {
      return response.redirect().toRoute('riasec.index')
    }

    return this._renderResultPage(inertia, siswa, hasilTes)
  }

  /**
   * [REFAKTOR] Private helper method untuk mengambil data dan merender halaman hasil.
   */
  private async _renderResultPage(inertia: HttpContext['inertia'], siswa: Siswa, hasilTes: Hasil) {
    // Inisialisasi service yang akan kita gunakan
    const riasecService = new RiasecService()

    // 1. Ambil rekomendasi minat & bakat dari service.
    // Metode baru ini sudah memiliki logika pembobotan dan pembatasan (default 6).
    const recommendedInterests = await riasecService.getInterestRecommendations(hasilTes, 6) // <-- DIUBAH MENJADI 5 SESUAI PERMINTAAN

    // 2. Ambil rekomendasi program menggunakan sistem hybrid.
    // Logika ini tetap sama dan sudah benar.
    const recommendedPrograms = await getHybridRecommendations(siswa.id)

    // 3. Render halaman dengan data yang sudah bersih dan terstruktur.
    return inertia.render('user/riasec/result', {
      hasilTes,
      recommendedPrograms,
      recommendedInterests, // <- Data ini sekarang sudah dibatasi menjadi 5 item paling relevan.
    })
  }
}
