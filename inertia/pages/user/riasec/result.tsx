import { Head, usePage, Link } from '@inertiajs/react';
import UserLayout from '../layouts/main';
import { Award, BrainCircuit, Lightbulb } from 'lucide-react';

// --- DATA DESKRIPSI RIASEC (Untuk Tampilan UI) ---
const descriptions = {
    R: { name: "Realistic (The Doer)", desc: "Orang dengan tipe Realistis suka bekerja dengan objek, mesin, peralatan, tanaman, atau hewan. Mereka menikmati pekerjaan yang membutuhkan keterampilan praktis dan kekuatan fisik.", color: "bg-orange-500" },
    I: { name: "Investigative (The Thinker)", desc: "Tipe Investigatif senang mengamati, belajar, menyelidiki, menganalisis, dan memecahkan masalah. Mereka unggul dalam tugas-tugas yang membutuhkan pemikiran abstrak dan analitis.", color: "bg-sky-500" },
    A: { name: "Artistic (The Creator)", desc: "Tipe Artistik memiliki kemampuan artistik, inovatif, dan intuitif. Mereka suka bekerja dalam situasi yang tidak terstruktur di mana mereka dapat menggunakan imajinasi dan kreativitas mereka.", color: "bg-purple-500" },
    S: { name: "Social (The Helper)", desc: "Tipe Sosial senang bekerja dengan orang lain untuk mencerahkan, membantu, melatih, atau menyembuhkan. Mereka terampil dalam berkomunikasi dan membangun hubungan.", color: "bg-emerald-500" },
    E: { name: "Enterprising (The Persuader)", desc: "Tipe Enterprising suka bekerja dengan orang lain untuk mempengaruhi, membujuk, atau memimpin. Mereka ambisius, energik, dan menikmati peran kepemimpinan.", color: "bg-red-500" },
    C: { name: "Conventional (The Organizer)", desc: "Tipe Konvensional suka bekerja dengan data, memiliki kemampuan klerikal atau numerik, dan mengikuti instruksi. Mereka terorganisir, efisien, dan menghargai ketelitian.", color: "bg-yellow-500" }
};

// --- Tipe Data untuk Props ---
interface Program {
    id: number
    name: string
    description: string | null
}

interface Interest {
    id: number;
    name: string;
    description: string;
}

interface HasilTes {
    id: number;
    kodeHolland: string;
    skorR: number; skorI: number; skorA: number; skorS: number; skorE: number; skorC: number;
    siswa: {
        namaLengkap: string;
    };
}

interface ResultPageProps {
    hasilTes: HasilTes;
    recommendedPrograms: Program[];
    recommendedInterests: Interest[];
}

