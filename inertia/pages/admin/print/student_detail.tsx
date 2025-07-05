import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { DateTime } from 'luxon';

// --- DATA DESKRIPSI RIASEC ---
const descriptions: Record<string, { name: string; desc: string }> = {
    R: {
        name: 'Realistic (The Doer)',
        desc: 'Orang dengan tipe Realistis suka bekerja dengan objek, mesin, peralatan, tanaman, atau hewan. Mereka menikmati pekerjaan yang membutuhkan keterampilan praktis dan kekuatan fisik.',
    },
    I: {
        name: 'Investigative (The Thinker)',
        desc: 'Tipe Investigatif senang mengamati, belajar, menyelidiki, menganalisis, dan memecahkan masalah. Mereka unggul dalam tugas-tugas yang membutuhkan pemikiran abstrak dan analitis.',
    },
    A: {
        name: 'Artistic (The Creator)',
        desc: 'Tipe Artistik memiliki kemampuan artistik, inovatif, dan intuitif. Mereka suka bekerja dalam situasi yang tidak terstruktur di mana mereka dapat menggunakan imajinasi dan kreativitas mereka.',
    },
    S: {
        name: 'Social (The Helper)',
        desc: 'Tipe Sosial senang bekerja dengan orang lain untuk mencerahkan, membantu, melatih, atau menyembuhkan. Mereka terampil dalam berkomunikasi dan membangun hubungan.',
    },
    E: {
        name: 'Enterprising (The Persuader)',
        desc: 'Tipe Enterprising suka bekerja dengan orang lain untuk mempengaruhi, membujuk, atau memimpin. Mereka ambisius, energik, dan menikmati peran kepemimpinan.',
    },
    C: {
        name: 'Conventional (The Organizer)',
        desc: 'Tipe Konvensional suka bekerja dengan data, memiliki kemampuan klerikal atau numerik, dan mengikuti instruksi. Mereka terorganisir, efisien, dan menghargai ketelitian.',
    },
};

// --- Tipe Data ---
interface User {
    email: string;
}

interface Interest {
    id: number;
    name: string;
    description: string;
}

interface HasilTes {
    kodeHolland: string | null;
    tanggalTes: string;
    skorR: number;
    skorI: number;
    skorA: number;
    skorS: number;
    skorE: number;
    skorC: number;
}

interface Siswa {
    id: number;
    namaLengkap: string;
    nisn: string | null;
    kelas: string | null;
    jenjang: string | null;
    user: User;
}

interface SiswaDetailPrintProps {
    siswa: Siswa;
    hasilTes: HasilTes | null;
    recommendedInterests: Interest[];
}

