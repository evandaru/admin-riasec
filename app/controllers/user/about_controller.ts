import type { HttpContext } from '@adonisjs/core/http'

export default class AboutController {
  async index({ inertia }: HttpContext) {
    return inertia.render('user/about/index')
  }
}
