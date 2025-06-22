import RiasecPertanyaan from '#models/riasec_pertanyaan'
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

  /**
   * Menampilkan form untuk membuat pertanyaan baru.
   * GET pertanyaan/create
   */
  // create({ inertia }) {
  //   return inertia.render('pertanyaan/create')
  // }

  /**
   * Menyimpan pertanyaan baru ke database.
   * POST pertanyaan
   */
  // store({ request, response }) {
  //   // Logika untuk menyimpan data
  // }

  /**
   * Menampilkan detail satu pertanyaan.
   * GET pertanyaan/:id
   */
  // show({ params }) {
  //   // Logika untuk menampilkan detail
  // }

  /**
   * Menampilkan form untuk mengedit pertanyaan.
   * GET pertanyaan/:id/edit
   */
  // edit({ params, inertia }) {
  //   // Logika untuk menampilkan form edit
  // }

  /**
   * Mengupdate data pertanyaan di database.
   * PUT atau PATCH pertanyaan/:id
   */
  // update({ params, request, response }) {
  //   // Logika untuk update data
  // }

  /**
   * Menghapus pertanyaan dari database.
   * DELETE pertanyaan/:id
   */
  // destroy({ params, response }) {
  //   // Logika untuk menghapus data
  // }
}
