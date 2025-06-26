// title: app/services/recommendation_service.ts

import HasilTes from '#models/hasil'
import Program from '#models/program'
import ProgramRating from '#models/program_rating'
import * as math from 'mathjs'

// --- HELPER FUNCTION (Internal - Not Exported) ---
/**
 * Menghitung Cosine Similarity antara dua vektor numerik.
 */
function calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length || vecA.length === 0) {
    console.error('[Similarity] Vektor tidak cocok atau kosong.', { vecA, vecB })
    return 0
  }

  // 1. Hitung Dot Product: (a1*b1) + (a2*b2) + ...
  const dotProduct = vecA.map((val, i) => val * vecB[i]).reduce((sum, current) => sum + current, 0)

  // 2. Hitung Norm (Magnitude/Panjang Vektor) untuk Vektor A: sqrt(a1^2 + a2^2 + ...)
  const normA = math.sqrt(
    vecA.map((val) => val * val).reduce((sum, current) => sum + current, 0)
  ) as number

  // 3. Hitung Norm untuk Vektor B
  const normB = math.sqrt(
    vecB.map((val) => val * val).reduce((sum, current) => sum + current, 0)
  ) as number

  if (normA === 0 || normB === 0) {
    // console.log('[Similarity] Salah satu vektor adalah nol, similaritas = 0.')
    return 0
  }

  // 4. Hitung Similaritas: Dot Product / (NormA * NormB)
  const similarity = dotProduct / (normA * normB)

  // Log untuk pembelajaran:
  console.log(`[Similarity] Menghitung kemiripan:
    -> Vektor A: [${vecA.join(', ')}]
    -> Vektor B: [${vecB.join(', ')}]
    -> Dot Product: ${dotProduct}
    -> Norm A: ${normA.toFixed(4)}
    -> Norm B: ${normB.toFixed(4)}
    -> Similarity Score: ${dotProduct} / (${normA.toFixed(4)} * ${normB.toFixed(4)}) = ${similarity.toFixed(4)}`)

  return similarity
}

// --- METHOD 1: CONTENT-BASED FILTERING (Internal - Not Exported) ---
/**
 * Memberikan rekomendasi program berdasarkan kemiripan profil RIASEC siswa
 * dengan profil RIASEC setiap program studi (Content-Based).
 */
async function getRecommendationsByContent(siswaId: number, topN: number = 6): Promise<Program[]> {
  console.log(`\n--- Memulai Rekomendasi [Content-Based] untuk Siswa ID: ${siswaId} ---`)

  // 1. Dapatkan profil RIASEC siswa (vektor target)
  const hasilTes = await HasilTes.query()
    .where('siswa_id', siswaId)
    .orderBy('created_at', 'desc')
    .first()
  if (!hasilTes) {
    console.log('[Content-Based] GAGAL: Siswa belum mengerjakan tes RIASEC.')
    return []
  }
  const siswaVector = [
    hasilTes.skorR,
    hasilTes.skorI,
    hasilTes.skorA,
    hasilTes.skorS,
    hasilTes.skorE,
    hasilTes.skorC,
  ]
  console.log(
    `[Content-Based] LANGKAH 1: Vektor RIASEC siswa target ditemukan: [${siswaVector.join(', ')}]`
  )

  // 2. Dapatkan profil RIASEC dari semua program
  const allPrograms = await Program.all()
  if (allPrograms.length === 0) {
    console.log('[Content-Based] GAGAL: Tidak ada data program di database.')
    return []
  }
  console.log(
    `[Content-Based] LANGKAH 2: Ditemukan ${allPrograms.length} program studi untuk dibandingkan.`
  )

  // 3. Hitung similaritas antara siswa dan SETIAP program
  console.log(
    `\n[Content-Based] LANGKAH 3: Menghitung Cosine Similarity antara siswa dan setiap program...`
  )
  const programSimilarities = allPrograms.map((program) => {
    const programVector = [
      program.realistic,
      program.investigative,
      program.artistic,
      program.social,
      program.enterprising,
      program.conventional,
    ]
    console.log(`\n  Membandingkan dengan Program ID: ${program.id} (${program.name})`)
    const similarity = calculateCosineSimilarity(siswaVector, programVector)
    return { program, similarity }
  })

  // 4. Urutkan program berdasarkan skor similaritas tertinggi
  console.log(
    `\n[Content-Based] LANGKAH 4: Mengurutkan program berdasarkan skor similaritas (tertinggi ke terendah).`
  )
  programSimilarities.sort((a, b) => b.similarity - a.similarity)

  // Log untuk melihat hasil pengurutan
  console.log('  -> Hasil setelah diurutkan:')
  programSimilarities.forEach((p) =>
    console.log(`    - Prog ID ${p.program.id}: Skor ${p.similarity.toFixed(4)}`)
  )

  // 5. Ambil top N program dan kembalikan hasilnya
  const topRecommendations = programSimilarities.slice(0, topN)
  console.log(`\n[Content-Based] LANGKAH 5: Mengambil ${topN} rekomendasi teratas.`)

  console.log(
    `[Content-Based] HASIL AKHIR (ID & Skor):`,
    topRecommendations.map((r) => ({
      programId: r.program.id,
      similarityScore: r.similarity.toFixed(4),
    }))
  )
  console.log(`--- Rekomendasi [Content-Based] Selesai ---`)

  return topRecommendations.map((rec) => {
    rec.program.$extras.recommendationScore = rec.similarity
    return rec.program
  })
}

