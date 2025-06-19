// title: app/controllers/user/tests_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import RiasecPertanyaan from '#models/riasec_pertanyaan'
import HasilTes from '#models/hasil'
import JawabanTes from '#models/jawaban'
import Siswa from '#models/siswa'

export default class TestsController {
  // Method 'index' dan 'start' tidak perlu diubah, logikanya sudah benar
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user!
    const siswa = await Siswa.findBy('user_id', user.id)
    if (siswa) {
      const lastResult = await HasilTes.query()
        .where('siswa_id', siswa.id)
        .preload('siswa')
        .orderBy('created_at', 'desc')
        .first()
      if (lastResult) {
        return inertia.render('user/riasec/result', { hasilTes: lastResult })
      }
    }
    return inertia.render('user/riasec/index', { user: user.serialize() })
  }

  async start({ auth, inertia, response }: HttpContext) {
    const user = auth.user!
    const siswa = await Siswa.findByOrFail('user_id', user.id)
    const lastResult = await HasilTes.query().where('siswa_id', siswa.id).first()
    if (lastResult) {
      return response.redirect().toRoute('riasec.index')
    }
    const questions = await RiasecPertanyaan.query().orderBy('nomor_urut', 'asc')
    return inertia.render('user/riasec/test', { questions })
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const answers: Record<string, number> = request.input('answers')
    const siswa = await Siswa.findByOrFail('user_id', user.id)

    await db.transaction(async (trx) => {
      // ... logika penyimpanan data tidak berubah ...
      const allQuestions = await RiasecPertanyaan.query({ client: trx })
      const questionsMap = new Map(allQuestions.map((q) => [q.id, q.tipeRiasec]))
      const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
      for (const questionId in answers) {
        const score = answers[questionId]
        if (score && score >= 4) {
          const tipe = questionsMap.get(Number(questionId))
          if (tipe) scores[tipe]++
        }
      }
      const sortedScores = (Object.entries(scores) as [keyof typeof scores, number][]).sort(
        ([, a], [, b]) => b - a
      )
      const hollandCode = sortedScores
        .slice(0, 3)
        .map(([key]) => key)
        .join('')
      const hasil = await HasilTes.create(
        {
          siswaId: siswa.id,
          skorR: scores.R,
          skorI: scores.I,
          skorA: scores.A,
          skorS: scores.S,
          skorE: scores.E,
          skorC: scores.C,
          kodeHolland: hollandCode,
        },
        { client: trx }
      )
      const jawabanData = Object.entries(answers).map(([questionId, jawaban]) => ({
        hasilTesId: hasil.id,
        pertanyaanId: Number(questionId),
        jawaban: Number(jawaban),
      }))
      await JawabanTes.createMany(jawabanData, { client: trx })
    })

    // --- PERUBAHAN DI SINI ---
    // Redirect ke rute baru 'riasec.result' tanpa parameter
    return response.redirect().toRoute('riasec.result')
  }

  /**
   * Method baru untuk menampilkan hasil tes PENGGUNA YANG SEDANG LOGIN.
   */
  async showMyResult({ auth, inertia, response }: HttpContext) {
    const user = auth.user!
    const siswa = await Siswa.findByOrFail('user_id', user.id)

    // Cari hasil tes berdasarkan siswa_id dari user yang login
    const hasilTes = await HasilTes.query()
      .where('siswa_id', siswa.id)
      .preload('siswa') // preload relasi untuk menampilkan nama
      .orderBy('created_at', 'desc')
      .first()

    // Jika karena suatu alasan hasilnya tidak ada, kembalikan ke halaman utama riasec
    if (!hasilTes) {
      return response.redirect().toRoute('riasec.index')
    }

    // Tampilkan halaman hasil tes
    return inertia.render('user/riasec/result', { hasilTes })
  }

  // Method showResult({ params, inertia }) bisa DIHAPUS karena tidak dipakai lagi.
}
