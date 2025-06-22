import { FormEvent } from 'react'
import { Head, useForm } from '@inertiajs/react'
import UserLayout from '../layouts/main' // Pastikan layout ini sesuai

// Interface untuk properti yang diterima komponen
interface Question {
    id: number
    teksPertanyaan: string
    tipeRiasec: 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
}

interface RiasecTestProps {
    questions: Question[]
}

// --- PERUBAHAN 1: Opsi jawaban diubah kembali menjadi Ya/Tidak ---
const answerOptions = [
    { label: 'Ya', value: 1 },
    { label: 'Tidak', value: 0 },
]

export default function RiasecTestCardViewYesNo({ questions }: RiasecTestProps) {
    // useForm untuk mengelola semua jawaban dalam satu state
    const { data, setData, post, processing, errors } = useForm({
        answers: {} as Record<string, number>,
    })

    // Fungsi untuk memperbarui state jawaban ketika radio button dipilih
    const handleAnswerChange = (questionId: number, value: number) => {
        setData('answers', {
            ...data.answers,
            [questionId]: value,
        })
    }

    // Fungsi untuk mengirim semua data jawaban ke backend saat form disubmit
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        post('/riasec/submit')
    }

    return (
        <>
            <Head title="Tes Minat Bakat" />
            <div className="bg-gray-100 dark:bg-gray-900 p-4 md:p-8 min-h-screen">
                <div className="max-w-4xl mx-auto">

                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Tes Minat & Karier</h1>
                        {/* --- PERUBAHAN 2: Instruksi disesuaikan untuk Ya/Tidak --- */}
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Jawab 'Ya' jika pernyataan berikut menggambarkan diri Anda, dan 'Tidak' jika tidak.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Loop untuk menampilkan semua pertanyaan */}
                        {questions.map((question, index) => (
                            <div key={question.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                                    {index + 1}. {question.teksPertanyaan}
                                </p>

                                {/* --- PERUBAHAN 3: Tata letak disesuaikan untuk 2 pilihan --- */}
                                <div className="flex justify-center items-center gap-x-12 pt-4">
                                    {answerOptions.map((option) => (
                                        <label key={option.value} className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                            <input
                                                type="radio"
                                                name={`question-${question.id}`}
                                                value={option.value}
                                                checked={data.answers[question.id] === option.value}
                                                onChange={() => handleAnswerChange(question.id, option.value)}
                                                className="form-radio h-4 w-4 text-indigo-600 dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-lg">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors[`answers.${question.id}`] && <div className="text-red-500 text-sm mt-3 text-center">{errors[`answers.${question.id}`]}</div>}
                            </div>
                        ))}

                        <div className="pt-6 text-center">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full md:w-auto px-10 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Memproses...' : 'Selesai & Lihat Hasil'}
                            </button>
                            {errors.answers && <div className="text-red-500 text-sm mt-4">{errors.answers}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

// Ganti nama komponen agar lebih jelas dan gunakan layout
RiasecTestCardViewYesNo.layout = (page: any) => <UserLayout children={page} />