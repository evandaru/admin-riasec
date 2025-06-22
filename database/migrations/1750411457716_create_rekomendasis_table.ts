import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rekomendasi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.enum('tipe', ['single', 'double', 'triple']).notNullable()
      table.string('kategori').notNullable()
      table.text('karakteristik_utama').nullable()
      table.json('rekomendasi_jurusan_karier').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
