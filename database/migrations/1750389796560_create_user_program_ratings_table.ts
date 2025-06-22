import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_program_ratings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('siswa_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('siswa')
        .onDelete('CASCADE')

      table
        .bigInteger('program_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('programs')
        .onDelete('CASCADE')
      table.integer('rating').notNullable().defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
