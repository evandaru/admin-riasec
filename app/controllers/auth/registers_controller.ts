// title: app/controllers/auth/registers_controller.ts
import User from '#models/user'
import Siswa from '#models/siswa' // <-- 1. Impor model Siswa
import { registerUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db' // <-- 2. Impor service database

export default class RegisterController {
  create({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)

    // --- 3. Gunakan Database Transaction ---
    // Ini memastikan bahwa User dan Siswa berhasil dibuat bersama-sama.
    // Jika salah satu gagal, semua perubahan akan dibatalkan.
    const user = await db.transaction(async (trx) => {
      // Buat user baru di dalam transaksi
      const newUser = await User.create(
        {
          fullName: payload.fullName,
          email: payload.email,
          password: payload.password,
          role: 'siswa', // Secara eksplisit atur role untuk setiap pendaftar baru
        },
        { client: trx } // Gunakan transaction client (trx)
      )

      // Buat profil Siswa yang berelasi dengan user baru
      await Siswa.create(
        {
          userId: newUser.id,
          namaLengkap: newUser.fullName!, // Ambil nama dari user yang baru dibuat
          // Kolom lain seperti nisn, kelas, dll bisa diisi nanti melalui halaman profil
        },
        { client: trx } // Gunakan transaction client (trx)
      )

      // Kembalikan objek user yang baru dibuat dari transaksi
      return newUser
    })

    // Setelah transaksi berhasil, loginkan user
    await auth.use('web').login(user)

    // Redirect ke dashboard
    return response.redirect().toRoute('dashboard')
  }
}
