import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Program extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare realistic: number

  @column()
  declare investigative: number

  @column()
  declare artistic: number

  @column()
  declare social: number

  @column()
  declare enterprising: number

  @column()
  declare conventional: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
