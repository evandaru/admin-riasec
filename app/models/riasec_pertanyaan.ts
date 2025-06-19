import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RiasecPertanyaan extends BaseModel {
  // Secara eksplisit memberitahu Lucid nama tabel jika berbeda dari snake_case plural model
  public static table = 'riasec_pertanyaan'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare teksPertanyaan: string

  @column()
  declare tipeRiasec: 'R' | 'I' | 'A' | 'S' | 'E' | 'C'

  @column()
  declare nomorUrut: number | null
}
