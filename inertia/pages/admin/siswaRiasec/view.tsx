// title: inertia/pages/admin/siswaRiasec/view.tsx
import { Head, Link } from '@inertiajs/react'
import AdminLayout from '../layouts/main'
import { Award, BrainCircuit, Lightbulb, RefreshCw } from 'lucide-react' // 1. Impor ikon RefreshCw

// --- DATA DESKRIPSI RIASEC (Untuk Tampilan UI) ---
const descriptions = {
    R: {
        name: 'Realistic (The Doer)',
        desc: 'Orang dengan tipe Realistis suka bekerja dengan objek, mesin, peralatan, tanaman, atau hewan. Mereka menikmati pekerjaan yang membutuhkan keterampilan praktis dan kekuatan fisik.',
        color: 'bg-orange-500',
    },
    I: {
        name: 'Investigative (The Thinker)',
        desc: 'Tipe Investigatif senang mengamati, belajar, menyelidiki, menganalisis, dan memecahkan masalah. Mereka unggul dalam tugas-tugas yang membutuhkan pemikiran abstrak dan analitis.',
        color: 'bg-sky-500',
    },
    A: {
        name: 'Artistic (The Creator)',
        desc: 'Tipe Artistik memiliki kemampuan artistik, inovatif, dan intuitif. Mereka suka bekerja dalam situasi yang tidak terstruktur di mana mereka dapat menggunakan imajinasi dan kreativitas mereka.',
        color: 'bg-purple-500',
    },
    S: {
        name: 'Social (The Helper)',
        desc: 'Tipe Sosial senang bekerja dengan orang lain untuk mencerahkan, membantu, melatih, atau menyembuhkan. Mereka terampil dalam berkomunikasi dan membangun hubungan.',
        color: 'bg-emerald-500',
    },
    E: {
        name: 'Enterprising (The Persuader)',
        desc: 'Tipe Enterprising suka bekerja dengan orang lain untuk mempengaruhi, membujuk, atau memimpin. Mereka ambisius, energik, dan menikmati peran kepemimpinan.',
        color: 'bg-red-500',
    },
    C: {
        name: 'Conventional (The Organizer)',
        desc: 'Tipe Konvensional suka bekerja dengan data, memiliki kemampuan klerikal atau numerik, dan mengikuti instruksi. Mereka terorganisir, efisien, dan menghargai ketelitian.',
        color: 'bg-yellow-500',
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

    return (
        <>
            <Head title={`Detail Siswa - ${siswa.namaLengkap}`} />

            <div className="p-8 max-w-7xl mx-auto">
                {/* Header and Student Information */}
                <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8">
                    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Detail Siswa</h1>
                        {/* 2. Grup untuk tombol aksi */}
                        <div className="flex items-center space-x-2">
                            {/* Tombol Reset Tes (BARU) */}
                            {hasilTes && (
                                <Link
                                    href={`/admin/siswa-riasec/${siswa.id}/reset`}
                                    method="post"
                                    as="button"
                                    title="Reset Tes"
                                    className="inline-flex items-center px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    onBefore={() => confirm('Apakah Anda yakin ingin mereset hasil tes siswa ini? Data tes akan dihapus secara permanen.')}
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Reset Tes
                                </Link>
                            )}
                            <Link
                                href="/admin/siswa-riasec"
                                className="inline-block px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                            >
                                Kembali
                            </Link>
                        </div>
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-slate-900">Informasi Siswa</h2>
                        <p className="mt-2 text-slate-600">Berikut adalah detail untuk {siswa.namaLengkap}.</p>
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <p><strong>Nama Lengkap:</strong> {siswa.namaLengkap}</p>
                            <p><strong>NISN:</strong> {siswa.nisn || '-'}</p>
                            <p><strong>Email:</strong> {siswa.user?.email || 'N/A'}</p>
                            <p><strong>Kelas:</strong> {siswa.kelas || '-'}</p>
                        </div>
                    </div>

                    {/* Test Results Section */}
                    {hasilTes ? (
                        <>
                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">Hasil Tes RIASEC</h3>
                                <div className="text-center">
                                    <p className="text-lg text-slate-500">Kode Holland:</p>
                                    <p className="text-5xl sm:text-6xl font-bold text-blue-600 tracking-widest my-2">
                                        {hasilTes.kodeHolland || '-'}
                                    </p>
                                </div>

                                {/* Score Breakdown */}
                                <div className="mt-8">
                                    <h4 className="text-xl font-semibold mb-4 text-center sm:text-left">Rincian Skor</h4>
                                    <div className="space-y-4">
                                        {scores.map(({ type, score }) => {
                                            const percentage = (score / maxScore) * 100
                                            const typeInfo = descriptions[type as keyof typeof descriptions]

                                            return (
                                                <div key={type} className="flex items-center gap-x-3 sm:gap-x-4">
                                                    <div className="w-44 shrink-0 text-right">
                                                        <span className="font-bold text-slate-700">{typeInfo.name}</span>
                                                    </div>
                                                    <div className="flex-1 bg-slate-200 rounded-full h-7 relative">
                                                        <div
                                                            className={`${typeInfo.color} h-7 rounded-full`}
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                        <span
                                                            className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold ${percentage > 15 ? 'text-white' : 'text-slate-800'
                                                                }`}
                                                        >
                                                            {score}
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Personality Type Descriptions */}
                                <div className="mt-8 pt-6 border-t border-slate-200">
                                    <h4 className="text-xl font-semibold mb-4 text-center sm:text-left">
                                        Deskripsi Tipe Kepribadian Teratas
                                    </h4>
                                    <div className="space-y-6">
                                        {topThreeTypes.map((type) => {
                                            const typeInfo = descriptions[type]
                                            return (
                                                <div key={type} className="p-4 rounded-lg border border-slate-200">
                                                    <div className="flex items-center mb-2">
                                                        <div
                                                            className={`w-4 h-4 rounded-full ${typeInfo.color} mr-3 flex-shrink-0`}
                                                        ></div>
                                                        <h4 className="text-lg font-bold text-slate-800">{typeInfo.name}</h4>
                                                    </div>
                                                    <p className="text-slate-600">{typeInfo.desc}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Recommendations: Interests */}
                            <section className="mt-8 pt-6 border-t border-slate-200">
                                <div className="text-center mb-8">
                                    <Lightbulb className="mx-auto h-12 w-12 text-indigo-500" />
                                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                                        Rekomendasi Pengembangan Minat dan Bakat
                                    </h2>
                                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                                        Kepribadian {siswa.namaLengkap} juga tercermin dalam hobinya. Berikut aktivitas yang bisa dijelajahi untuk mengembangkan diri!
                                    </p>
                                </div>

                                {recommendedInterests && recommendedInterests.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {recommendedInterests.map((interest) => (
                                            <div
                                                key={interest.id}
                                                className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <h3 className="text-xl font-bold text-gray-900">{interest.name}</h3>
                                                <p className="text-gray-500 mt-2 flex-grow">
                                                    {interest.description || 'Deskripsi belum tersedia.'}
                                                </p>
                                                <Link
                                                    href="#"
                                                    className="mt-4 inline-block bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors"
                                                >
                                                    Coba Jelajahi
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500">
                                            Saat ini belum ada rekomendasi minat dan bakat untuk {siswa.namaLengkap}. Cek lagi nanti!
                                        </p>
                                    </div>
                                )}
                            </section>

                            {/* Recommendations: Programs */}
                            <section className="mt-8 pt-6 border-t border-slate-200">
                                <div className="text-center mb-8">
                                    <Award className="mx-auto h-12 w-12 text-yellow-500" />
                                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                                        Program Rekomendasi
                                    </h2>
                                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                                        Berdasarkan profil {siswa.namaLengkap} dan pilihan siswa lain yang mirip, program berikut mungkin cocok!
                                    </p>
                                </div>

                                {recommendedPrograms && recommendedPrograms.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {recommendedPrograms.map((program) => (
                                            <div
                                                key={program.id}
                                                className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                            >
                                                <BrainCircuit className="h-10 w-10 text-blue-500 mb-4" />
                                                <h3 className="text-xl font-bold text-gray-900">{program.name}</h3>
                                                <p className="text-gray-500 mt-2 flex-grow">
                                                    {program.description || 'Deskripsi program belum tersedia.'}
                                                </p>
                                                <Link
                                                    href="#"
                                                    className="mt-4 inline-block bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors"
                                                >
                                                    Pelajari Lebih Lanjut
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500">
                                            Saat ini belum ada rekomendasi yang cocok untuk {siswa.namaLengkap}. Cek lagi nanti!
                                        </p>
                                    </div>
                                )}
                            </section>
                        </>
                    ) : (
                        // 3. Tampilkan pesan bahwa siswa belum tes
                        <div className="mt-8 text-center py-10 border-t border-dashed">
                            <h3 className="text-xl font-semibold text-gray-500">Belum Ada Hasil Tes</h3>
                            <p className="text-gray-400 mt-2">Siswa ini belum mengerjakan tes minat bakat RIASEC.</p>
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}

SiswaView.layout = (page: any) => <AdminLayout children={page} />