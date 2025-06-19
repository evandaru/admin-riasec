import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import HasilTes from '#models/hasil'

export default class Siswa extends BaseModel {
  public static table = 'siswa'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare namaLengkap: string

  @column()
  declare nisn: string | null

  @column()
  declare kelas: string | null

  @column.date()
  declare tanggalLahir: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // === RELATIONS ===

  // Profil siswa ini dimiliki oleh satu User
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // Satu siswa bisa memiliki banyak hasil tes
  @hasMany(() => HasilTes)
  declare hasilTes: HasMany<typeof HasilTes>
}
