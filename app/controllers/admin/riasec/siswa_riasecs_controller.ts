// title: app/controllers/admin/riasec/siswa_riasecs_controller.ts
import Siswa from '#models/siswa'
import Hasil from '#models/hasil'
import User from '#models/user'
import RiasecService from '#services/riasec_service'
import { getHybridRecommendations } from '#services/recommendation_service'
import { createSiswaValidator, updateSiswaValidator } from '#validators/siswa'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { Exception } from '@adonisjs/core/exceptions'
import { re } from 'mathjs'

/**
 * Controller for managing RIASEC students
 */
export default class SiswaRiasecsController {
  /**
   * Display a list of all students for TanStack Table.
   */
  async index({ inertia, session, request }: HttpContext) {
    try {
      // Fetch all students instead of paginating
      const allSiswa = await Siswa.query()
        .preload('user')
        .preload('hasilTes', (query) => query.orderBy('tanggal_tes', 'desc').limit(1))
        .orderBy('nama_lengkap', 'asc')

      // Serialize the data to be sent to the view
      return inertia.render('admin/siswaRiasec/index', {
        siswa: allSiswa.map((s) => s.serialize()),
        url: request.url(), // Tambahin URL
        user: request.ctx?.auth?.user?.serialize() || null, // Tambahin user
      })
    } catch (error) {
      session.flash('error', 'Gagal memuat daftar siswa')
      return inertia.render('admin/siswaRiasec/index', {
        siswa: [],
        url: request.url(), // Tambahin URL di error case juga
        user: request.ctx?.auth?.user?.serialize() || null, // Tambahin user
      })
    }
  }

  /**
   * Show the student creation form
   */
  async create({ inertia, request }: HttpContext) {
    return inertia.render('admin/siswaRiasec/create', { url: request.url() })
  }

  /**
   * Store a new student with associated user
   */
  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createSiswaValidator)
    const trx = await db.transaction()

    try {
      const user = await User.create(
        {
          email: payload.email,
          password: payload.password,
          fullName: payload.namaLengkap,
          role: 'siswa',
        },
        { client: trx }
      )

      await Siswa.create(
        {
          userId: user.id,
          namaLengkap: payload.namaLengkap,
          nisn: payload.nisn,
          kelas: payload.kelas,
          tanggalLahir: payload.tanggalLahir,
        },
        { client: trx }
      )

      await trx.commit()
      session.flash('success', 'Siswa berhasil ditambahkan')
      return response.redirect().toRoute('admin.siswaRiasec.index')
    } catch (error) {
      await trx.rollback()
      session.flash('error', 'Gagal membuat data siswa')
      return response.redirect().back()
    }
  }

  /**
   * Display a single student's details with test results
   */
  async show({ inertia, params, session, request }: HttpContext) {
    try {
      const siswa = await Siswa.query()
        .where('id', params.id)
        .preload('user')
        .preload('hasilTes', (query) => query.orderBy('tanggal_tes', 'desc').limit(1))
        .firstOrFail()

      const hasilTes = await Hasil.query()
        .where('siswa_id', siswa.id)
        .preload('siswa')
        .orderBy('tanggal_tes', 'desc')
        .first()

      const riasecService = new RiasecService()
      const recommendedInterests = hasilTes
        ? await riasecService.getInterestRecommendations(hasilTes, 6)
        : []
      const recommendedPrograms = await getHybridRecommendations(siswa.id)

      return inertia.render('admin/siswaRiasec/view', {
        siswa: siswa.serialize(),
        hasilTes: hasilTes ? hasilTes.serialize() : null,
        recommendedPrograms,
        recommendedInterests,
        url: request.url(),
      })
    } catch (error) {
      session.flash('error', 'Siswa tidak ditemukan')
      return inertia.redirect().toRoute('admin.siswaRiasec.index')
    }
  }

  /**
   * Show the student edit form
   */
  async edit({ params, inertia, session, request }: HttpContext) {
    try {
      const siswa = await Siswa.query().where('id', params.id).preload('user').firstOrFail()

      return inertia.render('admin/siswaRiasec/edit', {
        siswa: siswa.serialize(),
        url: request.url(),
      })
    } catch (error) {
      session.flash('error', 'Siswa tidak ditemukan')
      return inertia.redirect().toRoute('admin.siswaRiasec.index')
    }
  }

  /**
   * Update an existing student
   */
  async update({ params, request, response, session }: HttpContext) {
    const siswa = await Siswa.query().where('id', params.id).preload('user').firstOrFail()

    // Validate the request with meta data for userId
    const payload = await request.validateUsing(updateSiswaValidator, {
      meta: {
        userId: siswa.user?.id, // Pass the userId to the validator
      },
    })
    const trx = await db.transaction()

    try {
      if (!siswa.user) {
        throw new Exception('Relasi user tidak ditemukan', { status: 404 })
      }

      siswa.user.merge({
        email: payload.email,
        fullName: payload.namaLengkap,
        ...(payload.password && { password: payload.password }),
      })
      await siswa.user.useTransaction(trx).save()

      siswa.merge({
        namaLengkap: payload.namaLengkap,
        nisn: payload.nisn,
        kelas: payload.kelas,
        tanggalLahir: payload.tanggalLahir,
      })
      await siswa.useTransaction(trx).save()

      await trx.commit()
      session.flash('success', 'Siswa berhasil diperbarui')
      return response.redirect().toRoute('admin.siswaRiasec.index')
    } catch (error) {
      await trx.rollback()
      session.flash('error', 'Gagal memperbarui data siswa')
      return response.redirect().back()
    }
  }

  /**
   * Delete a student and associated data
   */
  async destroy({ params, response, session }: HttpContext) {
    const trx = await db.transaction()

    try {
      const siswa = await Siswa.query({ client: trx })
        .where('id', params.id)
        .preload('user')
        .firstOrFail()

      await Hasil.query({ client: trx }).where('siswa_id', siswa.id).delete()
      await siswa.delete()
      await siswa.user?.delete()

      await trx.commit()
      session.flash('success', 'Siswa berhasil dihapus')
      return response.redirect().toRoute('admin.siswaRiasec.index')
    } catch (error) {
      await trx.rollback()
      session.flash('error', 'Gagal menghapus siswa')
      return response.redirect().back()
    }
  }
  async resetTest({ params, response, session }: HttpContext) {
    const trx = await db.transaction()

    try {
      const siswa = await Siswa.findOrFail(params.id)

      // Hapus semua hasil tes untuk siswa ini.
      // Database ON DELETE CASCADE akan menangani penghapusan jawaban terkait.
      await Hasil.query({ client: trx }).where('siswa_id', siswa.id).delete()

      await trx.commit()
      session.flash('success', `Tes untuk siswa ${siswa.namaLengkap} berhasil direset.`)
    } catch (error) {
      await trx.rollback()
      console.error('Reset Test Error:', error) // Log error untuk debugging
      session.flash('error', 'Gagal mereset tes siswa.')
    }

    return response.redirect().toRoute('admin.siswaRiasec.index')
  }
}
