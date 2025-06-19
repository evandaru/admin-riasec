// title: app/validators/note.ts
import vine from '@vinejs/vine'

export const createNoteValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3),
    content: vine.string().trim().minLength(5),
  })
)

export const updateNoteValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3),
    content: vine.string().trim().minLength(5),
  })
)