// --- Komponen Utama ---
export default function RiasecResultPage() {
    const { hasilTes, recommendedPrograms, recommendedInterests } = usePage<ResultPageProps>().props;

    // Kumpulkan semua skor mentah dari hasil tes
    const rawScores = [
        { type: 'R', score: hasilTes.skorR }, { type: 'I', score: hasilTes.skorI },
        { type: 'A', score: hasilTes.skorA }, { type: 'S', score: hasilTes.skorS },
        { type: 'E', score: hasilTes.skorE }, { type: 'C', score: hasilTes.skorC },
    ];

    // **PERBAIKAN UTAMA:**
    // 1. Cari skor tertinggi dari hasil tes untuk dijadikan patokan 100% pada bar.
    //    Ini mencegah bar melebihi lebar kontainer (overflow).
    const maxScore = Math.max(...rawScores.map(s => s.score), 1); // Tambahkan , 1 untuk menghindari pembagian dengan 0 jika semua skor 0

    // 2. Urutkan skor dari tertinggi ke terendah untuk ditampilkan
    const scores = [...rawScores].sort((a, b) => b.score - a.score);

    const topThreeTypes = hasilTes.kodeHolland.split('') as (keyof typeof descriptions)[];

    return (
        <>
            <Head title={`Hasil Tes RIASEC - ${hasilTes.kodeHolland}`} />

            {/* BAGIAN HASIL TES RIASEC */}
            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-slate-900">Hasil Tes Anda</h2>
                    <p className="mt-2 text-slate-600">
                        Ini adalah tipe kepribadian karir yang paling cocok untuk Anda, {hasilTes.siswa.namaLengkap}.
                    </p>
                    <div className="my-6">
                        <p className="text-lg text-slate-500">Kode Holland Anda adalah:</p>
                        <p className="text-5xl sm:text-6xl font-bold text-blue-600 tracking-widest my-2">
                            {hasilTes.kodeHolland}
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">Rincian Skor</h3>
                    <div className="space-y-4">
                        {scores.map(({ type, score }) => {
                            // 3. Hitung persentase lebar bar berdasarkan skor tertinggi yang didapat
                            const percentage = (score / maxScore) * 100;
                            const typeInfo = descriptions[type as keyof typeof descriptions];

                            return (
                                // **REFACTORING TAMPILAN BAR:**
                                <div key={type} className="flex items-center gap-x-3 sm:gap-x-4">
                                    <div className="w-44 shrink-0 text-right">
                                        <span className="font-bold text-slate-700">{typeInfo.name}</span>
                                    </div>
                                    <div className="flex-1 bg-slate-200 rounded-full h-7 relative">
                                        {/* Colored bar */}
                                        <div
                                            className={`${typeInfo.color} h-7 rounded-full`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                        {/* Score label, diposisikan di atas bar */}
                                        <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold ${percentage > 15 ? 'text-white' : 'text-slate-800'
                                            }`}>
                                            {score}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                    <h3 className="text-xl font-semibold mb-4 text-center sm:text-left">Deskripsi Tipe Kepribadian Teratas</h3>
                    <div className="space-y-6">
                        {topThreeTypes.map((type) => {
                            const typeInfo = descriptions[type];
                            return (
                                <div key={type} className="p-4 rounded-lg border border-slate-200">
                                    <div className="flex items-center mb-2">
                                        <div className={`w-4 h-4 rounded-full ${typeInfo.color} mr-3 flex-shrink-0`}></div>
                                        <h4 className="text-lg font-bold text-slate-800">{typeInfo.name}</h4>
                                    </div>
                                    <p className="text-slate-600">{typeInfo.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* --- BAGIAN REKOMENDASI MINAT DAN BAKAT --- */}
            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8">
                <div className="text-center mb-8">
                    <Lightbulb className="mx-auto h-12 w-12 text-indigo-500" />
                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                        Rekomendasi Pengembangan Minat dan Bakat
                    </h2>
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                        Kepribadianmu juga tercermin dalam hobimu. Berikut aktivitas yang bisa kamu jelajahi untuk mengembangkan diri!
                    </p>
                </div>

                {recommendedInterests && recommendedInterests.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedInterests.map((interest) => (
                            <div key={interest.id} className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-xl font-bold text-gray-900">{interest.name}</h3>
                                <p className="text-gray-500 mt-2 flex-grow">
                                    {interest.description || "Deskripsi belum tersedia."}
                                </p>
                                <Link href="#" className="mt-4 inline-block bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-200 transition-colors">
                                    Coba Jelajahi
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Saat ini belum ada rekomendasi minat dan bakat untukmu. Cek lagi nanti!</p>
                    </div>
                )}
            </section>

            {/* --- BAGIAN REKOMENDASI PROGRAM --- */}
            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="text-center mb-8">
                    <Award className="mx-auto h-12 w-12 text-yellow-500" />
                    <h2 className="text-3xl font-bold text-gray-900 mt-4">
                        Program Rekomendasi Untukmu
                    </h2>
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
                        Berdasarkan profilmu dan pilihan siswa lain yang mirip, program berikut mungkin cocok untukmu!
                    </p>
                </div>

                {recommendedPrograms && recommendedPrograms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendedPrograms.map((program) => (
                            <div key={program.id} className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <BrainCircuit className="h-10 w-10 text-blue-500 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900">{program.name}</h3>
                                <p className="text-gray-500 mt-2 flex-grow">
                                    {program.description || "Deskripsi program belum tersedia."}
                                </p>
                                <Link href="#" className="mt-4 inline-block bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors">
                                    Pelajari Lebih Lanjut
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Saat ini belum ada rekomendasi yang cocok untukmu. Cek lagi nanti!</p>
                    </div>
                )}
            </section>
        </>
    );
}

RiasecResultPage.layout = (page: any) => <UserLayout children={page} />;