// --- METHOD 2: COLLABORATIVE FILTERING (Internal - Not Exported) ---
/**
 * Memberikan rekomendasi berdasarkan preferensi (rating) dari siswa lain yang
 * memiliki profil RIASEC serupa (User-User Collaborative Filtering).
 */
async function getRecommendationsByCollaborativeFiltering(
  targetSiswaId: number,
  topSimilarUsers: number = 6,
  topNPrograms: number = 6
): Promise<Program[]> {
  console.log(
    `\n--- Memulai Rekomendasi [Collaborative-Filtering] untuk Siswa ID: ${targetSiswaId} ---`
  )

  // 1. Dapatkan data tes untuk target dan siswa lainnya
  const targetHasilTes = await HasilTes.query().where('siswa_id', targetSiswaId).first()
  const allOtherHasilTes = await HasilTes.query().whereNot('siswa_id', targetSiswaId)

  if (!targetHasilTes || allOtherHasilTes.length === 0) {
    console.log(
      '[CF] GAGAL: Data tes tidak cukup (membutuhkan data target dan minimal 1 siswa lain).'
    )
    return []
  }
  const targetVector = [
    targetHasilTes.skorR,
    targetHasilTes.skorI,
    targetHasilTes.skorA,
    targetHasilTes.skorS,
    targetHasilTes.skorE,
    targetHasilTes.skorC,
  ]
  console.log(
    `[CF] LANGKAH 1: Vektor siswa target [${targetVector.join(', ')}] dan ${allOtherHasilTes.length} siswa lain ditemukan.`
  )

  // 2. Hitung similaritas dengan semua siswa lain
  console.log(`\n[CF] LANGKAH 2: Menghitung kemiripan siswa target dengan semua siswa lain...`)
  const similarities = allOtherHasilTes
    .map((otherHasil) => {
      const otherVector = [
        otherHasil.skorR,
        otherHasil.skorI,
        otherHasil.skorA,
        otherHasil.skorS,
        otherHasil.skorE,
        otherHasil.skorC,
      ]
      console.log(`\n  Membandingkan dengan Siswa ID: ${otherHasil.siswaId}`)
      return {
        siswaId: otherHasil.siswaId,
        similarity: calculateCosineSimilarity(targetVector, otherVector),
      }
    })
    .filter((s) => s.similarity > 0.5) // Filter: hanya pertimbangkan user yang cukup mirip (misal > 0.5)

  // 3. Urutkan dan ambil top N "tetangga" (neighbors)
  similarities.sort((a, b) => b.similarity - a.similarity)
  const topSimilarities = similarities.slice(0, topSimilarUsers)
  const similarUserIds = topSimilarities.map((s) => s.siswaId)

  if (similarUserIds.length === 0) {
    console.log('[CF] GAGAL: Tidak ditemukan siswa lain yang cukup mirip.')
    return []
  }
  console.log(
    `\n[CF] LANGKAH 3: Ditemukan ${similarUserIds.length} "tetangga" terdekat (paling mirip):`
  )
  topSimilarities.forEach((s) =>
    console.log(`  - Siswa ID: ${s.siswaId}, Skor Kemiripan: ${s.similarity.toFixed(4)}`)
  )

  // 4. Kumpulkan rating dari para tetangga (hanya yang bagus)
  const similarUsersRatings = await ProgramRating.query()
    .whereIn('siswa_id', similarUserIds)
    .where('rating', '>=', 4)
  if (similarUsersRatings.length === 0) {
    console.log('[CF] GAGAL: Para tetangga tidak memiliki rating yang cukup tinggi (>= 4).')
    return []
  }
  console.log(
    `\n[CF] LANGKAH 4: Ditemukan ${similarUsersRatings.length} rating tinggi dari para tetangga.`
  )
  // console.log('  -> Data rating:', similarUsersRatings.map(r => ({user: r.siswaId, program: r.programId, rating: r.rating})));

  // 5. Hitung skor prediksi untuk setiap program berdasarkan rating tetangga
  console.log(`\n[CF] LANGKAH 5: Menghitung skor prediksi untuk setiap program...`)
  console.log(
    `  -> RUMUS: Prediksi(Program) = Σ (Kemiripan_Tetangga * Rating_Tetangga) / Σ (Kemiripan_Tetangga)`
  )
  const programScores = new Map<number, { totalScore: number; similaritySum: number }>()
  similarUsersRatings.forEach((rating) => {
    const similarityInfo = topSimilarities.find((s) => s.siswaId === rating.siswaId)
    if (!similarityInfo) return

    const similarity = similarityInfo.similarity
    const weightedScore = similarity * rating.rating

    const current = programScores.get(rating.programId) || { totalScore: 0, similaritySum: 0 }
    programScores.set(rating.programId, {
      totalScore: current.totalScore + weightedScore,
      similaritySum: current.similaritySum + similarity,
    })
    console.log(
      `    - Prog ID ${rating.programId}: Tetangga ID ${rating.siswaId} (kemiripan ${similarity.toFixed(2)}) memberi rating ${rating.rating}. Skor berbobot: ${weightedScore.toFixed(2)}.`
    )
  })

  // 6. Buat daftar rekomendasi akhir
  console.log(`\n[CF] LANGKAH 6: Menghitung skor prediksi final dan mengurutkan...`)
  const recommendations = Array.from(programScores.entries())
    .map(([programId, scores]) => {
      const predictedRating =
        scores.similaritySum > 0 ? scores.totalScore / scores.similaritySum : 0
      console.log(
        `  -> Prediksi Prog ID ${programId}: ${scores.totalScore.toFixed(2)} / ${scores.similaritySum.toFixed(2)} = ${predictedRating.toFixed(4)}`
      )
      return { programId, predictedRating }
    })
    .sort((a, b) => b.predictedRating - a.predictedRating)
    .slice(0, topNPrograms)

  const recommendationIds = recommendations.map((r) => r.programId)
  if (recommendationIds.length === 0) {
    console.log('[CF] GAGAL: Tidak ada rekomendasi yang bisa dihasilkan setelah perhitungan.')
    return []
  }

  // 7. Ambil detail program dari database
  const recommendedPrograms = await Program.query().whereIn('id', recommendationIds)

  // 8. Susun ulang & tambahkan skor
  const finalResult = recommendationIds
    .map((id) => {
      const program = recommendedPrograms.find((p) => p.id === BigInt(id))
      if (program) {
        program.$extras.recommendationScore = recommendations.find(
          (r) => r.programId === id
        )?.predictedRating
      }
      return program
    })
    .filter((p): p is Program => p !== undefined)

  console.log(`\n[CF] HASIL AKHIR (${finalResult.length} rekomendasi):`)
  finalResult.forEach((p) =>
    console.log(
      `  - Prog ID ${p.id} (${p.name}), Skor Prediksi: ${p.$extras.recommendationScore.toFixed(4)}`
    )
  )
  console.log(`--- Rekomendasi [Collaborative-Filtering] Selesai ---`)

  return finalResult
}

