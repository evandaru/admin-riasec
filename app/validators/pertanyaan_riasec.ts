// title: app/validators/riasec.ts
import vine from '@vinejs/vine'

export const createPertanyaanValidator = vine.compile(
  vine.object({
    teksPertanyaan: vine.string().trim().minLength(10).maxLength(255),
    tipeRiasec: vine.enum(['R', 'I', 'A', 'S', 'E', 'C']),
  })
)
