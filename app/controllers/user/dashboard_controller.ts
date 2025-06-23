// title: app/controllers/user/dashboard_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Siswa from '#models/siswa'
import Hasil from '#models/hasil'

export default class DashboardController {
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user!
    const siswa = await Siswa.findBy('user_id', user.id)

    let latestResult: Hasil | null = null
    if (siswa) {
      latestResult = await Hasil.query()
        .where('siswa_id', siswa.id)
        .orderBy('created_at', 'desc')
        .first()
    }

    return inertia.render('user/dashboard/index', {
      user: user.serialize(),
      siswa: siswa ? siswa.serialize() : null,
      latestResult: latestResult ? latestResult.serialize() : null,
    })
  }
}
