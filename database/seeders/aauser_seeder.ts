// title: database/seeders/user_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    // Membuat admin
    await User.create({
      fullName: 'Admin Utama',
      email: 'admin@example.com',
      password: '12qwaszx',
      role: 'admin',
    })
    await User.create({
      fullName: 'User Siswa',
      email: 'user@example.com',
      password: '12qwaszx',
      role: 'siswa',
    })

    // Membuat 100 user dengan role siswa
    const students = Array.from({ length: 3 }, () => ({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: '12qwaszx',
      role: 'siswa' as 'siswa',
    }))

    await User.createMany(students)
  }
}
