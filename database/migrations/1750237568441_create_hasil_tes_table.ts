import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'hasil_tes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('siswa_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('siswa')
        .onDelete('CASCADE')

      table.timestamp('tanggal_tes').defaultTo(this.now())
      table.integer('skor_r').notNullable().defaultTo(0)
      table.integer('skor_i').notNullable().defaultTo(0)
      table.integer('skor_a').notNullable().defaultTo(0)
      table.integer('skor_s').notNullable().defaultTo(0)
      table.integer('skor_e').notNullable().defaultTo(0)
      table.integer('skor_c').notNullable().defaultTo(0)

      table.string('kode_holland', 3).nullable()
      table.text('deskripsi_hasil').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
