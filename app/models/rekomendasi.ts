import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Rekomendasi extends BaseModel {
  public static table = 'rekomendasi'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tipe: 'single' | 'double' | 'triple'

  @column()
  declare kategori: string

  @column()
  declare karakteristik_utama: string | null

  @column({
    serialize: (value: string[]) => value,
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => {
      try {
        return JSON.parse(value)
      } catch {
        return []
      }
    },
  })
  declare rekomendasi_jurusan_karier: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
