import type { HttpContext } from '@adonisjs/core/http'
import Siswa from '#models/siswa'
import Hasil from '#models/hasil'
import RiasecPertanyaan from '#models/riasec_pertanyaan'
import RiasecService from '#services/riasec_service'
import { getHybridRecommendations } from '#services/recommendation_service'

export default class TestsController {
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

  async start({ auth, inertia, response }: HttpContext) {
    const user = auth.user!
    const siswa = await Siswa.findByOrFail('user_id', user.id)

    const lastResult = await Hasil.query().where('siswa_id', siswa.id).first()
    if (lastResult) {
      return response.redirect().toRoute('riasec.result')
    }

    const questions = await RiasecPertanyaan.query().orderBy('nomor_urut', 'asc')
    return inertia.render('user/riasec/test', { questions })
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const answers: Record<string, number> = request.input('answers')
    const siswa = await Siswa.findByOrFail('user_id', user.id)

    const riasecService = new RiasecService()
    await riasecService.processTest(siswa.id, answers)

    return response.redirect().toRoute('riasec.result')
  }

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

  private async _renderResultPage(inertia: HttpContext['inertia'], siswa: Siswa, hasilTes: Hasil) {
    const riasecService = new RiasecService()

    const recommendedInterests = await riasecService.getInterestRecommendations(hasilTes, 6)
    const recommendedPrograms = await getHybridRecommendations(siswa.id)

    return inertia.render('user/riasec/result', {
      hasilTes,
      recommendedPrograms,
      recommendedInterests,
    })
  }
}
