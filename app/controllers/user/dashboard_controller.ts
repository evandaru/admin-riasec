// title: app/controllers/user/dashboard_controller.ts
import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  index({ auth, inertia }: HttpContext) {
    const user = auth.user!
    return inertia.render('user/dashboard/index', {
      user: user.serialize(),
    })
  }
}
