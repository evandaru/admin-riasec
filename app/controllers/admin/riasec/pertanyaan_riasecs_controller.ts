import RiasecPertanyaan from '#models/riasec_pertanyaan'
import { createPertanyaanValidator } from '#validators/pertanyaan_riasec'
import type { HttpContext } from '@adonisjs/core/http'

export default class PertanyaanRiasecsController {
  /**
   * Menampilkan daftar semua pertanyaan RIASEC.
   * Data diurutkan berdasarkan tipe RIASEC, lalu nomor urut.
   */
  async index({ inertia, request, auth }: HttpContext) {
    const pertanyaan = await RiasecPertanyaan.query()
      .orderBy('tipeRiasec', 'asc')
      .orderBy('nomorUrut', 'asc')

    return inertia.render('admin/pertanyaan/index', {
      pertanyaan,
      url: request.url(),
      user: auth.user!.serialize(),
    })
  }
  create({ inertia, request, auth }: HttpContext) {
    return inertia.render('admin/pertanyaan/create', {
      url: request.url(),
      user: auth.user!.serialize(),
    })
  }
  async store({ request, response, session }: HttpContext) {
    // Pastikan 'session' ada di sini
    const payload = await request.validateUsing(createPertanyaanValidator)

    const lastPertanyaan = await RiasecPertanyaan.query().orderBy('nomor_urut', 'desc').first()
    const nextNomorUrut = lastPertanyaan ? (lastPertanyaan.nomorUrut || 0) + 1 : 1

    await RiasecPertanyaan.create({
      ...payload,
      nomorUrut: nextNomorUrut,
    })

    // --- TAMBAHKAN BARIS INI ---
    session.flash('success', 'Pertanyaan sudah berhasil dibuat!')
    // -------------------------

    return response.redirect().toRoute('admin.pertanyaan.index')
  }

  async edit({ inertia, params, request }: HttpContext) {
    const pertanyaan = await RiasecPertanyaan.findOrFail(params.id)
    return inertia.render('admin/pertanyaan/edit', { pertanyaan, url: request.url() })
  }

  async update({ request, response, session, params }: HttpContext) {
    const pertanyaan = await RiasecPertanyaan.findOrFail(params.id)
    const payload = await request.validateUsing(createPertanyaanValidator)

    pertanyaan.merge(payload)
    await pertanyaan.save()

    // --- TAMBAHKAN BARIS INI ---
    session.flash('success', 'Pertanyaan sudah berhasil diperbarui!')
    // -------------------------

    return response.redirect().toRoute('admin.pertanyaan.index')
  }

  async destroy({ params, response, session }: HttpContext) {
    const pertanyaan = await RiasecPertanyaan.findOrFail(params.id)
    await pertanyaan.delete()

    // --- TAMBAHKAN BARIS INI ---
    session.flash('success', 'Pertanyaan sudah berhasil dihapus!')
    // -------------------------

    return response.redirect().toRoute('admin.pertanyaan.index')
  }
}