// --- MAIN EXPORT: HYBRID SYSTEM ---
export async function getHybridRecommendations(siswaId: number): Promise<Program[]> {
  console.log(`\n\n======================================================`)
  console.log(`[HYBRID] Memulai Proses Rekomendasi Hybrid untuk Siswa ID: ${siswaId}`)
  console.log(`======================================================`)

  console.log('\n[HYBRID] STRATEGI: Mencoba Collaborative Filtering terlebih dahulu.')
  let recommendations = await getRecommendationsByCollaborativeFiltering(siswaId)

  if (recommendations.length === 0) {
    console.log(`\n[HYBRID] STRATEGI: Collaborative Filtering tidak menghasilkan rekomendasi.`)
    console.log(`[HYBRID] TINDAKAN: Beralih (fallback) ke metode Content-Based Filtering.`)
    recommendations = await getRecommendationsByContent(siswaId)
  } else {
    console.log('\n[HYBRID] STRATEGI: Collaborative Filtering berhasil menghasilkan rekomendasi.')
    console.log('[HYBRID] TINDAKAN: Menggunakan hasil dari Collaborative Filtering.')
  }

  console.log(`\n======================================================`)
  console.log(`[HYBRID] PROSES SELESAI. Total ${recommendations.length} rekomendasi ditemukan.`)
  console.log(`======================================================`)
  return recommendations
}
