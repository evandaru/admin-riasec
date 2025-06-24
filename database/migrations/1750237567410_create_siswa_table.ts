import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'siswa'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .unique()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.string('nama_lengkap', 100).notNullable()
      table.string('nisn', 20).nullable().unique()
      table.string('jenjang', 255).nullable()
      table.string('kelas', 20).nullable()
      table.date('tanggal_lahir').nullable()
      table.string('alamat', 255).nullable()
      table.string('telepon', 20).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
