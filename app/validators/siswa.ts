// title: app/validators/siswa.ts
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createSiswaValidator = vine.compile(
  vine.object({
    namaLengkap: vine.string().trim().minLength(3).maxLength(255),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8).confirmed(),
    nisn: vine.string().trim().nullable(), // Use max instead of maxLength
    kelas: vine.string().trim().nullable(), // Use max for string length validation
    tanggalLahir: vine
      .date({ formats: ['YYYY-MM-DD'] })
      .nullable()
      .transform((value) => (value ? DateTime.fromJSDate(value) : null)),
  })
)
export const updateSiswaValidator = vine.compile(
  vine.object({
    namaLengkap: vine.string().trim().minLength(3),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .where('email', value)
          .whereNot('id', field.meta.userId)
          .first()
        return !user
      }),
    password: vine.string().minLength(8).nullable(),
    nisn: vine.string().trim().nullable(),
    kelas: vine.string().trim().nullable(),
    tanggalLahir: vine
      .date({ formats: ['YYYY-MM-DD'] })
      .nullable()
      .transform((value) => (value ? DateTime.fromJSDate(value) : null)),
  })
)
