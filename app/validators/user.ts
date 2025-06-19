// title: app/validators/user.ts
import vine from '@vinejs/vine'

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
    role: vine.enum(['user', 'admin']),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().email(),
    role: vine.enum(['user', 'admin']),
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
