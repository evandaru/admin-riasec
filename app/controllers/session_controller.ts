// title: app/controllers/session_controller.ts
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  public async create({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  public async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    if (user.role === 'admin') {
      return response.redirect().toRoute('admin.dashboard')
    }
    return response.redirect().toRoute('dashboard')
  }

  public async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('auth.login')
  }
}
