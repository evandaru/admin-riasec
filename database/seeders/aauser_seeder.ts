// title: database/seeders/user_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Admin Utama',
        email: 'admin@example.com',
        password: '12qwaszx',
        role: 'admin',
      },
      {
        fullName: faker.person.fullName(),
        email: 'user@example.com',
        password: '12qwaszx',
        role: 'siswa', // Role default untuk siswa
      },
      {
        fullName: faker.person.fullName(),
        email: 'lele@lele.com',
        password: '12qwaszx',
        role: 'siswa',
      },
    ])
  }
}
