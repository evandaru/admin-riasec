import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { DateTime } from 'luxon';

// --- Tipe Data ---
interface HasilTes {
    kodeHolland: string | null;
}

interface Siswa {
    id: number;
    namaLengkap: string;
    nisn: string | null;
    kelas: string | null;
    jenjang: string | null;
    user: { email: string };
    hasilTes: HasilTes[];
}

// --- Komponen ---
export default function PrintAllStudents({ siswa }: { siswa: Siswa[] }) {
    useEffect(() => {
        // Memicu dialog cetak setelah komponen dimuat
        const timer = setTimeout(() => {
            window.print();
        }, 500); // Penundaan kecil untuk memastikan render selesai

        return () => clearTimeout(timer); // Cleanup untuk mencegah memory leak
    }, []);

    return (
        <>
            <Head title="Laporan Daftar Siswa" />
            <div className="min-h-screen bg-white p-6 md:p-10 font-sans print:p-0">
                {/* Header */}
                <header className="text-center mb-8 print:mb-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Laporan Daftar Siswa
                    </h1>
                    <p className="text-sm text-gray-600 mt-2">
                        Tanggal Cetak:{' '}
                        {DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
                    </p>
                </header>

                {/* Tabel */}
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="w-full border-collapse text-sm md:text-base">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-xs md:text-sm">
                                <th className="p-3 border border-gray-300 font-semibold">No</th>
                                <th className="p-3 border border-gray-300 font-semibold">Nama Lengkap</th>
                                <th className="p-3 border border-gray-300 font-semibold">Email</th>
                                <th className="p-3 border border-gray-300 font-semibold">NISN</th>
                                <th className="p-3 border border-gray-300 font-semibold">Kelas</th>
                                <th className="p-3 border border-gray-300 font-semibold">Jenjang</th>
                                <th className="p-3 border border-gray-300 font-semibold">Status Tes</th>
                                <th className="p-3 border border-gray-300 font-semibold">Kode Holland</th>
                            </tr>
                        </thead>
                        <tbody>
                            {siswa.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="p-4 text-center text-gray-500 border border-gray-300">
                                        Tidak ada data siswa yang tersedia.
                                    </td>
                                </tr>
                            ) : (
                                siswa.map((item, index) => {
                                    const sudahTes = item.hasilTes && item.hasilTes.length > 0;
                                    const hasilTerbaru = sudahTes ? item.hasilTes[0] : null;

                                    return (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 transition-colors break-inside-avoid"
                                        >
                                            <td className="p-3 border border-gray-300 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                {item.namaLengkap}
                                            </td>
                                            <td className="p-3 border border-gray-300">{item.user.email}</td>
                                            <td className="p-3 border border-gray-300">
                                                {item.nisn || <span className="text-gray-400">-</span>}
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                {item.kelas || <span className="text-gray-400">-</span>}
                                            </td>
                                            <td className="p-3 border border-gray-300">
                                                {item.jenjang || <span className="text-gray-400">-</span>}
                                            </td>
                                            <td className="p-3 border border-gray-300 text-center">
                                                <span
                                                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${sudahTes
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-red-100 text-red-700'
                                                        }`}
                                                >
                                                    {sudahTes ? 'Sudah' : 'Belum'}
                                                </span>
                                            </td>
                                            <td className="p-3 border border-gray-300 text-center font-mono">
                                                {hasilTerbaru?.kodeHolland || (
                                                    <span className="text-gray-400">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <footer className="mt-8 text-right text-xs text-gray-500 print:mt-4">
                    Dicetak oleh Sistem Rekomendasi Karir
                </footer>
            </div>

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
        }
      `}</style>
        </>
    );
}