// database/seeders/user_seeder.ts
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Admin User',
        email: 'admin@example.com',
        password: '12qwaszx',
        role: 'admin',
      },
      {
        fullName: 'Regular User',
        email: 'user@example.com',
        password: '12qwaszx',
        role: 'siswa',
      },
      {
        fullName: 'lele',
        email: 'lele@lele.com',
        password: '12qwaszx',
        role: 'siswa',
      },
      {
        fullName: 'sapi',
        email: 'sapi@sapi.com',
        password: '12qwaszx',
        role: 'siswa',
      },
    ])
  }
}
