// title: app/validators/user.ts
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8),
    role: vine.enum(['user', 'admin', 'siswa']),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().email(),
    role: vine.enum(['user', 'admin', 'siswa']),
  })
)

export const registerUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8).confirmed(),
  })
)

export const updateAdminProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value, field) => {
        // Cek apakah ada email yang sama, KECUALI untuk user ID saat ini
        const user = await db
          .from('users')
          .where('email', value)
          .whereNot('id', field.meta.userId) // Ambil userId dari meta
          .first()
        return !user
      }),
    // Password bersifat opsional, tapi jika diisi, harus ada konfirmasinya
    password: vine.string().minLength(8).confirmed().optional(),
  })
)

export const updateUserProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3),
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
    password: vine.string().minLength(8).confirmed().optional(),
    // Tambahan field untuk data Siswa
    nisn: vine.string().trim().nullable(),
    kelas: vine.string().trim().nullable(),
    tanggalLahir: vine
      .date({ formats: ['YYYY-MM-DD'] })
      .nullable()
      .transform((value) => (value ? DateTime.fromJSDate(value) : null)),
  })
)
