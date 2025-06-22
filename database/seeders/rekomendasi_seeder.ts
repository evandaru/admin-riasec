import Rekomendasi from '#models/rekomendasi'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const data = [
      // 1. ANALISIS SATU KATEGORI
      {
        tipe: 'single' as const,
        kategori: 'Realistic (R)',
        karakteristik_utama:
          'Senang bekerja dengan tangan, menyukai aktivitas fisik dan teknis, menikmati penggunaan alat dan mesin, serta menyukai tantangan praktis.',
        rekomendasi_jurusan_karier: [
          'Teknik Mesin, Teknik Elektro, Teknik Sipil',
          'Pertanian, Peternakan',
          'Kesehatan (Paramedis, Fisioterapi)',
          'Perbengkelan, Otomotif',
          'Teknisi, Konstruksi, Mekanik',
          'Pekerjaan yang melibatkan aktivitas lapangan',
        ],
      },
      {
        tipe: 'single' as const,
        kategori: 'Investigative (I)',
        karakteristik_utama:
          'Menyukai pemecahan masalah, berpikir analitis, senang melakukan penelitian dan eksplorasi ilmu pengetahuan.',
        rekomendasi_jurusan_karier: [
          'Matematika, Fisika, Kimia',
          'Biologi, Farmasi',
          'Teknologi Informatika, Data Science',
          'Astronomi, Geologi',
          'Hukum Islam, Ushuluddin',
          'Riset dan Pengembangan',
          'Dosen, Ilmuwan, Peneliti',
        ],
      },
      {
        tipe: 'single' as const,
        kategori: 'Artistic (A)',
        karakteristik_utama:
          'Kreatif, menyukai seni, musik, menulis, menggambar, dan mengekspresikan ide melalui karya seni.',
        rekomendasi_jurusan_karier: [
          'Seni Islam, Kaligrafi',
          'Sastra, Jurnalisme',
          'Desain Grafis, Multimedia',
          'Perfilman, Penyiaran',
          'Seniman, Penulis, Editor',
          'Guru Seni, Pendidik Kreatif',
        ],
      },
      {
        tipe: 'single' as const,
        kategori: 'Social (S)',
        karakteristik_utama:
          'Menyukai interaksi sosial, membantu orang lain, memberikan bimbingan, dan bekerja dalam tim.',
        rekomendasi_jurusan_karier: [
          'Pendidikan, Guru',
          'Bimbingan Konseling',
          'Psikologi',
          'Keperawatan, Kesehatan Masyarakat',
          'Dakwah, Komunikasi Islam',
          'Pekerjaan Sosial, LSM',
        ],
      },
      {
        tipe: 'single' as const,
        kategori: 'Enterprising (E)',
        karakteristik_utama:
          'Percaya diri, menyukai kepemimpinan, senang bernegosiasi, mengambil keputusan, dan mengelola bisnis.',
        rekomendasi_jurusan_karier: [
          'Manajemen, Kewirausahaan',
          'Administrasi Publik',
          'Hukum, Ilmu Politik',
          'Ekonomi Islam, Perbankan Syariah',
          'Jurnalisme, Presenter',
          'Motivator, Trainer',
        ],
      },
      {
        tipe: 'single' as const,
        kategori: 'Conventional (C)',
        karakteristik_utama:
          'Menyukai keteraturan, pekerjaan administratif, menyusun laporan, dan mengikuti prosedur sistematis.',
        rekomendasi_jurusan_karier: [
          'Akuntansi, Perpajakan',
          'Administrasi Perkantoran',
          'Manajemen Keuangan',
          'Kearsipan, Tata Usaha',
          'Sekretaris, Pegawai Negeri',
          'Auditor, Perencana Anggaran',
        ],
      },

      // 2. KOMBINASI DUA KATEGORI
      {
        tipe: 'double' as const,
        kategori: 'R & I (Realistic + Investigative)',
        karakteristik_utama:
          'Suka memecahkan masalah dengan cara praktis dan logis.\nTertarik pada eksperimen dan teknologi.\nSenang bekerja dengan alat dan mesin, tetapi juga suka analisis.',
        rekomendasi_jurusan_karier: [
          'Teknik Informatika, Teknik Mesin, Teknik Elektro',
          'Kedokteran, Farmasi, Bioteknologi',
          'Astronomi, Geologi, Ilmu Lingkungan',
          'Teknisi, Ilmuwan, Data Analyst',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'R & A (Realistic + Artistic)',
        karakteristik_utama:
          'Kreatif dalam hal desain tetapi juga menyukai pekerjaan praktis.\nSuka menggabungkan seni dengan keterampilan teknis.\nMenyukai bidang seni terapan seperti desain produk dan arsitektur.',
        rekomendasi_jurusan_karier: [
          'Desain Produk, Arsitektur, Interior Design',
          'Teknik Sipil, Teknik Industri, Desain Otomotif',
          'Multimedia, Animasi, Perfilman',
          'Seniman, Art Director, Pengrajin, Desainer Fashion',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'R & S (Realistic + Social)',
        karakteristik_utama:
          'Menyukai pekerjaan teknis tetapi juga ingin membantu orang lain.\nSuka mengajarkan keterampilan praktis kepada orang lain.\nBisa menjadi mentor dalam bidang teknik atau kesehatan.',
        rekomendasi_jurusan_karier: [
          'Keperawatan, Kesehatan Masyarakat, Paramedis',
          'Pendidikan Teknik, Guru Kejuruan',
          'Instruktur Bengkel, Pelatih Olahraga, Teknisi Medis',
          'Pekerjaan Sosial yang Berbasis Keterampilan',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'R & E (Realistic + Enterprising)',
        karakteristik_utama:
          'Praktis tetapi juga suka memimpin atau berwirausaha.\nMenyukai bisnis yang berbasis teknologi atau industri.\nBerjiwa wirausaha dan suka mengelola proyek teknis.',
        rekomendasi_jurusan_karier: [
          'Kewirausahaan, Manajemen Bisnis Teknik',
          'Teknik Mesin, Teknik Sipil, Teknologi Pangan',
          'Logistik, Properti, Konstruksi',
          'Manajer Proyek, Pemilik Usaha Bengkel/Konstruksi',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'R & C (Realistic + Conventional)',
        karakteristik_utama:
          'Praktis dan terstruktur, suka aturan dan sistem yang jelas.\nMenyukai pekerjaan teknis dengan prosedur yang terorganisir.\nCenderung menyukai bidang administrasi teknis.',
        rekomendasi_jurusan_karier: [
          'Akuntansi, Administrasi Perkantoran Teknik',
          'Manajemen Industri, Logistik, Supply Chain',
          'Teknik Sipil, Teknik Elektro (Bagian Perencanaan)',
          'Pegawai Pemerintah di Bidang Infrastruktur',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'I & A (Investigative + Artistic)',
        karakteristik_utama:
          'Suka berpikir analitis dan kreatif dalam waktu bersamaan.\nMenikmati menulis, desain, atau penelitian ilmiah.\nInovatif dalam menghasilkan ide baru berbasis riset.',
        rekomendasi_jurusan_karier: [
          'Jurnalistik, Sastra, Penelitian Sosial',
          'Desain Komunikasi Visual, UX/UI Designer',
          'Arsitektur, Desain Produk',
          'Penulis Buku, Ilmuwan Data Kreatif',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'I & S (Investigative + Social)',
        karakteristik_utama:
          'Suka menyelidiki dan memecahkan masalah sosial.\nMenyukai bidang penelitian yang berhubungan dengan manusia.\nIngin berkontribusi dalam dunia pendidikan atau psikologi.',
        rekomendasi_jurusan_karier: [
          'Psikologi, Bimbingan Konseling, Pendidikan',
          'Sosiologi, Antropologi, Hukum',
          'Dakwah Islam, Komunikasi Islam',
          'Konsultan Pendidikan, Peneliti Sosial',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'I & E (Investigative + Enterprising)',
        karakteristik_utama:
          'Memiliki pemikiran kritis tetapi juga percaya diri dalam berbicara.\nSuka mengambil keputusan berdasarkan analisis dan strategi.\nSenang meneliti tetapi juga ingin menjadi pemimpin.',
        rekomendasi_jurusan_karier: [
          'Manajemen Strategis, Ekonomi Islam',
          'Politik, Hukum, Konsultan Bisnis',
          'Teknologi Finansial, Data Science',
          'Peneliti Bisnis, Analis Keuangan, CEO Start-up',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'I & C (Investigative + Conventional)',
        karakteristik_utama:
          'Suka bekerja dengan data dan sistem yang terstruktur.\nMenyukai pekerjaan berbasis logika dan angka.\nDisiplin dan teliti dalam melakukan analisis.',
        rekomendasi_jurusan_karier: [
          'Akuntansi, Keuangan, Statistik',
          'Teknik Informatika, Database Management',
          'Administrasi Bisnis, Manajemen Risiko',
          'Pekerjaan di Lembaga Riset Pemerintah',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'A & S (Artistic + Social)',
        karakteristik_utama:
          'Kreatif dan ekspresif, tetapi juga suka membantu orang lain.\nSenang berinteraksi dan membimbing dalam bidang seni atau komunikasi.\nSuka mengajar, berbicara di depan umum, atau menyampaikan inspirasi.',
        rekomendasi_jurusan_karier: [
          'Pendidikan Seni, Drama, Musik Islami',
          'Komunikasi, Dakwah, Penyiaran Islam',
          'Psikologi, Motivator, Jurnalis',
          'Guru Seni, Pembicara, Public Relations',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'A & E (Artistic + Enterprising)',
        karakteristik_utama:
          'Kreatif dan inovatif dalam bisnis atau kepemimpinan.\nSuka menciptakan tren baru atau mengembangkan produk kreatif.\nMenyukai industri kreatif seperti perfilman, desain, atau mode.',
        rekomendasi_jurusan_karier: [
          'Kewirausahaan Kreatif, Fashion Design',
          'Film, Periklanan, Marketing Digital',
          'Event Organizer, Manajemen Seni',
          'Content Creator, YouTuber, Influencer',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'A & C (Artistic + Conventional)',
        karakteristik_utama:
          'Kreatif tetapi tetap menyukai keteraturan dan sistem.\nMenyukai desain yang berbasis struktur seperti arsitektur atau tata ruang.\nSenang dengan pekerjaan yang berhubungan dengan data seni.',
        rekomendasi_jurusan_karier: [
          'Desain Interior, Arsitektur',
          'Perpustakaan, Manajemen Arsip Digital',
          'Teknik Sipil, Tata Kota',
          'Editor, Manajemen Galeri Seni',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'S & E (Social + Enterprising)',
        karakteristik_utama:
          'Suka berinteraksi dan membangun hubungan, serta percaya diri dalam kepemimpinan.\nSenang mengelola tim atau organisasi.\nMemiliki keterampilan komunikasi yang kuat dan mampu memotivasi orang lain.',
        rekomendasi_jurusan_karier: [
          'Manajemen SDM, Public Relations',
          'Hukum, Politik, Organisasi Sosial',
          'Kepemimpinan Pendidikan, Motivator',
          'Manajer, Direktur, Pengusaha Sosial',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'S & C (Social + Conventional)',
        karakteristik_utama:
          'Menyukai pekerjaan sosial yang memiliki struktur dan aturan.\nSenang melakukan tugas administrasi dalam organisasi pendidikan atau sosial.\nTeliti dan bertanggung jawab dalam mengelola program sosial.',
        rekomendasi_jurusan_karier: [
          'Administrasi Pendidikan, Manajemen Sekolah',
          'Sekretaris Organisasi, Pegawai Lembaga Sosial',
          'Manajemen Non-Profit, Tata Kelola Masjid/Pesantren',
          'Akuntansi Sosial, Pengelola Koperasi Pesantren',
        ],
      },
      {
        tipe: 'double' as const,
        kategori: 'E & C (Enterprising + Conventional)',
        karakteristik_utama:
          'Pemimpin yang suka bekerja dengan sistem terorganisir.\nSenang mengatur bisnis dengan aturan yang jelas.\nKuat dalam mengelola sumber daya dan membuat keputusan strategis.',
        rekomendasi_jurusan_karier: [
          'Manajemen Keuangan, Administrasi Publik',
          'Perbankan, Akuntansi, Auditor',
          'Politik, Hukum Tata Negara',
          'Manajemen Usaha, CEO, Konsultan Keuangan',
        ],
      },

      // 3. KOMBINASI TIGA KATEGORI
      {
        tipe: 'triple' as const,
        kategori: 'R - I - A (Realistic + Investigative + Artistic)',
        karakteristik_utama:
          'Suka mengutak-atik teknologi, tetapi juga kreatif dan suka berpikir analitis.\nBisa bekerja dengan alat, data, dan konsep desain sekaligus.',
        rekomendasi_jurusan_karier: [
          'Teknik Arsitektur, Teknik Informatika (UI/UX Design)',
          'Desain Produk Teknologi, Multimedia, Desain Game',
          'Robotika, Rekayasa Perangkat Lunak, Bioengineering',
          'Peneliti Desain, Data Science Kreatif',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'R - I - S (Realistic + Investigative + Social)',
        karakteristik_utama:
          'Suka menyelesaikan masalah secara teknis dan ilmiah, tetapi juga ingin membantu orang lain.\nBisa menjadi pendidik di bidang sains atau teknologi.',
        rekomendasi_jurusan_karier: [
          'Pendidikan Teknik, Guru Sains/Teknologi',
          'Keperawatan, Teknik Medis, Kesehatan Masyarakat',
          'Instruktur Teknologi, Pelatihan Vokasi',
          'Peneliti Pendidikan STEM, Dosen Teknik',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'R - I - E (Realistic + Investigative + Enterprising)',
        karakteristik_utama:
          'Berjiwa wirausaha tetapi berbasis teknologi dan analisis data.\nInovatif dalam menciptakan solusi bisnis berbasis teknologi.',
        rekomendasi_jurusan_karier: [
          'Manajemen Teknologi, Teknologi Finansial',
          'Startup Teknologi, Konsultan Data Science',
          'Industri Otomotif, Kewirausahaan Teknik',
          'Pengembang AI, CEO Startup Teknologi',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'R - I - C (Realistic + Investigative + Conventional)',
        karakteristik_utama:
          'Teliti, analitis, dan terstruktur dalam bekerja dengan data atau sistem.\nCocok dalam bidang sains terapan yang membutuhkan keteraturan.',
        rekomendasi_jurusan_karier: [
          'Teknik Sipil, Teknik Industri, Teknik Elektro',
          'Aktuaris, Statistik, Manajemen Risiko',
          'Analis Data, Ilmuwan, Pegawai Birokrasi Teknologi',
          'Keuangan dan Audit Teknologi',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'R - A - S (Realistic + Artistic + Social)',
        karakteristik_utama:
          'Kreatif dalam pekerjaan teknis, tetapi juga ingin berbagi keterampilan dengan orang lain.\nMenikmati seni yang memiliki dampak sosial.',
        rekomendasi_jurusan_karier: [
          'Desain Interior, Arsitektur Sosial, Tata Kota',
          'Seni Pendidikan, Guru Seni Islam, Kaligrafi',
          'Multimedia Islami, Sutradara Film Religi, Dakwah Visual',
          'Seniman, Pelatih Seni Islam, Event Organizer',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'R - A - E (Realistic + Artistic + Enterprising)',
        karakteristik_utama:
          'Suka menciptakan produk inovatif yang juga bisa dikembangkan sebagai bisnis.\nMemiliki jiwa kreatif tetapi juga suka memimpin dan berbisnis.',
        rekomendasi_jurusan_karier: [
          'Desain Fashion, Manajemen Event Kreatif',
          'Pengusaha Seni, Desain Produk dan Merek',
          'Startup Kreatif, Film dan Periklanan',
          'Konsultan Branding, Desainer UI/UX, Influencer',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'R - A - C (Realistic + Artistic + Conventional)',
        karakteristik_utama:
          'Kreatif tetapi juga menyukai sistem yang terstruktur dalam seni dan desain.\nMenikmati pekerjaan kreatif dengan standar teknis tinggi.',
        rekomendasi_jurusan_karier: [
          'Desain Industri, Tata Kota, Teknik Arsitektur',
          'Arsiparis Seni, Kurator Museum',
          'Produksi Film dengan Standar Teknis Tinggi',
          'Ilustrator Profesional, Manajemen Galeri Seni',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'R - S - E (Realistic + Social + Enterprising)',
        karakteristik_utama:
          'Memiliki keterampilan teknis tetapi juga suka berinteraksi dengan orang banyak dan memimpin.\nCocok menjadi mentor, trainer, atau entrepreneur dalam bidang teknis.',
        rekomendasi_jurusan_karier: [
          'Pelatihan Kewirausahaan, Trainer Vokasi',
          'Manajemen Teknik, Keperawatan Bisnis',
          'Teknisi Medis, Paramedis Sosial',
          'Instruktur Olahraga, Konsultan Lapangan',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'I - A - S (Investigative + Artistic + Social)',
        karakteristik_utama:
          'Kombinasi antara sains, kreativitas, dan kepedulian sosial.\nBisa menjadi komunikator sains atau pendidik dalam bidang seni dan ilmu.',
        rekomendasi_jurusan_karier: [
          'Jurnalisme Ilmiah, Penulis Buku Sains',
          'Guru Sains Kreatif, Ilmuwan Sosial, Peneliti Sosial',
          'Komunikasi Visual, Psikologi, Motivator',
          'Penulis Konten Edukasi, Konsultan Pendidikan',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'I - A - E (Investigative + Artistic + Enterprising)',
        karakteristik_utama:
          'Pemikir kritis yang juga memiliki visi bisnis dalam industri kreatif atau teknologi.\nCocok dalam bidang startup inovatif berbasis desain dan analisis data.',
        rekomendasi_jurusan_karier: [
          'Kewirausahaan Teknologi Kreatif, Digital Marketing',
          'Bisnis Fashion, Desain Produk Digital',
          'Politik dan Komunikasi, Jurnalis Digital',
          'Content Creator Berbasis Data, CEO Startup Kreatif',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'I - S - E (Investigative + Social + Enterprising)',
        karakteristik_utama:
          'Senang meneliti, menganalisis, dan memiliki kemampuan komunikasi yang kuat.\nBisa menjadi konsultan atau pemimpin dalam bidang sosial berbasis sains.',
        rekomendasi_jurusan_karier: [
          'Psikologi, Konsultan SDM, Manajemen Pendidikan',
          'Hukum, Politik, Jurnalis Investigatif',
          'Ekonomi Islam, Pengembangan Sosial',
          'Dakwah Digital, Motivator',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'A - S - E (Artistic + Social + Enterprising)',
        karakteristik_utama:
          'Kreatif dalam komunikasi dan memiliki jiwa kepemimpinan sosial.\nSuka menginspirasi orang lain melalui karya seni atau komunikasi.',
        rekomendasi_jurusan_karier: [
          'Public Speaking, Penyiar, Dakwah Islam',
          'Manajemen Event, Penyutradaraan Film Islami',
          'Guru Seni dan Budaya Islam, Motivator',
          'Marketing Digital, Influencer Islami',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'A - S - C (Artistic + Social + Conventional)',
        karakteristik_utama:
          'Suka seni tetapi juga ingin berbagi pengetahuan dalam sistem yang terstruktur.\nCocok menjadi guru seni atau manajer kreatif dalam organisasi sosial.',
        rekomendasi_jurusan_karier: [
          'Manajemen Seni, Arsiparis Seni, Kurator',
          'Pendidikan Seni, Bimbingan Konseling',
          'Jurnalis Media Islam, Pengelola Lembaga Budaya',
          'Pustakawan, Editor Buku Islam',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'S - C - E (Social + Conventional + Enterprising)',
        karakteristik_utama:
          'Cenderung memiliki keterampilan interpersonal yang baik.\nMenyukai pekerjaan yang terstruktur dan sistematis.\nMemiliki jiwa kepemimpinan dan kewirausahaan (E).',
        rekomendasi_jurusan_karier: [
          'Manajemen Pendidikan',
          'Administrasi Pendidikan',
          'Manajemen Bisnis & Kewirausahaan',
          'Sumber Daya Manusia (HRD)',
          'Manajemen Keuangan & Perbankan',
          'Bimbingan & Konseling',
          'Psikologi Organisasi & Industri',
          'Pekerjaan Sosial dan Layanan Masyarakat',
          'Administrasi Publik & Pemerintahan',
          'Manajemen Rumah Sakit & Layanan Kesehatan',
        ],
      },
      {
        tipe: 'triple' as const,
        kategori: 'S - C - I (Social + Conventional + Investigative)',
        karakteristik_utama:
          'Memiliki kemampuan analitis yang baik.\nSenang membantu orang lain.\nSerta menyukai pekerjaan yang terstruktur dan administratif.',
        rekomendasi_jurusan_karier: [
          'Psikologi Klinis & Konseling',
          'Bimbingan & Konseling',
          'Administrasi Pendidikan',
          'Sosiologi & Antropologi',
          'Ilmu Hukum & Kriminologi',
          'Manajemen Arsip & Perpustakaan',
          'Kesehatan Masyarakat',
          'Ilmu Perpustakaan & Informasi',
          'Statistik Sosial & Data Science',
          'Riset dan Pengembangan Sosial',
        ],
      },
    ]

    // Memasukkan data ke database
    await Rekomendasi.createMany(data)
  }
}
