// title: database/seeders/siswa_seeder.ts
import Siswa from '#models/siswa'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class SiswaSeeder extends BaseSeeder {
  logger: any
  public async run() {
    const siswaUsers = await User.query().where('role', 'siswa')

    if (siswaUsers.length === 0) {
      this.logger?.info('❌ Gagal seeding: tidak ada user dengan role "siswa".')
      return
    }

    const usedNisn = new Set<string>()
    const siswaData = siswaUsers.map((user) => {
      let nisn: string
      do {
        nisn = faker.string.numeric(10)
      } while (usedNisn.has(nisn))
      usedNisn.add(nisn)

      return {
        userId: user.id,
        namaLengkap: user.fullName ?? faker.person.fullName(),
        nisn, // jamin unik
        jenjang: `${faker.helpers.arrayElement(['MA', 'MTS'])}`,
        kelas: `${faker.helpers.arrayElement(['1', '2', '3'])}`,
        tanggalLahir: DateTime.fromJSDate(faker.date.birthdate({ min: 15, max: 18, mode: 'age' })),
        alamat: faker.location.streetAddress(),
        telepon: '08' + faker.string.numeric(9),
      }
    })

    try {
      await Siswa.createMany(siswaData)
      this.logger?.info(`✅ Berhasil seeding ${siswaData.length} data siswa.`)
    } catch (error) {
      this.logger?.error('❌ Gagal insert ke tabel siswa:')
      console.error(error)
    }
  }
}
