// title: database/seeders/z hasil_tes_seeder.ts (REVISI)
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import HasilTes from '#models/hasil'
import Siswa from '#models/siswa'

export default class extends BaseSeeder {
  public async run() {
    const allSiswa = await Siswa.all()
    if (allSiswa.length === 0) {
      console.log('Tidak ada siswa untuk di-seed hasil tesnya.')
      return
    }

    // Definisikan Persona/Tipe Minat
    const personas = [
      { name: 'Si Praktis', dominant: ['R', 'C'], secondary: ['I', 'E'] }, // Tipe Realistic-Conventional
      { name: 'Si Peneliti', dominant: ['I', 'C'], secondary: ['R', 'A'] }, // Tipe Investigative-Conventional
      { name: 'Si Kreatif', dominant: ['A', 'S'], secondary: ['E', 'I'] }, // Tipe Artistic-Social
      { name: 'Si Sosialita', dominant: ['S', 'E'], secondary: ['A', 'C'] }, // Tipe Social-Enterprising
      { name: 'Si Pebisnis', dominant: ['E', 'C'], secondary: ['S', 'R'] }, // Tipe Enterprising-Conventional
      { name: 'Si Campuran Unik', dominant: ['I', 'A', 'S'], secondary: ['R', 'E', 'C'] }, // Tipe I-A-S
    ]

    const hasilTesData: Partial<HasilTes>[] = []

    for (const [i, siswa] of allSiswa.entries()) {
      // Pilih persona secara bergiliran untuk memastikan variasi
      const persona = personas[i % personas.length]

      const scores: { [key: string]: number } = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }

      // Beri skor TINGGI untuk tipe dominan
      persona.dominant.forEach((type) => {
        scores[type] = Math.floor(Math.random() * 8) + 8 // Skor antara 8-15
      })

      // Beri skor SEDANG untuk tipe sekunder
      persona.secondary.forEach((type) => {
        if (scores[type] === 0) {
          // Hanya isi jika belum diisi oleh dominan
          scores[type] = Math.floor(Math.random() * 5) + 3 // Skor antara 3-7
        }
      })

      // Beri skor RENDAH untuk sisanya
      Object.keys(scores).forEach((type) => {
        if (scores[type] === 0) {
          scores[type] = Math.floor(Math.random() * 3) + 1 // Skor antara 1-3
        }
      })

      // Buat Kode Holland dari 3 skor tertinggi
      const sortedScores = (Object.entries(scores) as [keyof typeof scores, number][]).sort(
        ([, a], [, b]) => b - a
      )
      const hollandCode = sortedScores
        .slice(0, 3)
        .map(([key]) => key)
        .join('')

      hasilTesData.push({
        siswaId: siswa.id,
        skorR: scores.R,
        skorI: scores.I,
        skorA: scores.A,
        skorS: scores.S,
        skorE: scores.E,
        skorC: scores.C,
        kodeHolland: hollandCode,
      })
    }

    // Hapus hasil tes lama untuk menghindari duplikat jika seeder dijalankan lagi
    await HasilTes.truncate()
    await HasilTes.createMany(hasilTesData)
    console.log(`Berhasil membuat ${hasilTesData.length} data hasil tes dengan persona.`)
  }
}
