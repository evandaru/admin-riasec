// title: app/controllers/admin/dashboard_controller.ts
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminDashboardController {
  index({ auth, inertia }: HttpContext) {
    const admin = auth.user!
    return inertia.render('admin/dashboard/index', {
      user: admin.serialize(),
    })
  }
}
