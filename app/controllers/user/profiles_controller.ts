// title: app/controllers/user/profiles_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import Siswa from '#models/siswa'
import db from '@adonisjs/lucid/services/db'
import { updateUserProfileValidator } from '#validators/user'

export default class ProfilesController {
  async show({ auth, inertia }: HttpContext) {
    const user = auth.user!
    // Ambil data siswa yang berelasi dengan user
    const siswa = await Siswa.findBy('user_id', user.id)

    // Kirim data user dan siswa ke view
    return inertia.render('user/profile/index', {
      user: user.serialize(),
      siswa: siswa ? siswa.serialize() : null,
    })
  }

  async update({ auth, request, response, session }: HttpContext) {
    const user = auth.user!
    const siswa = await Siswa.findByOrFail('user_id', user.id)

    // Validasi input menggunakan validator yang baru dibuat
    const payload = await request.validateUsing(updateUserProfileValidator, {
      meta: { userId: user.id },
    })

    const trx = await db.transaction()
    try {
      // 1. Update data pada model User
      user.useTransaction(trx)
      user.merge({
        fullName: payload.fullName,
        email: payload.email,
      })

      if (payload.password) {
        user.password = payload.password
      }
      await user.save()

      // 2. Update data pada model Siswa
      siswa.useTransaction(trx)
      siswa.merge({
        namaLengkap: payload.fullName, // Jaga agar nama tetap konsisten
        nisn: payload.nisn,
        kelas: payload.kelas,
        tanggalLahir: payload.tanggalLahir,
        telepon: payload.telepon,
      })
      await siswa.save()

      await trx.commit()

      session.flash('success', 'Profil berhasil diperbarui!')
      return response.redirect().toRoute('user.profile.show')
    } catch (error) {
      await trx.rollback()
      session.flash('error', 'Gagal memperbarui profil. Silakan coba lagi.')
      return response.redirect().back()
    }
  }
}
