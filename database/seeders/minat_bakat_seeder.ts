import Interest from '#models/minat_bakat' // Menggunakan model 'Interest' sesuai contoh awal Anda
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Deskripsi untuk setiap tipe RIASEC
    const descriptions = {
      R: 'Seseorang dengan kepribadian ini menyukai pekerjaan yang melibatkan tindakan daripada berpikir, lebih menyukai hasil nyata atau yang dapat dilihat langsung. Orang dengan tipe kepribadian ini umumnya memiliki rasa ingin tahu yang tinggi tentang sains, benda-benda nyata, dan mekanika.',
      I: 'Mereka yang termasuk dalam kepribadian Investigative menyukai penggunaan kemampuan abstrak atau analisis untuk menemukan dari masalah yang ada di sekitarnya. Mereka dapat dianggap sebagai "pemikir" yang selalu berusaha menyelesaikan tugas dan sering bekerja secara mandiri. Menurut tes RIASEC Holland, kelompok ini cenderung analitis, suka menggali lebih dalam, dan mencari kebenaran atau fakta dari sebuah informasi.',
      A: 'Orang yang masuk dalam kepribadian Artistic pasti menyukai kreativitas dan kaya akan imajinasi, tetapi memiliki kepribadian yang sangat impulsif dan suka bekerja mengandalkan perasaan. Kamu mungkin lebih mudah dipengaruhi oleh emosi, lebih didominasi oleh perasaan daripada logika, dan tidak suka bekerja dalam batasan yang ketat. Sering kali, orang-orang yang termasuk dalam kategori ini telah memiliki potensi atau bakat khusus yang menonjol dalam bidang seni.',
      S: 'Menurut tes RIASEC Holland, mereka yang berkepribadian Social cenderung suka membantu orang lain, berinteraksi, dan berbicara. Mereka peduli pada masalah sosial dan memiliki kemampuan untuk mengekspresikan pendapat dengan baik serta ahli dalam membujuk orang lain. Pada dasarnya, mereka adalah pribadi yang ekstrovert, ramah, dan terbuka. Oleh karena itu bekerja di bidang amal, kegiatan sosial, dan mengajar sangat cocok untuk mereka.',
      E: 'Orang yang punya kepribadian Enterprising cenderung berani berpikir dan bertindak, condong pada peran kepemimpinan. Mereka bersedia menghadapi tantangan dan menghadapi banyak kesulitan, serta memiliki semangat berjuang. Minat mereka umumnya berfokus pada bisnis, kepemimpinan, manajemen, negosiasi, atau membujuk orang lain. Oleh karena itu, mereka cocok untuk posisi manajemen di dunia bisnis karena berjiwa sosial.',
      C: 'Menurut tes RIASEC Holland, Conventional adalah tipe orang yang hati-hati, teliti, berprinsip, dan selalu mengikuti aturan. Mereka bekerja dengan angka, laporan data. Mereka cocok dengan pekerjaan kantor, pejabat pemerintah, pekerjaan yang membutuhkan kehati-hatian, detail, serta keteraturan.',
    }

    await Interest.createMany([
      // --- Realistic (R) ---
      { name: 'Insinyur', description: descriptions.R, riasecType: 'R' },
      { name: 'Teknisi Pemeliharaan', description: descriptions.R, riasecType: 'R' },
      { name: 'Peneliti Kimia', description: descriptions.R, riasecType: 'R' },
      { name: 'Dokter Gigi', description: descriptions.R, riasecType: 'R' },
      { name: 'Arsitek', description: descriptions.R, riasecType: 'R' },
      { name: 'Teknisi', description: descriptions.R, riasecType: 'R' },
      { name: 'Geolog', description: descriptions.R, riasecType: 'R' },
      {
        name: 'Teknisi Tambang, Minyak, dan Material',
        description: descriptions.R,
        riasecType: 'R',
      },
      { name: 'Manajer Produksi', description: descriptions.R, riasecType: 'R' },

      // --- Investigative (I) ---
      { name: 'Peneliti ilmiah', description: descriptions.I, riasecType: 'I' },
      { name: 'Developer', description: descriptions.I, riasecType: 'I' },
      {
        name: 'Konsultan Lingkungan (Perencana Restorasi Lingkungan)',
        description: descriptions.I,
        riasecType: 'I',
      },
      { name: 'Dokter Hewan', description: descriptions.I, riasecType: 'I' },
      { name: 'Antropolog', description: descriptions.I, riasecType: 'I' },
      { name: 'Psikolog', description: descriptions.I, riasecType: 'I' },
      { name: 'Konsultan Hukum', description: descriptions.I, riasecType: 'I' },
      { name: 'Dokter Umum & Dokter Gigi', description: descriptions.I, riasecType: 'I' },
      { name: 'Perawat', description: descriptions.I, riasecType: 'I' },
      { name: 'Ahli gizi', description: descriptions.I, riasecType: 'I' },
      { name: 'Apoteker', description: descriptions.I, riasecType: 'I' },
      { name: 'Teknisi Laboratorium', description: descriptions.I, riasecType: 'I' },

      // --- Artistic (A) ---
      { name: 'Penulis', description: descriptions.A, riasecType: 'A' },
      { name: 'Aktor, Penyanyi, dan Penari', description: descriptions.A, riasecType: 'A' },
      { name: 'Fotografer', description: descriptions.A, riasecType: 'A' },
      { name: 'Perancang Busana', description: descriptions.A, riasecType: 'A' },
      { name: 'Komentator dan MC/Pembawa Acara', description: descriptions.A, riasecType: 'A' },
      { name: 'Social Media Specialist', description: descriptions.A, riasecType: 'A' },
      { name: 'Event Organizer', description: descriptions.A, riasecType: 'A' },
      { name: 'Public Relations', description: descriptions.A, riasecType: 'A' },
      { name: 'Desainer Grafis', description: descriptions.A, riasecType: 'A' },
      { name: 'Arsitek', description: descriptions.A, riasecType: 'A' },
      { name: 'Guru Sejarah/Bahasa Inggris', description: descriptions.A, riasecType: 'A' },

      // --- Social (S) ---
      { name: 'Human Resource Development', description: descriptions.S, riasecType: 'S' },
      {
        name: 'Pekerja Sosial, Sukarelawan, Kesehatan Masyarakat',
        description: descriptions.S,
        riasecType: 'S',
      },
      { name: 'Dosen', description: descriptions.S, riasecType: 'S' },
      { name: 'Tour Guide', description: descriptions.S, riasecType: 'S' },
      { name: 'Guru BK', description: descriptions.S, riasecType: 'S' },
      { name: 'Spesialis Nilai Properti', description: descriptions.S, riasecType: 'S' },
      { name: 'Polisi', description: descriptions.S, riasecType: 'S' },
      { name: 'Perawat, Ahli Gizi', description: descriptions.S, riasecType: 'S' },

      // --- Enterprising (E) ---
      { name: 'Business Development', description: descriptions.E, riasecType: 'E' },
      { name: 'Perencana Wilayah dan Tata Kota', description: descriptions.E, riasecType: 'E' },
      { name: 'Customer Service', description: descriptions.E, riasecType: 'E' },
      { name: 'Trader Saham', description: descriptions.E, riasecType: 'E' },
      { name: 'Akuntan', description: descriptions.E, riasecType: 'E' },
      { name: 'Pengacara', description: descriptions.E, riasecType: 'E' },
      { name: 'Pramugari', description: descriptions.E, riasecType: 'E' },
      { name: 'Sales', description: descriptions.E, riasecType: 'E' },
      { name: 'Polisi', description: descriptions.E, riasecType: 'E' },

      // --- Conventional (C) ---
      { name: 'Pengacara', description: descriptions.C, riasecType: 'C' },
      { name: 'Peneliti', description: descriptions.C, riasecType: 'C' },
      { name: 'Guru', description: descriptions.C, riasecType: 'C' },
      { name: 'Akuntan', description: descriptions.C, riasecType: 'C' },
      { name: 'Staf Keuangan', description: descriptions.C, riasecType: 'C' },
      { name: 'Aparatur Sipil Negara (ASN)', description: descriptions.C, riasecType: 'C' },
      { name: 'Teller', description: descriptions.C, riasecType: 'C' },
    ])
  }
}
