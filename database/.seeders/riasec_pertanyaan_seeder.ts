// title: database/seeders/riasec_pertanyaan_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RiasecPertanyaan from '#models/riasec_pertanyaan'

export default class extends BaseSeeder {
  async run() {
    await RiasecPertanyaan.createMany([
      // Realistic
      {
        teksPertanyaan: 'Saya suka bekerja dengan peralatan mesin.',
        tipeRiasec: 'R',
        nomorUrut: 1,
      },
      {
        teksPertanyaan: 'Saya bisa memperbaiki barang-barang elektronik.',
        tipeRiasec: 'R',
        nomorUrut: 2,
      },
      { teksPertanyaan: 'Saya terampil menggunakan perkakas.', tipeRiasec: 'R', nomorUrut: 3 },

      // Investigative
      { teksPertanyaan: 'Saya suka melakukan penelitian.', tipeRiasec: 'I', nomorUrut: 4 },
      {
        teksPertanyaan: 'Saya senang memecahkan masalah matematika atau sains.',
        tipeRiasec: 'I',
        nomorUrut: 5,
      },
      { teksPertanyaan: 'Saya menikmati membaca artikel ilmiah.', tipeRiasec: 'I', nomorUrut: 6 },

      // Artistic
      { teksPertanyaan: 'Saya orang yang kreatif.', tipeRiasec: 'A', nomorUrut: 7 },
      {
        teksPertanyaan: 'Saya suka memainkan alat musik, melukis, atau menulis.',
        tipeRiasec: 'A',
        nomorUrut: 8,
      },
      {
        teksPertanyaan: 'Saya senang pergi ke pertunjukan seni atau teater.',
        tipeRiasec: 'A',
        nomorUrut: 9,
      },

      // Social
      { teksPertanyaan: 'Saya suka menolong orang lain.', tipeRiasec: 'S', nomorUrut: 10 },
      {
        teksPertanyaan: 'Saya pandai mengajar atau melatih orang.',
        tipeRiasec: 'S',
        nomorUrut: 11,
      },
      { teksPertanyaan: 'Saya menikmati bekerja dalam tim.', tipeRiasec: 'S', nomorUrut: 12 },

      // Enterprising
      { teksPertanyaan: 'Saya suka memimpin sebuah proyek.', tipeRiasec: 'E', nomorUrut: 13 },
      { teksPertanyaan: 'Saya pandai meyakinkan orang lain.', tipeRiasec: 'E', nomorUrut: 14 },
      {
        teksPertanyaan: 'Saya bercita-cita untuk memulai bisnis sendiri.',
        tipeRiasec: 'E',
        nomorUrut: 15,
      },

      // Conventional
      {
        teksPertanyaan: 'Saya suka bekerja dengan data dan angka.',
        tipeRiasec: 'C',
        nomorUrut: 16,
      },
      { teksPertanyaan: 'Saya orang yang terorganisir dan rapi.', tipeRiasec: 'C', nomorUrut: 17 },
      {
        teksPertanyaan: 'Saya suka mengikuti aturan dan prosedur yang jelas.',
        tipeRiasec: 'C',
        nomorUrut: 18,
      },
    ])
  }
}
