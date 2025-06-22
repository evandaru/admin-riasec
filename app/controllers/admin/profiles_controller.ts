import type { HttpContext } from '@adonisjs/core/http'
import { updateAdminProfileValidator } from '#validators/user'

export default class ProfilesController {
  public async show({ auth, inertia }: HttpContext) {
    const admin = auth.user!
    return inertia.render('admin/profile/index', {
      user: admin.serialize(),
    })
  }
  public async update({ auth, request, response, session }: HttpContext) {
    const admin = auth.user!

    // Validasi input, dengan menyertakan userId saat ini agar validasi email unik mengabaikannya.
    const payload = await request.validateUsing(updateAdminProfileValidator, {
      meta: {
        userId: admin.id,
      },
    })

    // Gabungkan data nama lengkap dan email
    admin.merge({
      fullName: payload.fullName,
      email: payload.email,
    })

    // Hanya update password jika field diisi
    if (payload.password) {
      admin.password = payload.password
    }

    await admin.save()

    session.flash('success', 'Profil berhasil diperbarui!')
    return response.redirect().toRoute('admin.profile.show')
  }
}
