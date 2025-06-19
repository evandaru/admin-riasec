import { Head, usePage } from '@inertiajs/react';
import UserLayout from '../layouts/main';

// --- DATA DESKRIPSI (diambil dari HTML referensi) ---
const descriptions = {
    R: { name: "Realistic (The Doer)", desc: "Orang dengan tipe Realistis suka bekerja dengan objek, mesin, peralatan, tanaman, atau hewan. Mereka menikmati pekerjaan praktis yang membutuhkan keterampilan fisik dan mekanis.", color: "bg-orange-500" },
    I: { name: "Investigative (The Thinker)", desc: "Tipe Investigatif senang mengamati, belajar, menyelidiki, menganalisis, dan memecahkan masalah. Mereka tertarik pada ide-ide dan pemikiran analitis.", color: "bg-sky-500" },
    A: { name: "Artistic (The Creator)", desc: "Tipe Artistik memiliki kemampuan artistik, inovatif, dan intuitif. Mereka suka bekerja dalam situasi yang tidak terstruktur di mana mereka dapat menggunakan imajinasi dan kreativitas mereka.", color: "bg-purple-500" },
    S: { name: "Social (The Helper)", desc: "Tipe Sosial senang bekerja dengan orang lain untuk mencerahkan, membantu, melatih, atau menyembuhkan. Mereka terampil dalam berkomunikasi dan berinteraksi dengan orang lain.", color: "bg-emerald-500" },
    E: { name: "Enterprising (The Persuader)", desc: "Tipe Enterprising suka bekerja dengan orang lain untuk mempengaruhi, membujuk, memimpin, atau mengelola untuk tujuan organisasi atau keuntungan ekonomi. Mereka ambisius dan energik.", color: "bg-red-500" },
    C: { name: "Conventional (The Organizer)", desc: "Tipe Konvensional suka bekerja dengan data, memiliki kemampuan klerikal atau numerik, dan suka mengerjakan hal-hal secara detail. Mereka menghargai keteraturan dan rutinitas.", color: "bg-yellow-500" }
};

// --- Tipe Data untuk Props ---
interface HasilTes {
    id: number;
    kodeHolland: string;
    skorR: number;
    skorI: number;
    skorA: number;
    skorS: number;
    skorE: number;
    skorC: number;
    siswa: {
        namaLengkap: string;
    };
}

interface ResultPageProps {
    hasilTes: HasilTes;
}

// --- Komponen React ---
export default function RiasecResultPage() {
    const { hasilTes } = usePage<ResultPageProps>().props;

    // Asumsi skor maksimal per kategori adalah 15 (3 pertanyaan x 5 poin)
    const maxScorePerType = 15;

    // 1. Mengubah skor menjadi array objek agar mudah diurutkan dan di-render
    const scores = [
        { type: 'R', score: hasilTes.skorR },
        { type: 'I', score: hasilTes.skorI },
        { type: 'A', score: hasilTes.skorA },
        { type: 'S', score: hasilTes.skorS },
        { type: 'E', score: hasilTes.skorE },
        { type: 'C', score: hasilTes.skorC },
    ].sort((a, b) => b.score - a.score); // 2. Mengurutkan skor dari tertinggi ke terendah

    // 3. Mengambil 3 tipe teratas dari kode Holland untuk ditampilkan deskripsinya
    const topThreeTypes = hasilTes.kodeHolland.split('') as (keyof typeof descriptions)[];

    return (
        <>
            <Head title={`Hasil Tes RIASEC - ${hasilTes.kodeHolland}`} />

            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
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
                            const percentage = (score / maxScorePerType) * 100;
                            const typeInfo = descriptions[type as keyof typeof descriptions];

                            return (
                                <div key={type} className="flex items-center">
                                    <span className="w-28 font-bold text-slate-700">{typeInfo.name}</span>
                                    <div className="flex-1 bg-slate-200 rounded-full h-6 mx-4">
                                        <div
                                            className={`${typeInfo.color} h-6 rounded-full text-xs font-medium text-white text-center p-1 leading-none flex items-center justify-center`}
                                            style={{ width: `${percentage}%` }}
                                        >
                                            <span className={percentage < 20 ? 'text-black pl-2' : ''}>
                                                {Math.round(percentage)}%
                                            </span>
                                        </div>
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

                {/* Anda bisa menambahkan tombol "Ulangi Tes" atau "Lihat Rekomendasi" di sini */}
                {/* Contoh:
                <div className="mt-8 text-center">
                     <a href="/riasec/test" className="bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-300 transition-all duration-300">
                        Ulangi Tes
                    </a>
                </div>
                */}
            </section>
        </>
    );
}

RiasecResultPage.layout = (page: any) => <UserLayout children={page} />;