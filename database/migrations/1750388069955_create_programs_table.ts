import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'programs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table
        .string('name', 255)
        .notNullable()
        .unique()
        .comment('Nama program, misalnya: Tahfidz Al-Quran')
      table.text('description').nullable().defaultTo(null).comment('Deskripsi program')
      table
        .float('realistic')
        .notNullable()
        .defaultTo(0)
        .comment('Bobot untuk tipe Realistic (0-1)')
      table
        .float('investigative')
        .notNullable()
        .defaultTo(0)
        .comment('Bobot untuk tipe Investigative (0-1)')
      table.float('artistic').notNullable().defaultTo(0).comment('Bobot untuk tipe Artistic (0-1)')
      table.float('social').notNullable().defaultTo(0).comment('Bobot untuk tipe Social (0-1)')
      table
        .float('enterprising')
        .notNullable()
        .defaultTo(0)
        .comment('Bobot untuk tipe Enterprising (0-1)')
      table
        .float('conventional')
        .notNullable()
        .defaultTo(0)
        .comment('Bobot untuk tipe Conventional (0-1)')

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
