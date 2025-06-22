// title: database/seeders/riasec_pertanyaan_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RiasecPertanyaan from '#models/riasec_pertanyaan'

export default class extends BaseSeeder {
  async run() {
    await RiasecPertanyaan.createMany([
      // Realistic (R)
      { teksPertanyaan: 'Saya Suka Memperbaiki alat-alat listrik', tipeRiasec: 'R', nomorUrut: 1 },
      { teksPertanyaan: 'Saya Suka Memperbaiki motor', tipeRiasec: 'R', nomorUrut: 2 },
      { teksPertanyaan: 'Saya Suka Memperbaiki Alat Mekanik', tipeRiasec: 'R', nomorUrut: 3 },
      { teksPertanyaan: 'Saya mampu membuat gambar dengan skala', tipeRiasec: 'R', nomorUrut: 4 },
      {
        teksPertanyaan:
          'Saya mampu menggunakan peralatan mesin (misal: bor listrik atau mesin jahit)',
        tipeRiasec: 'R',
        nomorUrut: 5,
      },
      {
        teksPertanyaan: 'Saya suka menggunakan perkakas bengkel dan mesin',
        tipeRiasec: 'R',
        nomorUrut: 6,
      },
      {
        teksPertanyaan: 'Saya mampu melakukan perbaikan kecil pada pipa air, keran, dll',
        tipeRiasec: 'R',
        nomorUrut: 7,
      },
      {
        teksPertanyaan: 'Saya mampu melakukan perbaikan kecil pada alat listrik',
        tipeRiasec: 'R',
        nomorUrut: 8,
      },
      {
        teksPertanyaan: 'Saya Tertarik menjadi mekanik pesawat terbang',
        tipeRiasec: 'R',
        nomorUrut: 9,
      },
      {
        teksPertanyaan: 'Saya Tertarik menjadi Penanggung jawab keamanan',
        tipeRiasec: 'R',
        nomorUrut: 10,
      },
      {
        teksPertanyaan: 'Saya tertarik menjadi mekanik/ montir mobil',
        tipeRiasec: 'R',
        nomorUrut: 11,
      },
      { teksPertanyaan: 'Saya tertarik menjadi pengrajin kayu', tipeRiasec: 'R', nomorUrut: 12 },
      {
        teksPertanyaan: 'Saya tertarik menjadi spesialis perikanan/ margasatwa',
        tipeRiasec: 'R',
        nomorUrut: 13,
      },
      {
        teksPertanyaan: 'Saya tertarik menjadi operator alat-alat berat',
        tipeRiasec: 'R',
        nomorUrut: 14,
      },
      {
        teksPertanyaan: 'Saya tertarik menjadi pengawas konstruksi bangunan',
        tipeRiasec: 'R',
        nomorUrut: 15,
      },
      { teksPertanyaan: 'Saya tertarik menjadi pengemudi bis', tipeRiasec: 'R', nomorUrut: 16 },
      { teksPertanyaan: 'Saya tertarik menjadi insinyur otomotif', tipeRiasec: 'R', nomorUrut: 17 },
      { teksPertanyaan: 'Saya tertarik menjadi ahli mesin', tipeRiasec: 'R', nomorUrut: 18 },

      // Investigative (I)
      {
        teksPertanyaan: 'Saya Suka Membaca buku ilmiah atau majalah ilmiah',
        tipeRiasec: 'I',
        nomorUrut: 19,
      },
      { teksPertanyaan: 'Saya bekerja di laboratorium', tipeRiasec: 'I', nomorUrut: 20 },
      {
        teksPertanyaan: 'Saya suka mengerjakan suatu proyek ilmiah',
        tipeRiasec: 'I',
        nomorUrut: 21,
      },
      { teksPertanyaan: 'Saya suka mempelajari teori ilmiah', tipeRiasec: 'I', nomorUrut: 22 },
      {
        teksPertanyaan: 'Saya suka membaca mengenai topik-topik khusus atau keinginan sendiri',
        tipeRiasec: 'I',
        nomorUrut: 23,
      },
      {
        teksPertanyaan: 'Saya suka menerapkan matematika dalam masalah praktis',
        tipeRiasec: 'I',
        nomorUrut: 24,
      },
      {
        teksPertanyaan: 'Saya mampu melakukan percobaan atau penelitian ilmiah',
        tipeRiasec: 'I',
        nomorUrut: 25,
      },
      {
        teksPertanyaan: 'Saya mampu memprogram komputer untuk mempelajari masalah ilmiah',
        tipeRiasec: 'I',
        nomorUrut: 26,
      },
      {
        teksPertanyaan: 'Saya mampu menginterpretasikan rumus kimia sederhana',
        tipeRiasec: 'I',
        nomorUrut: 27,
      },
      {
        teksPertanyaan: 'Saya mampu mengerti mengapa satelit buatan manusia tidak jauh dari bumi',
        tipeRiasec: 'I',
        nomorUrut: 28,
      },
      {
        teksPertanyaan: 'Saya mampu menyebutkan tiga macam makanan yang memiliki protein tinggi',
        tipeRiasec: 'I',
        nomorUrut: 29,
      },
      {
        teksPertanyaan: 'Saya tertarik menjadi ahli biologi/ hayati',
        tipeRiasec: 'I',
        nomorUrut: 30,
      },
      {
        teksPertanyaan: 'Saya tertarik menjadi ahli astronomi/ bintang',
        tipeRiasec: 'I',
        nomorUrut: 31,
      },
      {
        teksPertanyaan: 'Saya tertarik menjadi teknisi laboratorium medis',
        tipeRiasec: 'I',
        nomorUrut: 32,
      },
      { teksPertanyaan: 'Saya tertarik menjadi ilmuan peneliti', tipeRiasec: 'I', nomorUrut: 33 },
      { teksPertanyaan: 'Saya tertarik menjadi ahli kimia', tipeRiasec: 'I', nomorUrut: 34 },
      { teksPertanyaan: 'Saya tertarik menjadi ahli geologi', tipeRiasec: 'I', nomorUrut: 35 },
      {
        teksPertanyaan: 'Saya tertarik menjadi pekerja riset ilmiah',
        tipeRiasec: 'I',
        nomorUrut: 36,
      },

      // Artistic (A)
      {
        teksPertanyaan: 'Saya suka membuat sketsa, menggambar, atau melukis',
        tipeRiasec: 'A',
        nomorUrut: 37,
      },
      {
        teksPertanyaan: 'Saya suka menjadi pemain dalam kelompok musik, orkesta, atau teater',
        tipeRiasec: 'A',
        nomorUrut: 38,
      },
      {
        teksPertanyaan: 'Saya suka merancang perabotan, pakaian, atau poster',
        tipeRiasec: 'A',
        nomorUrut: 39,
      },
      {
        teksPertanyaan: 'Saya suka bermain dalam sebuah band, kelompok orchrestra',
        tipeRiasec: 'A',
        nomorUrut: 40,
      },
      { teksPertanyaan: 'Saya suka memainkan alat musik', tipeRiasec: 'A', nomorUrut: 41 },
      {
        teksPertanyaan: 'Saya suka menulis untuk suatu majalah atau koran',
        tipeRiasec: 'A',
        nomorUrut: 42,
      },
      {
        teksPertanyaan: 'Saya suka membuat lukisan atau memfoto pemandangan/ orang',
        tipeRiasec: 'A',
        nomorUrut: 43,
      },
      { teksPertanyaan: 'Saya suka menulis novel atau cerita', tipeRiasec: 'A', nomorUrut: 44 },
      { teksPertanyaan: 'Saya suka membaca dan menulis puisi', tipeRiasec: 'A', nomorUrut: 45 },
      { teksPertanyaan: 'Saya mampu memainkan alat musik', tipeRiasec: 'A', nomorUrut: 46 },
      { teksPertanyaan: 'Saya mampu bermain drama', tipeRiasec: 'A', nomorUrut: 47 },
      {
        teksPertanyaan: 'Saya mampu menginterpretasikan cerita atau bahan bacaan',
        tipeRiasec: 'A',
        nomorUrut: 48,
      },
      {
        teksPertanyaan: 'saya mampu membuat sketsa orang sehingga dapat dikenali',
        tipeRiasec: 'A',
        nomorUrut: 49,
      },
      { teksPertanyaan: 'Saya mampu melukis atau membuat patung', tipeRiasec: 'A', nomorUrut: 50 },
      { teksPertanyaan: 'Saya tertarik menjadi pemain musik', tipeRiasec: 'A', nomorUrut: 51 },
      { teksPertanyaan: 'Saya tertarik menjadi penulis novel', tipeRiasec: 'A', nomorUrut: 52 },
      { teksPertanyaan: 'Saya tertarik menjadi aktor/ aktris', tipeRiasec: 'A', nomorUrut: 53 },
      { teksPertanyaan: 'Saya tertarik menjadi wartawan', tipeRiasec: 'A', nomorUrut: 54 },

      // Social (S)
      {
        teksPertanyaan: 'Saya Suka bertemu dengan pengamat sosial atau pendidikan',
        tipeRiasec: 'S',
        nomorUrut: 55,
      },
      {
        teksPertanyaan: 'Saya suka bekerja untuk palang merah sebagai relawan',
        tipeRiasec: 'S',
        nomorUrut: 56,
      },
      {
        teksPertanyaan: 'Saya Suka membantu orang lain dengan masalah pribadinya',
        tipeRiasec: 'S',
        nomorUrut: 57,
      },
      {
        teksPertanyaan: 'saya suka menjaga/ mengurusdan mengawas anak-anak',
        tipeRiasec: 'S',
        nomorUrut: 58,
      },
      { teksPertanyaan: 'Saya suka mempelajari kenakalan remaja', tipeRiasec: 'S', nomorUrut: 59 },
      { teksPertanyaan: 'Saya mudah berbicara dengan semua orang', tipeRiasec: 'S', nomorUrut: 60 },
      { teksPertanyaan: 'Saya mampu memimpin diskusi kelompok', tipeRiasec: 'S', nomorUrut: 61 },
      {
        teksPertanyaan: 'Saya mampu pandai dalam menjelaskan sesuatu kepada orang lain',
        tipeRiasec: 'S',
        nomorUrut: 62,
      },
      {
        teksPertanyaan: 'Saya mampu dalam pencarian dana atau amal',
        tipeRiasec: 'S',
        nomorUrut: 63,
      },
      {
        teksPertanyaan: 'Saya suka mengajar anak-anak dengan mudah',
        tipeRiasec: 'S',
        nomorUrut: 64,
      },
      {
        teksPertanyaan: 'Saya mampu mengajar orang dewasa/ remaja dengan mudah',
        tipeRiasec: 'S',
        nomorUrut: 65,
      },
      {
        teksPertanyaan:
          'Saya mampu/ pandai dalam menolong orang lain yang sedang bingung atau bermasalah',
        tipeRiasec: 'S',
        nomorUrut: 66,
      },
      {
        teksPertanyaan: 'Saya mampu dalam menghibur dan menemani orang yang lebih tua dari saya',
        tipeRiasec: 'S',
        nomorUrut: 67,
      },
      {
        teksPertanyaan: 'Saya mampu mendengarkan dengan baik cerita permasalahan orang lain',
        tipeRiasec: 'S',
        nomorUrut: 68,
      },
      { teksPertanyaan: 'Saya tertarik menjadi kepala sekolah', tipeRiasec: 'S', nomorUrut: 69 },
      {
        teksPertanyaan: 'Saya tertarik menjadi konselor masalah Pribadi',
        tipeRiasec: 'S',
        nomorUrut: 70,
      },
      { teksPertanyaan: 'Saya tertarik menjadi pekerja sosial', tipeRiasec: 'S', nomorUrut: 71 },
      {
        teksPertanyaan: 'Saya tertarik menjadi konselor kejuruan dan pekerjaan',
        tipeRiasec: 'S',
        nomorUrut: 72,
      },

      // Enterprising (E)
      { teksPertanyaan: 'Saya suka mempengaruhi orang lain', tipeRiasec: 'E', nomorUrut: 73 },
      { teksPertanyaan: 'Saya suka menjual suatu produk', tipeRiasec: 'E', nomorUrut: 74 },
      {
        teksPertanyaan: 'Saya suka mempelajari strategi untuk keberhasilan bisnis',
        tipeRiasec: 'E',
        nomorUrut: 75,
      },
      {
        teksPertanyaan: 'Saya suka menjadi pemimpin dalam kelompok',
        tipeRiasec: 'E',
        nomorUrut: 76,
      },
      {
        teksPertanyaan: 'Saya suka memimpin kelompok dalam meraih tujuan tertentu',
        tipeRiasec: 'E',
        nomorUrut: 77,
      },
      {
        teksPertanyaan: 'Saya mampu/ memenangkan penghargaan sebagai tenaga penjual atau pemimpin',
        tipeRiasec: 'E',
        nomorUrut: 78,
      },
      {
        teksPertanyaan: 'Saya tahu bagaimana menjadi pemimpin yang berhasil/ sukses',
        tipeRiasec: 'E',
        nomorUrut: 79,
      },
      {
        teksPertanyaan: 'Saya mampu berbicara di depan umum dengan baik',
        tipeRiasec: 'E',
        nomorUrut: 80,
      },
      { teksPertanyaan: 'Saya dapat mengelola usaha kecil', tipeRiasec: 'E', nomorUrut: 81 },
      {
        teksPertanyaan: 'Saya dapat membuat kelompok sosial atau kerja berjalan dengan baik',
        tipeRiasec: 'E',
        nomorUrut: 82,
      },
      {
        teksPertanyaan: 'Saya bisa berbicara dengan orang yang keras kepala',
        tipeRiasec: 'E',
        nomorUrut: 83,
      },
      { teksPertanyaan: 'Saya dapat mengelola kampanye penjualan', tipeRiasec: 'E', nomorUrut: 84 },
      {
        teksPertanyaan: 'Saya dapat mengatur pekerjaan orang lain',
        tipeRiasec: 'E',
        nomorUrut: 85,
      },
      {
        teksPertanyaan: 'Saya cenderung berambisi dan berbicara apa adanya',
        tipeRiasec: 'E',
        nomorUrut: 86,
      },
      {
        teksPertanyaan:
          'Saya mampu dan pandai mempengaruhi orang untuk melakukan sesuatu menurut cara saya',
        tipeRiasec: 'E',
        nomorUrut: 87,
      },
      { teksPertanyaan: 'Saya seorang tenaga penjual yang baik', tipeRiasec: 'E', nomorUrut: 88 },
      {
        teksPertanyaan: 'Saya tertarik menjadi eksekutif periklanan',
        tipeRiasec: 'E',
        nomorUrut: 89,
      },
      { teksPertanyaan: 'Saya tertarik menjadi pembawa acara/mc', tipeRiasec: 'E', nomorUrut: 90 },

      // Conventional (C)
      {
        teksPertanyaan: 'Saya suka melakukan pekerjaan surat menyurat atau perkantoran',
        tipeRiasec: 'C',
        nomorUrut: 91,
      },
      {
        teksPertanyaan: 'Saya suka melakukan operasi matematika dalam bisnis dan pembukuan',
        tipeRiasec: 'C',
        nomorUrut: 92,
      },
      {
        teksPertanyaan: 'Saya suka membuat catatan pengeluaran secara terperinci',
        tipeRiasec: 'C',
        nomorUrut: 93,
      },
      { teksPertanyaan: 'Saya suka menyusun sistem pengrsipan', tipeRiasec: 'C', nomorUrut: 94 },
      {
        teksPertanyaan: 'Saya suka membuat daftar inventaris dari persediaan atau produk',
        tipeRiasec: 'C',
        nomorUrut: 95,
      },
      {
        teksPertanyaan: 'Saya mampu mengetik sepuluh jari dengan cepat',
        tipeRiasec: 'C',
        nomorUrut: 96,
      },
      {
        teksPertanyaan: 'Saya mampu menjalankan mesin distributor/ mesin penjumlahan',
        tipeRiasec: 'C',
        nomorUrut: 97,
      },
      {
        teksPertanyaan: 'Saya mampu mengarsipkan surat dan berkas-berkas lain',
        tipeRiasec: 'C',
        nomorUrut: 98,
      },
      {
        teksPertanyaan: 'Saya mampu melaksanakan pekerjaan administrasi kantor',
        tipeRiasec: 'C',
        nomorUrut: 99,
      },
      {
        teksPertanyaan: 'Saya mampu menggunakan program pembukuan',
        tipeRiasec: 'C',
        nomorUrut: 100,
      },
      {
        teksPertanyaan: 'Saya mampu melaksanakan tugas administrasi dalam waktu singkat',
        tipeRiasec: 'C',
        nomorUrut: 101,
      },
      {
        teksPertanyaan: 'Saya mampu menempatkan kredit dan debet',
        tipeRiasec: 'C',
        nomorUrut: 102,
      },
      {
        teksPertanyaan: 'Saya mampu mencatat dengan cermat pembayaran/ penjualan',
        tipeRiasec: 'C',
        nomorUrut: 103,
      },
      {
        teksPertanyaan: 'Saya tertarik menjadi manajer penjualan',
        tipeRiasec: 'C',
        nomorUrut: 104,
      },
      { teksPertanyaan: 'Saya tertarik menjadi ahli pembukuan', tipeRiasec: 'C', nomorUrut: 105 },
      { teksPertanyaan: 'Saya tertarik menjadi kasir di bank', tipeRiasec: 'C', nomorUrut: 106 },
      { teksPertanyaan: 'Saya tertarik menjadi analis keuangan', tipeRiasec: 'C', nomorUrut: 107 },
      { teksPertanyaan: 'Saya tertarik menjadi penaksir biaya', tipeRiasec: 'C', nomorUrut: 108 },
    ])
  }
}
