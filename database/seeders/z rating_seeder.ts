import { BaseSeeder } from '@adonisjs/lucid/seeders'
// import Siswa from '#models/siswa'
// import Program from '#models/program'
// import ProgramRating from '#models/program_rating'
// import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  // public async run() {
  //   // 1. Ambil semua data siswa dan program yang ada.
  //   // Pastiin kamu udah punya seeder buat Siswa dan Program ya!
  //   const allSiswa = await Siswa.all()
  //   const allPrograms = await Program.all()
  //   if (allSiswa.length === 0 || allPrograms.length === 0) {
  //     return
  //   }
  //   const ratingsToCreate: Partial<ProgramRating>[] = []
  //   // Define the allowed keys for RIASEC profiles
  //   type RIASECKey =
  //     | 'realistic'
  //     | 'investigative'
  //     | 'artistic'
  //     | 'social'
  //     | 'enterprising'
  //     | 'conventional'
  //   // 2. Kita iterasikan setiap siswa buat ngasih rating ke setiap program.
  //   for (const siswa of allSiswa) {
  //     // 3. Buat simulasi profil minat RIASEC buat siswa.
  //     // Di dunia nyata, ini hasil dari asesmen. Di sini kita random aja biar variatif.
  //     const siswaInterestProfile: Record<RIASECKey, number> = {
  //       realistic: Math.random() * 10,
  //       investigative: Math.random() * 10,
  //       artistic: Math.random() * 10,
  //       social: Math.random() * 10,
  //       enterprising: Math.random() * 10,
  //       conventional: Math.random() * 10,
  //     }
  //     for (const program of allPrograms) {
  //       // 4. Hitung "kecocokan" pake Cosine Similarity.
  //       // Ini cara keren buat tau seberapa "mirip" minat siswa dengan karakteristik program.
  //       const programVector: Record<RIASECKey, number> = {
  //         realistic: program.realistic,
  //         investigative: program.investigative,
  //         artistic: program.artistic,
  //         social: program.social,
  //         enterprising: program.enterprising,
  //         conventional: program.conventional,
  //       }
  //       const dotProduct = (Object.keys(siswaInterestProfile) as RIASECKey[]).reduce(
  //         (acc, key) => acc + siswaInterestProfile[key] * programVector[key],
  //         0
  //       )
  //       const magnitudeSiswa = Math.sqrt(
  //         Object.values(siswaInterestProfile).reduce((acc, val) => acc + val * val, 0)
  //       )
  //       const magnitudeProgram = Math.sqrt(
  //         Object.values(programVector).reduce((acc, val) => acc + val * val, 0)
  //       )
  //       let similarity = 0
  //       if (magnitudeSiswa > 0 && magnitudeProgram > 0) {
  //         similarity = dotProduct / (magnitudeSiswa * magnitudeProgram)
  //       }
  //       // 5. Konversi skor similaritas (0-1) jadi rating (1-5).
  //       // Kita tambahin sedikit "noise" biar datanya nggak terlalu sempurna & lebih natural.
  //       let rating = Math.round(similarity * 4) + 1 // Skala 1-5
  //       const noise = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0 // 20% kemungkinan ada noise
  //       rating = Math.max(1, Math.min(5, rating + noise)) // Pastiin rating tetap di skala 1-5.
  //       ratingsToCreate.push({
  //         siswaId: siswa.id,
  //         programId: Number(program.id),
  //         rating: rating,
  //         createdAt: DateTime.now(),
  //         updatedAt: DateTime.now(),
  //       })
  //     }
  //   }
  //   // 6. Insert semua rating ke database sekaligus. Lebih efisien!
  //   if (ratingsToCreate.length > 0) {
  //     await ProgramRating.createMany(ratingsToCreate)
  //   }
  // }
}
