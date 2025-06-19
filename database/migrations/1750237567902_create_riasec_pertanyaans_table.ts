import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'riasec_pertanyaan'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.text('teks_pertanyaan').notNullable()
      table.enum('tipe_riasec', ['R', 'I', 'A', 'S', 'E', 'C']).notNullable()
      table.integer('nomor_urut').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
