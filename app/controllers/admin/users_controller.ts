// title: app/controllers/admin/users_controller.ts
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class UsersController {
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const usersPaginated = await User.query().paginate(page, limit)

    // Format pagination links
    const paginationLinks = usersPaginated
      .getUrlsForRange(1, usersPaginated.lastPage)
      .map((link) => ({
        page: link.page,
        url: link.url,
      }))

    return inertia.render('admin/users/index', {
      users: usersPaginated.serialize().data, // hanya array user
      paginationLinks, // array pagination
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('admin/users/create')
  }

  async store({ request, response }: HttpContext) {
    let payload = await request.validateUsing(createUserValidator)
    // Map role 'user' to 'siswa' to match allowed enum values
    const userPayload = {
      ...payload,
      role: payload.role === 'user' ? 'siswa' : payload.role,
    }
    await User.create(userPayload)
    return response.redirect().toRoute('admin.dashboard')
  }

  async edit({ params, inertia }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return inertia.render('admin/users/edit', { user })
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(updateUserValidator)

    if (payload.email && payload.email !== user.email) {
      await vine.validate({
        schema: vine.object({
          email: vine
            .string()
            .email()
            .unique(async (db, value) => {
              const match = await db
                .from('users')
                .where('email', value)
                .whereNot('id', user.id)
                .first()
              return !match
            }),
        }),
        data: { email: payload.email },
      })
    }

    // Map role 'user' to 'siswa' to match allowed enum values
    const userPayload = {
      ...payload,
      role: payload.role === 'user' ? 'siswa' : payload.role,
    }

    user.merge(userPayload)
    await user.save()

    return response.redirect().toRoute('admin.dashboard')
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const user = await User.findOrFail(params.id)

    await bouncer.with('UserPolicy').authorize('delete', user)
    await user.delete()
    return response.redirect().toRoute('admin.dashboard')
  }
}