// --- Komponen ---
export default function PrintStudentDetail({
    siswa,
    hasilTes,
    recommendedInterests,
}: SiswaDetailPrintProps) {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 500); // Penundaan untuk memastikan render selesai
        return () => clearTimeout(timer); // Cleanup
    }, []);

    if (!hasilTes) {
        return (
            <div className="min-h-screen p-6 text-center bg-white print:p-0">
                <Head title="Laporan Tidak Tersedia" />
                <h1 className="text-2xl font-bold text-gray-800">Laporan Tidak Tersedia</h1>
                <p className="text-gray-600 mt-2">Siswa ini belum menyelesaikan tes.</p>
            </div>
        );
    }

    const scores = [
        { type: 'R', score: hasilTes.skorR || 0, name: 'Realistic' },
        { type: 'I', score: hasilTes.skorI || 0, name: 'Investigative' },
        { type: 'A', score: hasilTes.skorA || 0, name: 'Artistic' },
        { type: 'S', score: hasilTes.skorS || 0, name: 'Social' },
        { type: 'E', score: hasilTes.skorE || 0, name: 'Enterprising' },
        { type: 'C', score: hasilTes.skorC || 0, name: 'Conventional' },
    ].sort((a, b) => b.score - a.score);

    const topThreeTypes = hasilTes.kodeHolland
        ? (hasilTes.kodeHolland.split('') as (keyof typeof descriptions)[])
        : [];

    return (
        <>
            <Head title={`Laporan Tes RIASEC - ${siswa.namaLengkap}`} />
            <div className="min-h-screen bg-white p-6 md:p-10 font-sans text-gray-900 print:p-0">
                {/* Header */}
                <header className="text-center mb-8 border-b-2 border-gray-300 pb-4 print:mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Laporan Hasil Tes Minat Bakat RIASEC
                    </h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Sistem Rekomendasi Karir |{' '}
                        {DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
                    </p>
                </header>

                {/* Informasi Siswa */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold border-b border-gray-300 mb-4 pb-2">
                        Informasi Siswa
                    </h2>
                    <table className="w-full text-sm md:text-base border-collapse">
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium w-1/3">Nama Lengkap</td>
                                <td className="p-3">{siswa.namaLengkap}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Email</td>
                                <td className="p-3">{siswa.user?.email || 'N/A'}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">NISN</td>
                                <td className="p-3">{siswa.nisn || <span className="text-gray-400">-</span>}</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Kelas / Jenjang</td>
                                <td className="p-3">
                                    {siswa.kelas || <span className="text-gray-400">-</span>} /{' '}
                                    {siswa.jenjang || <span className="text-gray-400">-</span>}
                                </td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Tanggal Tes</td>
                                <td className="p-3">
                                    {DateTime.fromISO(hasilTes.tanggalTes).toLocaleString(DateTime.DATE_FULL)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                {/* Kode Holland */}
                <section className="mb-8 text-center bg-gray-50 p-6 rounded-lg print:bg-white">
                    <h2 className="text-lg font-semibold text-gray-800">Kode Holland Hasil Tes</h2>
                    <p className="text-5xl font-extrabold text-blue-600 tracking-widest my-3">
                        {hasilTes.kodeHolland || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                        Kode ini merepresentasikan tiga tipe kepribadian teratas Anda.
                    </p>
                </section>

                {/* Rincian Skor dan Deskripsi */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                    <section className="md:col-span-5">
                        <h2 className="text-xl font-semibold border-b border-gray-300 mb-4 pb-2">
                            Rincian Skor
                        </h2>
                        <table className="w-full text-sm md:text-base border-collapse shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
                                    <th className="p-3 border border-gray-300 font-semibold">Tipe</th>
                                    <th className="p-3 border border-gray-300 font-semibold text-right">Skor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scores.map(({ type, score, name }) => (
                                    <tr key={type} className="hover:bg-gray-50 border-b border-gray-200">
                                        <td className="p-3 border border-gray-300">
                                            {name} ({type})
                                        </td>
                                        <td className="p-3 border border-gray-300 text-right font-bold">{score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                    <section className="md:col-span-7">
                        <h2 className="text-xl font-semibold border-b border-gray-300 mb-4 pb-2">
                            Deskripsi Tipe Teratas
                        </h2>
                        <table className="w-full text-sm md:text-base border-collapse shadow-md rounded-lg">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
                                    <th className="p-3 border border-gray-300 font-semibold">Tipe</th>
                                    <th className="p-3 border border-gray-300 font-semibold">Deskripsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topThreeTypes.length > 0 ? (
                                    topThreeTypes.map((type) => {
                                        const typeInfo = descriptions[type];
                                        return (
                                            <tr key={type} className="border-b border-gray-200 break-inside-avoid">
                                                <td className="p-3 border border-gray-300 font-medium">
                                                    {typeInfo.name} ({type})
                                                </td>
                                                <td className="p-3 border border-gray-300 text-gray-700">
                                                    {typeInfo.desc}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="p-3 text-center text-gray-500 border border-gray-300">
                                            Tidak ada tipe teratas yang tersedia.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </section>
                </div>

                {/* Rekomendasi Minat */}
                <section className="mb-8 break-before-page">
                    <h2 className="text-xl font-semibold border-b border-gray-300 mb-4 pb-2">
                        Rekomendasi Pengembangan Minat dan Bakat
                    </h2>
                    <table className="w-full text-sm md:text-base border-collapse shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
                                <th className="p-3 border border-gray-300 font-semibold">Minat</th>
                                <th className="p-3 border border-gray-300 font-semibold">Deskripsi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recommendedInterests.length > 0 ? (
                                recommendedInterests.map((interest) => (
                                    <tr key={interest.id} className="border-b border-gray-200 break-inside-avoid">
                                        <td className="p-3 border border-gray-300 font-medium">{interest.name}</td>
                                        <td className="p-3 border border-gray-300 text-gray-700">{interest.description}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="p-3 text-center text-gray-500 border border-gray-300">
                                        Tidak ada rekomendasi minat dan bakat yang tersedia.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </section>

                {/* Footer */}
                <footer className="mt-12 text-center text-xs text-gray-500 pt-4 border-t border-gray-300 print:mt-4">
                    <p>
                        Laporan ini dihasilkan secara otomatis oleh sistem pada{' '}
                        {DateTime.now().toLocaleString(DateTime.DATE_FULL)}.
                    </p>
                    <p>
                        Hasil tes ini adalah alat bantu dan sebaiknya digunakan bersamaan dengan konseling karir
                        lebih lanjut.
                    </p>
                </footer>

                {/* Media Queries untuk Cetak */}
                <style>{`
          @media print {
            .no-print {
              display: none;
            }
            table {
              font-size: 10pt;
            }
            th,
            td {
              padding: 6px;
            }
            .break-before-page {
              page-break-before: always;
            }
          }
        `}</style>
            </div>
        </>
    );
}