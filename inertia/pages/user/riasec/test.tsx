import { Head, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import UserLayout from '../layouts/main'

interface Question {
    id: number
    teksPertanyaan: string
    tipeRiasec: string
}

interface RiasecTestProps {
    questions: Question[]
}

const answerOptions = [
    { label: 'Sangat Tidak Suka', value: 1, color: 'bg-red-600', hover: 'hover:bg-red-700' },
    { label: 'Tidak Suka', value: 2, color: 'bg-orange-500', hover: 'hover:bg-orange-600' },
    { label: 'Netral', value: 3, color: 'bg-yellow-500', hover: 'hover:bg-yellow-600' },
    { label: 'Suka', value: 4, color: 'bg-lime-500', hover: 'hover:bg-lime-600' },
    { label: 'Sangat Suka', value: 5, color: 'bg-green-600', hover: 'hover:bg-green-700' },
]

export default function RiasecTest({ questions }: RiasecTestProps) {
    const { data, setData, post, processing, errors } = useForm<{ answers: Record<number, number> }>({
        answers: {},
    })

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const totalQuestions = questions.length
    const currentQuestion = questions[currentQuestionIndex]

    const handleAnswer = (questionId: number, answerValue: number) => {
        setData('answers', {
            ...data.answers,
            [questionId]: answerValue,
        })
    }

    const handleNext = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex((prev) => prev + 1)
        }
    }

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/riasec/submit')
    }

    const progressPercentage =
        totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0

    return (
        <>
            <Head title="Tes Minat RIASEC" />

            <div className="bg-slate-100 p-6 sm:p-10 min-h-screen flex items-center justify-center">
                <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6 sm:p-10">

                    {/* Progress */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-slate-500 font-medium mb-1">
                            <span>Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions}</span>
                            <span>{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Pertanyaan */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <p className="text-3xl text-center font-semibold text-slate-800 mb-4">
                                {currentQuestion.teksPertanyaan}
                            </p>

                            <div className="flex flex-wrap gap-3 justify-center">
                                {answerOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => handleAnswer(currentQuestion.id, option.value)}
                                        className={`
                                            flex flex-row px-3 py-2 rounded-lg text-base font-semibold
                                            transition-all duration-200 focus:outline-none
                                            ${data.answers[currentQuestion.id] === option.value
                                                ? `${option.color} text-white shadow-md`
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            }
                                        `}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigasi */}
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={handleBack}
                                disabled={currentQuestionIndex === 0}
                                className="px-6 py-2 text-sm font-bold text-slate-600 bg-slate-200 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Sebelumnya
                            </button>

                            {currentQuestionIndex < totalQuestions - 1 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!data.answers[currentQuestion.id]}
                                    className="px-6 py-2 text-white font-bold bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Selanjutnya
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={processing || !data.answers[currentQuestion.id]}
                                    className="px-6 py-2 text-white font-bold bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Memproses...' : 'Lihat Hasil Tes'}
                                </button>
                            )}
                        </div>

                        {/* Error Message */}
                        {errors.answers && (
                            <p className="text-sm text-red-600 mt-3">{errors.answers}</p>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}

RiasecTest.layout = (page: any) => <UserLayout children={page} />
