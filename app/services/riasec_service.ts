// title: app/services/riasec_service.ts

import db from '@adonisjs/lucid/services/db'
import RiasecPertanyaan from '#models/riasec_pertanyaan'
import HasilTes from '#models/hasil'
import JawabanTes from '#models/jawaban'
import MinatBakat from '#models/minat_bakat'

type Answers = Record<string, number>
type RiasecScores = { R: number; I: number; A: number; S: number; E: number; C: number }

export default class RiasecService {
  /**
   * Memproses jawaban tes RIASEC, menghitung skor, dan menyimpan hasilnya.
   */
  public async processTest(siswaId: number, answers: Answers): Promise<HasilTes> {
    console.log(`\n--- Memulai Proses Tes RIASEC untuk Siswa ID: ${siswaId} ---`)
    console.log('[INPUT] Jawaban yang diterima:', answers)

    return await db.transaction(async (trx) => {
      // (Validasi tidak diubah, jadi kita fokus pada logika utama)
      const allQuestions = await RiasecPertanyaan.query({ client: trx })
      const questionsMap = new Map(allQuestions.map((q) => [q.id, q.tipeRiasec]))

      // ... validasi lainnya ...

      console.log('\n[LANGKAH 1] Inisialisasi Skor Awal')
      const scores: RiasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 }
      console.log('Skor Awal:', scores)

      console.log('\n[LANGKAH 2] Menghitung Skor Berdasarkan Jawaban')
      for (const [questionIdStr, scoreValue] of Object.entries(answers)) {
        if (scoreValue === 1) {
          // Hanya proses jawaban 'Ya' (nilai 1)
          const questionId = Number(questionIdStr)
          const tipe = questionsMap.get(questionId)
          if (tipe && tipe in scores) {
            scores[tipe as keyof RiasecScores]++
            console.log(
              ` -> Jawaban 'Ya' untuk pertanyaan ID ${questionId} (Tipe: ${tipe}). Menambah skor ${tipe}. Skor ${tipe} sekarang: ${scores[tipe as keyof RiasecScores]}`
            )
          }
        }
      }

      console.log('\n[LANGKAH 3] Hasil Akhir Perhitungan Skor')
      console.log('Skor Final:', scores)

      console.log('\n[LANGKAH 4] Mengurutkan Skor untuk Menentukan Kode Holland')
      const sortedScores = Object.entries(scores).sort(([keyA, valA], [keyB, valB]) => {
        if (valB !== valA) return valB - valA // Urutkan dari nilai tertinggi ke terendah
        return keyA.localeCompare(keyB) // Jika nilai sama, urutkan berdasarkan abjad (R, I, A, S, E, C)
      })
      console.log(
        'Skor setelah diurutkan (descending):',
        sortedScores.map((s) => `${s[0]}: ${s[1]}`)
      )

      console.log('\n[LANGKAH 5] Membuat Kode Holland (3 Tipe Teratas)')
      const hollandCode = sortedScores
        .slice(0, 3)
        .map(([key]) => key)
        .join('')
      console.log('Kode Holland yang dihasilkan:', hollandCode)

      const hasil = await HasilTes.create(
        {
          siswaId,
          skorR: scores.R,
          skorI: scores.I,
          skorA: scores.A,
          skorS: scores.S,
          skorE: scores.E,
          skorC: scores.C,
          kodeHolland: hollandCode,
        },
        { client: trx }
      )
      console.log(`\n[LANGKAH 6] Hasil Tes berhasil disimpan ke DB dengan ID: ${hasil.id}`)

      // ... (menyimpan jawaban detail tidak perlu log mendalam)
      const jawabanData = Object.keys(answers)
        .map(Number)
        .map((id) => ({
          hasilTesId: hasil.id,
          pertanyaanId: id,
          jawaban: Boolean(answers[id]),
        }))
      await JawabanTes.createMany(jawabanData, { client: trx })
      console.log(` -> ${jawabanData.length} detail jawaban juga disimpan.`)

      console.log('--- Proses Tes RIASEC Selesai ---')
      return hasil
    })
  }

  /**
   * Memberikan rekomendasi minat dan bakat yang paling relevan berdasarkan
   * hasil tes dengan sistem skor berbobot dan pembatasan jumlah.
   */
  public async getInterestRecommendations(
    hasilTes: HasilTes,
    limit: number = 6
  ): Promise<MinatBakat[]> {
    console.log(`\n--- Memulai Proses Rekomendasi untuk Hasil Tes ID: ${hasilTes.id} ---`)
    console.log(`[INPUT] Kode Holland: "${hasilTes.kodeHolland}", Batas Rekomendasi: ${limit}`)

    if (!hasilTes.kodeHolland || hasilTes.kodeHolland.length < 3) {
      console.log(
        '[WARNING] Kode Holland tidak valid atau kurang dari 3 karakter. Mengembalikan array kosong.'
      )
      return []
    }

    const topTypes = hasilTes.kodeHolland.split('') // Misal: ['E', 'C', 'R']
    console.log('\n[LANGKAH 1] Mengekstrak 3 Tipe Teratas dari Kode Holland')
    console.log('Tipe Teratas:', topTypes)

    console.log('\n[LANGKAH 2] Membuat Peta Pembobotan (Weight Map)')
    const weights: Record<string, number> = {
      [topTypes[0]]: 3, // Tipe primer mendapat 3 poin
      [topTypes[1]]: 2, // Tipe sekunder mendapat 2 poin
      [topTypes[2]]: 1, // Tipe tersier mendapat 1 poin
    }
    console.log('Peta Bobot (Tipe_Primer: 3, Sekunder: 2, Tersier: 1):', weights)

    console.log('\n[LANGKAH 3] Mengambil Semua Minat Bakat yang Relevan dari Database')
    const allMatchedInterests = await MinatBakat.query().whereIn('riasec_type', topTypes)
    console.log(
      `Ditemukan ${allMatchedInterests.length} data MinatBakat yang cocok dengan tipe ${topTypes.join(', ')}.`
    )
    // Untuk debugging lebih detail, Anda bisa melihat data mentahnya:
    // console.log('Data mentah dari DB:', allMatchedInterests.map(i => ({ name: i.name, type: i.riasecType })));

    console.log('\n[LANGKAH 4] Menghitung Skor Berbobot untuk Setiap Minat Bakat Unik')
    const scoredInterests: Record<string, { data: MinatBakat; matchScore: number }> = {}

    for (const interest of allMatchedInterests) {
      // Inisialisasi jika nama minat bakat ini belum ada di daftar
      if (!scoredInterests[interest.name]) {
        scoredInterests[interest.name] = { data: interest, matchScore: 0 }
        // console.log(` -> Inisialisasi skor untuk minat: "${interest.name}"`)
      }

      const scoreToAdd = weights[interest.riasecType]
      if (scoreToAdd) {
        const oldScore = scoredInterests[interest.name].matchScore
        scoredInterests[interest.name].matchScore += scoreToAdd
        console.log(
          ` -> Minat "${interest.name}" (Tipe: ${interest.riasecType}) mendapat bobot ${scoreToAdd}. Skor total sekarang: ${oldScore} + ${scoreToAdd} = ${scoredInterests[interest.name].matchScore}`
        )
      }
    }
    console.log(
      '\nHasil Agregasi Skor (sebelum diurutkan):',
      Object.fromEntries(
        Object.entries(scoredInterests).map(([name, val]) => [name, val.matchScore])
      )
    )

    console.log('\n[LANGKAH 5] Mengurutkan Rekomendasi Berdasarkan Skor Tertinggi')
    const sortedInterests = Object.values(scoredInterests).sort(
      (a, b) => b.matchScore - a.matchScore
    )
    const maxScore = sortedInterests[0]?.matchScore || 0 // Skor tertinggi
    const scorePercentageThreshold = 0.5 // Ambil yang skornya minimal 50% dari skor maksimum
    const recommendations = sortedInterests
      .filter((item) => item.matchScore >= maxScore * scorePercentageThreshold)
      .map((item) => {
        item.data.$extras.matchScore = item.matchScore
        return item.data
      })

    console.log(
      `\n[HASIL AKHIR] ${recommendations.length} Rekomendasi Teratas (dibatasi oleh ${scorePercentageThreshold * 100}% dari skor maksimum=${maxScore}):`
    )
    recommendations.forEach((rec, index) => {
      console.log(`  ${index + 1}. Nama: "${rec.name}", Skor Kecocokan: ${rec.$extras.matchScore}`)
    })
    console.log('--- Proses Rekomendasi Selesai ---')

    return recommendations
  }
}
