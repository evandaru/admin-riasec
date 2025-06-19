// title: database/seeders/admin_seeder.ts
import Admin from '#models/admin'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class AdminSeeder extends BaseSeeder {
  logger: any
  public async run() {
    const adminUsers = await User.query().where('role', 'admin')

    if (adminUsers.length === 0) {
      this.logger?.info('❌ Gagal seeding: tidak ada user dengan role "admin".')
      return
    }

    const adminData = adminUsers.map((user) => ({
      userId: user.id,
      namaLengkap: user.fullName ?? faker.person.fullName(),
      jabatan: faker.helpers.arrayElement(['Kepala Sekolah', 'Wakil', 'Tata Usaha']),
    }))

    try {
      await Admin.createMany(adminData)
      this.logger?.info(`✅ Berhasil seeding ${adminData.length} data admin.`)
    } catch (error) {
      this.logger?.error('❌ Gagal insert ke tabel admin:')
      console.error(error)
    }
  }
}
