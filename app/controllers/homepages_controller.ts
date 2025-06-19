// title: app/controllers/home_controller.ts
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  // Cuma buat ngerender halaman home
  index({ inertia }: HttpContext) {
    return inertia.render('home')
  }
}
