import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Siswa from '#models/siswa'
import JawabanTes from '#models/jawaban'

export default class HasilTes extends BaseModel {
  public static table = 'hasil_tes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare siswaId: number

  @column.dateTime()
  declare tanggalTes: DateTime

  @column()
  declare skorR: number

  @column()
  declare skorI: number

  @column()
  declare skorA: number

  @column()
  declare skorS: number

  @column()
  declare skorE: number

  @column()
  declare skorC: number

  @column()
  declare kodeHolland: string | null

  @column()
  declare deskripsiHasil: string | null

  // === RELATIONS ===

  // Hasil tes ini milik satu siswa
  @belongsTo(() => Siswa)
  declare siswa: BelongsTo<typeof Siswa>

  // Satu hasil tes terdiri dari banyak jawaban
  @hasMany(() => JawabanTes)
  declare jawaban: HasMany<typeof JawabanTes>
}
