// title: inertia/pages/admin/siswaRiasec/view.tsx
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '../layouts/main'
import { Award, BrainCircuit, Printer, Lightbulb, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion' // 1. Impor Framer Motion untuk animasi

// --- DATA DESKRIPSI RIASEC ---
const descriptions = {
    R: {
        name: 'Realistic (The Doer)',
        desc: 'Orang dengan tipe Realistis suka bekerja dengan objek, mesin, peralatan, tanaman, atau hewan. Mereka menikmati pekerjaan yang membutuhkan keterampilan praktis dan kekuatan fisik.',
        color: 'bg-gradient-to-r from-orange-400 to-orange-600',
    },
    I: {
        name: 'Investigative (The Thinker)',
        desc: 'Tipe Investigatif senang mengamati, belajar, menyelidiki, menganalisis, dan memecahkan masalah. Mereka unggul dalam tugas-tugas yang membutuhkan pemikiran abstrak dan analitis.',
        color: 'bg-gradient-to-r from-sky-400 to-sky-600',
    },
    A: {
        name: 'Artistic (The Creator)',
        desc: 'Tipe Artistik memiliki kemampuan artistik, inovatif, dan intuitif. Mereka suka bekerja dalam situasi yang tidak terstruktur di mana mereka dapat menggunakan imajinasi dan kreativitas mereka.',
        color: 'bg-gradient-to-r from-purple-400 to-purple-600',
    },
    S: {
        name: 'Social (The Helper)',
        desc: 'Tipe Sosial senang bekerja dengan orang lain untuk mencerahkan, membantu, melatih, atau menyembuhkan. Mereka terampil dalam berkomunikasi dan membangun hubungan.',
        color: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    },
    E: {
        name: 'Enterprising (The Persuader)',
        desc: 'Tipe Enterprising suka bekerja dengan orang lain untuk mempengaruhi, membujuk, atau memimpin. Mereka ambisius, energik, dan menikmati peran kepemimpinan.',
        color: 'bg-gradient-to-r from-red-400 to-red-600',
    },
    C: {
        name: 'Conventional (The Organizer)',
        desc: 'Tipe Konvensional suka bekerja dengan data, memiliki kemampuan klerikal atau numerik, dan mengikuti instruksi. Mereka terorganisir, efisien, dan menghargai ketelitian.',
        color: 'bg-gradient-to-r from-yellow-400 to-yellow-600',
    },
}

interface User {
    id: number
    email: string
}

interface Program {
    id: number
    name: string
    description: string | null
}

interface Interest {
    id: number
    name: string
    description: string
}

interface HasilTes {
    id: number
    kodeHolland: string | null
    tanggalTes?: string
    skorR?: number
    skorI?: number
    skorA?: number
    skorS?: number
    skorE?: number
    skorC?: number
    deskripsiHasil?: string | null
    siswa: {
        namaLengkap: string
    }
}

interface Siswa {
    id: number
    namaLengkap: string
    nisn: string | null
    kelas: string | null
    user: User
    hasilTes: HasilTes[]
}

interface SiswaViewProps {
    siswa: Siswa
    hasilTes: HasilTes | null
    recommendedPrograms: Program[]
    recommendedInterests: Interest[]
}

export default function SiswaView({ siswa, hasilTes, recommendedPrograms, recommendedInterests }: SiswaViewProps) {
    // Prepare scores for display
    const rawScores = hasilTes
        ? [
            { type: 'R', score: hasilTes.skorR || 0 },
            { type: 'I', score: hasilTes.skorI || 0 },
            { type: 'A', score: hasilTes.skorA || 0 },
            { type: 'S', score: hasilTes.skorS || 0 },
            { type: 'E', score: hasilTes.skorE || 0 },
            { type: 'C', score: hasilTes.skorC || 0 },
        ]
        : []

    // Find the maximum score to normalize the bar widths
    const maxScore = rawScores.length > 0 ? Math.max(...rawScores.map((s) => s.score), 1) : 1

    // Sort scores from highest to lowest
    const scores = [...rawScores].sort((a, b) => b.score - a.score)

    // Get top three RIASEC types from kodeHolland
    const topThreeTypes = hasilTes?.kodeHolland
        ? (hasilTes.kodeHolland.split('') as (keyof typeof descriptions)[])
        : []

    // Animasi untuk Framer Motion
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }

    return (
        <>
            <Head title={`Detail Siswa - ${siswa.namaLengkap}`} />

            <div className="p-6 sm:p-8 max-w-7xl mx-auto">
                {/* Header and Student Information */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-xl mb-8"
                >
                    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            Detail Siswa
                        </h1>
                        <div className="flex items-center space-x-3">
                            {hasilTes && (
                                <Link
                                    href={`/admin/print/student/${siswa.id}`}
                                    target="_blank"
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                                >
                                    <Printer className="w-4 h-4 mr-2" />
                                    Cetak Hasil
                                </Link>
                            )}
                            {hasilTes && (
                                <Link
                                    href={`/admin/siswa-riasec/${siswa.id}/reset`}
                                    method="post"
                                    as="button"
                                    title="Reset Tes"
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300"
                                    onBefore={() => confirm('Apakah Anda yakin ingin mereset hasil tes siswa ini? Data tes akan dihapus secara permanen.')}
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Reset Tes
                                </Link>
                            )}
                            <Link
                                href="/admin/siswa-riasec"
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg shadow-md hover:from-gray-700 hover:to-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
                            >
                                Kembali
                            </Link>
                        </div>
                    </div>

                    <motion.div variants={fadeIn} className="text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Informasi Siswa</h2>
                        <p className="mt-2 text-gray-600">Berikut adalah detail untuk {siswa.namaLengkap}.</p>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            <p><strong>Nama Lengkap:</strong> {siswa.namaLengkap}</p>
                            <p><strong>NISN:</strong> {siswa.nisn || '-'}</p>
                            <p><strong>Email:</strong> {siswa.user?.email || 'N/A'}</p>
                            <p><strong>Kelas:</strong> {siswa.kelas || '-'}</p>
                        </div>
                    </motion.div>

                    {/* Test Results Section */}
                    {hasilTes ? (
                        <>
                            <motion.div
                                variants={fadeIn}
                                className="mt-8 pt-6 border-t border-gray-200"
                            >
                                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left text-gray-900">
                                    Hasil Tes RIASEC
                                </h3>
                                <div className="text-center">
                                    <p className="text-lg text-gray-500">Kode Holland:</p>
                                    <p className="text-5xl sm:text-6xl font-extrabold text-blue-600 tracking-widest my-4 animate-pulse">
                                        {hasilTes.kodeHolland || '-'}
                                    </p>
                                </div>

                                {/* Score Breakdown */}
                                <div className="mt-8">
                                    <h4 className="text-xl font-semibold mb-4 text-center sm:text-left text-gray-900">
                                        Rincian Skor
                                    </h4>
                                    <div className="space-y-4">
                                        {scores.map(({ type, score }) => {
                                            const percentage = (score / maxScore) * 100
                                            const typeInfo = descriptions[type as keyof typeof descriptions]

                                            return (
                                                <motion.div
                                                    key={type}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '100%', transition: { duration: 0.8 } }}
                                                    className="flex items-center gap-x-3 sm:gap-x-4"
                                                >
                                                    <div className="w-44 shrink-0 text-right">
                                                        <span className="font-bold text-gray-700">{typeInfo.name}</span>
                                                    </div>
                                                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${percentage}%`, transition: { duration: 1 } }}
                                                            className={`${typeInfo.color} h-8 rounded-full`}
                                                        />
                                                        <span
                                                            className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold ${percentage > 15 ? 'text-white' : 'text-gray-800'
                                                                }`}
                                                        >
                                                            {score}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Personality Type Descriptions */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <h4 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left text-gray-900">
                                        Deskripsi Tipe Kepribadian Teratas
                                    </h4>
                                    <div className="space-y-6">
                                        {topThreeTypes.map((type, index) => {
                                            const typeInfo = descriptions[type]
                                            return (
                                                <motion.div
                                                    key={type}
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={fadeIn}
                                                    transition={{ delay: index * 0.2 }}
                                                    className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300"
                                                >
                                                    <div className="flex items-center mb-3">
                                                        <div
                                                            className={`w-5 h-5 rounded-full ${typeInfo.color} mr-3 flex-shrink-0`}
                                                        ></div>
                                                        <h4 className="text-lg font-bold text-gray-800">{typeInfo.name}</h4>
                                                    </div>
                                                    <p className="text-gray-600 leading-relaxed">{typeInfo.desc}</p>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Recommendations: Interests */}
                            <motion.section
                                initial="hidden"
                                animate="visible"
                                variants={fadeIn}
                                className="mt-8 pt-6 border-t border-gray-200"
                            >
                                <div className="text-center mb-8">
                                    <Lightbulb className="mx-auto h-12 w-12 text-indigo-500 animate-bounce" />
                                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                                        Rekomendasi Pengembangan Minat dan Bakat
                                    </h2>
                                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                                        Kepribadian {siswa.namaLengkap} juga tercermin dalam hobinya. Berikut aktivitas yang bisa dijelajahi!
                                    </p>
                                </div>

                                {recommendedInterests && recommendedInterests.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {recommendedInterests.map((interest, index) => (
                                            <motion.div
                                                key={interest.id}
                                                initial="hidden"
                                                animate="visible"
                                                variants={fadeIn}
                                                transition={{ delay: index * 0.1 }}
                                                className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                            >
                                                <h3 className="text-xl font-bold text-gray-900">{interest.name}</h3>
                                                <p className="text-gray-500 mt-2 flex-grow">
                                                    {interest.description || 'Deskripsi belum tersedia.'}
                                                </p>

                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500">
                                            Saat ini belum ada rekomendasi minat dan bakat untuk {siswa.namaLengkap}. Cek lagi nanti!
                                        </p>
                                    </div>
                                )}
                            </motion.section>

                            {/* Recommendations: Programs */}
                            {/* <motion.section
                                initial="hidden"
                                animate="visible"
                                variants={fadeIn}
                                className="mt-8 pt-6 border-t border-gray-200"
                            >
                                <div className="text-center mb-8">
                                    <Award className="mx-auto h-12 w-12 text-yellow-500 animate-spin-slow" />
                                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                                        Program Rekomendasi
                                    </h2>
                                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                                        Berdasarkan profil {siswa.namaLengkap}, program berikut mungkin cocok!
                                    </p>
                                </div>

                                {recommendedPrograms && recommendedPrograms.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {recommendedPrograms.map((program, index) => (
                                            <motion.div
                                                key={program.id}
                                                initial="hidden"
                                                animate="visible"
                                                variants={fadeIn}
                                                transition={{ delay: index * 0.1 }}
                                                className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                            >
                                                <BrainCircuit className="h-10 w-10 text-blue-500 mb-4" />
                                                <h3 className="text-xl font-bold text-gray-900">{program.name}</h3>
                                                <p className="text-gray-500 mt-2 flex-grow">
                                                    {program.description || 'Deskripsi program belum tersedia.'}
                                                </p>
                                                <Link
                                                    href="#"
                                                    className="mt-4 inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                                                >
                                                    Pelajari Lebih Lanjut
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500">
                                            Saat ini belum ada rekomendasi yang cocok untuk {siswa.namaLengkap}. Cek lagi nanti!
                                        </p>
                                    </div>
                                )}
                            </motion.section> */}
                        </>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="mt-8 text-center py-10 border-t border-dashed border-gray-300"
                        >
                            <h3 className="text-xl font-semibold text-gray-500">Belum Ada Hasil Tes</h3>
                            <p className="text-gray-400 mt-2">Siswa ini belum mengerjakan tes minat bakat RIASEC.</p>
                            <Link
                                href="#"
                                className="mt-4 inline-block bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300"
                            >
                                Ajak Siswa Tes Sekarang
                            </Link>
                        </motion.div>
                    )}
                </motion.section>
            </div>
        </>
    )
}

SiswaView.layout = (page: any) => <AdminLayout children={page} />