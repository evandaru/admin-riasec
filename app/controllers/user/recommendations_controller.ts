// title: app/controllers/user/recommendations_controller.ts

import { getHybridRecommendations } from '#services/recommendation_service'
import type { HttpContext } from '@adonisjs/core/http'
import Siswa from '#models/siswa'

export default class RecommendationsController {
  /**
   * Menampilkan halaman rekomendasi program untuk siswa yang sedang login.
   */
  public async index({ auth, inertia, response }: HttpContext) {
    const user = auth.user!
    const siswa = await Siswa.findBy('user_id', user.id)

    if (!siswa) {
      // Handle jika profil siswa tidak ditemukan
      return response.redirect().toRoute('dashboard')
    }

    // Panggil service untuk mendapatkan rekomendasi
    const recommendedPrograms = await getHybridRecommendations(siswa.id)

    return inertia.render('user/recommendations/index', {
      programs: recommendedPrograms,
    })
  }
}
