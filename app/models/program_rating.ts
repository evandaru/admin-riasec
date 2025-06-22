import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Siswa from '#models/siswa'
import Program from '#models/program'

export default class ProgramRating extends BaseModel {
  static table = 'user_program_ratings'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare siswaId: number

  // Foreign key buat tabel 'program'
  @column()
  declare programId: number

  // Kolom 'rating' dengan default 0
  @column()
  declare rating: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Siswa)
  declare siswa: BelongsTo<typeof Siswa>

  // Rating ini punya satu program
  @belongsTo(() => Program)
  declare program: BelongsTo<typeof Program>
}
