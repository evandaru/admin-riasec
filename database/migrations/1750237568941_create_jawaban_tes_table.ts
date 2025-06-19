// title: database/migrations/xxxx_create_jawaban_tes_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jawaban_tes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('hasil_tes_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('hasil_tes')
        .onDelete('CASCADE')
      table
        .integer('pertanyaan_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('riasec_pertanyaan')
        .onDelete('CASCADE')

      table.integer('jawaban').notNullable()
      // highlight-end
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
