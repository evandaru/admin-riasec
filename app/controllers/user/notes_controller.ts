// title: app/controllers/user/notes_controller.ts
import Note from '#models/note'
import { createNoteValidator, updateNoteValidator } from '#validators/note'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotesController {
  async index({ auth, inertia }: HttpContext) {
    const user = auth.user!
    // Ambil notes yang berelasi dengan user
    const notes = await Note.query().where('userId', user.id)
    return inertia.render('user/notes/index', { notes })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('user/notes/create')
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createNoteValidator)
    const user = auth.user!
    await user.related('notes').create(payload)

    return response.redirect().toRoute('notes.index')
  }

  async edit({ params, inertia, bouncer }: HttpContext) {
    const note = await Note.findOrFail(params.id)
    await bouncer.with('NotePolicy').authorize('view', note)
    return inertia.render('user/notes/edit', { note })
  }

  async update({ params, request, response, bouncer }: HttpContext) {
    const note = await Note.findOrFail(params.id)
    await bouncer.with('NotePolicy').authorize('update', note)

    const payload = await request.validateUsing(updateNoteValidator)
    note.merge(payload)
    await note.save()

    return response.redirect().toRoute('notes.index')
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const note = await Note.findOrFail(params.id)
    await bouncer.with('NotePolicy').authorize('delete', note)
    await note.delete()

    return response.redirect().toRoute('notes.index')
  }
}
