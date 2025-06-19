import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import HasilTes from '#models/hasil'
import RiasecPertanyaan from '#models/riasec_pertanyaan'

export default class JawabanTes extends BaseModel {
  public static table = 'jawaban_tes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare hasilTesId: number

  @column()
  declare pertanyaanId: number

  @column()
  declare jawaban: boolean // true untuk Ya/Suka (1), false untuk Tidak/Tidak Suka (0)

  // === RELATIONS ===

  // Jawaban ini adalah bagian dari satu sesi hasil tes
  @belongsTo(() => HasilTes)
  declare hasilTes: BelongsTo<typeof HasilTes>

  // Jawaban ini merujuk ke satu pertanyaan spesifik
  @belongsTo(() => RiasecPertanyaan)
  declare pertanyaan: BelongsTo<typeof RiasecPertanyaan>
}
