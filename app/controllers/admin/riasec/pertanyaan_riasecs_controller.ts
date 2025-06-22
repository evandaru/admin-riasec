import RiasecPertanyaan from '#models/riasec_pertanyaan'
import { createPertanyaanValidator } from '#validators/pertanyaan_riasec'
import type { HttpContext } from '@adonisjs/core/http'

export default class PertanyaanRiasecsController {
  /**
   * Menampilkan daftar semua pertanyaan RIASEC.
   * Data diurutkan berdasarkan tipe RIASEC, lalu nomor urut.
   */
  async index({ inertia }: HttpContext) {
    const pertanyaan = await RiasecPertanyaan.query()
      .orderBy('tipeRiasec', 'asc')
      .orderBy('nomorUrut', 'asc')

    return inertia.render('admin/pertanyaan/index', { pertanyaan })
  }
  create({ inertia }: HttpContext) {
    return inertia.render('admin/pertanyaan/create')
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
}
