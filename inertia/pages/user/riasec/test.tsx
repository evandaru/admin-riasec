import { FormEvent, useRef, useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import UserLayout from '../layouts/main'
import { Wrench, Microscope, Paintbrush, Users, Briefcase, BarChart } from 'lucide-react'

// Interface tidak berubah
interface Question {
  id: number
  teksPertanyaan: string
  tipeRiasec: 'R' | 'I' | 'A' | 'S' | 'E' | 'C'
}

interface RiasecTestProps {
  questions: Question[]
}

// Data RIASEC untuk slide awal
const riasecTypes = {
  R: {
    name: 'Realistic',
    desc: 'Suka kerja fisik, alat, atau outdoor. Contoh: Mekanik.',
    icon: Wrench,
    color: 'text-orange-500',
  },
  I: {
    name: 'Investigative',
    desc: 'Penyuka riset dan analisis. Contoh: Ilmuwan.',
    icon: Microscope,
    color: 'text-sky-500',
  },
  A: {
    name: 'Artistic',
    desc: 'Kreatif dan ekspresif. Contoh: Desainer.',
    icon: Paintbrush,
    color: 'text-purple-500',
  },
  S: {
    name: 'Social',
    desc: 'Suka bantu orang dan kolaborasi. Contoh: Guru.',
    icon: Users,
    color: 'text-emerald-500',
  },
  E: {
    name: 'Enterprising',
    desc: 'Ambisius dan suka memimpin. Contoh: Pengusaha.',
    icon: Briefcase,
    color: 'text-red-500',
  },
  C: {
    name: 'Conventional',
    desc: 'Terorganisir dan suka data. Contoh: Akuntan.',
    icon: BarChart,
    color: 'text-yellow-500',
  },
}

// Konstanta
const QUESTIONS_PER_SLIDE = 5

export default function RiasecTestCardViewCheckbox({ questions }: RiasecTestProps) {
  const [currentSlide, setCurrentSlide] = useState(-1)
  const { data, setData, post, processing, errors } = useForm({
    answers: {} as Record<string, number>,
  })
  const checkboxRefs = useRef<Record<number, HTMLInputElement | null>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle perubahan checkbox
  const handleAnswerChange = (questionId: number, checked: boolean) => {
    setData('answers', {
      ...data.answers,
      [questionId]: checked ? 1 : 0,
    })
  }

  // Handle klik card
  const handleCardClick = (questionId: number, e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).closest('.toggle-switch')) {
      const checkbox = checkboxRefs.current[questionId]
      if (checkbox) {
        checkbox.click()
      }
    }
  }

  // Handle submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/riasec/submit')
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, questionId?: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (questionId) {
        const checkbox = checkboxRefs.current[questionId]
        if (checkbox) {
          checkbox.click()
        }
      }
    } else if (e.key === 'ArrowLeft' && currentSlide > -1) {
      setCurrentSlide(currentSlide - 1)
    } else if (e.key === 'ArrowRight' && currentSlide < totalQuestionSlides) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const totalQuestionSlides = Math.ceil(questions.length / QUESTIONS_PER_SLIDE)

  return (
    <>
      <Head title="Tes Minat RIASEC" />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-8 px-4 sm:px-8 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1674&auto=format&fit=crop')] bg-cover bg-center opacity-10 dark:opacity-5"></div>
        <div
          className="max-w-3xl mx-auto relative"
          ref={containerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <form onSubmit={handleSubmit} className="relative">
            {/* Slide Awal */}
            {currentSlide === -1 && (
              <div className="text-center flex flex-col items-center justify-center min-h-[70vh] animate-zoom-in">
                <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  Tes RIASEC: Temuin Karier Impian Lo! 🚀
                </h1>
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto">
                  Tes ini bakal bantu lo nemuin minat dan bakat tersembunyi. Jawab jujur, klik card
                  atau toggle “Setuju” kalo cocok, biarin “Tidak Setuju” kalo nggak! 😎
                </p>
                {/* Info RIASEC */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                  {Object.entries(riasecTypes).map(([type, info]) => {
                    const Icon = info.icon
                    return (
                      <div
                        key={type}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                      >
                        <Icon className={`h-5 w-5 ${info.color}`} />
                        <div className="text-left">
                          <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            {info.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{info.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentSlide(0)}
                  className="mt-8 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-md hover:from-indigo-600 hover:to-purple-600 hover:scale-105 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 animate-bounce"
                >
                  Mulai Tes Sekarang! →
                </button>
              </div>
            )}

            {/* Slide Pertanyaan */}
            {currentSlide >= 0 && currentSlide < totalQuestionSlides && (
              <div className="animate-fade-in">
                {/* Header */}
                <div className="text-center mb-6">
                  <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    Cari Karier Lo! 🚀
                  </h1>
                  <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                    Klik card atau toggle “Setuju ✅” kalo lo ngerasa cocok, biarin “Tidak Setuju
                    ❌” kalo nggak. Gampang, bro! 😎
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8 px-4">
                  <div className="flex justify-between mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <span>Progres Tes</span>
                    <span>
                      {Math.round(((currentSlide + 1) / totalQuestionSlides) * 100)}% (
                      {currentSlide + 1}/{totalQuestionSlides})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${((currentSlide + 1) / totalQuestionSlides) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Daftar Pertanyaan */}
                <div className="space-y-6">
                  {questions
                    .slice(
                      currentSlide * QUESTIONS_PER_SLIDE,
                      (currentSlide + 1) * QUESTIONS_PER_SLIDE
                    )
                    .map((question, index) => {
                      const globalQuestionIndex = currentSlide * QUESTIONS_PER_SLIDE + index
                      // Warna card berdasarkan jawaban
                      const cardBg =
                        data.answers[question.id] === 1
                          ? 'bg-green-100 dark:bg-green-900 border-green-300'
                          : data.answers[question.id] === 0
                            ? ''
                            : 'bg-white dark:bg-gray-800 border-green-300 border-transparent'
                      return (
                        <div
                          key={question.id}
                          className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer border ${cardBg}`}
                          onClick={(e) => handleCardClick(question.id, e)}
                          onKeyDown={(e) => handleKeyDown(e, question.id)}
                          tabIndex={0}
                          aria-label={`Pertanyaan ${globalQuestionIndex + 1}: ${question.teksPertanyaan}`}
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                              <span className="text-indigo-500">
                                #{globalQuestionIndex + 1}/{questions.length}
                              </span>{' '}
                              {question.teksPertanyaan}
                            </p>
                            <div className="relative group">
                              <input
                                id={`question-${question.id}`}
                                type="checkbox"
                                className="hidden"
                                checked={!!data.answers[question.id]}
                                onChange={(e) => handleAnswerChange(question.id, e.target.checked)}
                                ref={(el) => (checkboxRefs.current[question.id] = el)}
                                aria-checked={!!data.answers[question.id]}
                              />
                              <label
                                className="toggle-switch flex items-center w-16 h-8 bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer"
                                htmlFor={`question-${question.id}`}
                              >
                                <span
                                  className={`flex items-center justify-center w-6 h-6 rounded-full bg-white dark:bg-gray-800 shadow-md transform transition-transform duration-300 ${
                                    data.answers[question.id]
                                      ? 'translate-x-8 bg-green-500 text-white'
                                      : 'translate-x-0  text-white'
                                  }`}
                                >
                                  {data.answers[question.id] ? '✅' : '❌'}
                                </span>
                              </label>
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
                                {data.answers[question.id] ? 'Setuju = 1' : 'Tidak Setuju = 0'}
                              </div>
                            </div>
                          </div>
                          {errors[`answers.${question.id}`] && (
                            <div className="text-red-500 text-sm mt-3 text-center animate-pulse">
                              {errors[`answers.${question.id}`]}
                            </div>
                          )}
                        </div>
                      )
                    })}
                </div>

                {/* Navigasi */}
                <div className="pt-8 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(currentSlide - 1)}
                    className={`px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-xl shadow-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 transition-all duration-300 ${
                      currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={currentSlide === 0}
                  >
                    ← Kembali
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(currentSlide + 1)}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-md hover:from-indigo-600 hover:to-purple-600 hover:scale-105 focus:ring-4 focus:ring-indigo-300 transition-all duration-300 animate-bounce"
                  >
                    Lanjut →
                  </button>
                </div>
                {errors.answers && (
                  <div className="text-red-500 text-sm mt-4 text-center animate-pulse">
                    {errors.answers}
                  </div>
                )}
              </div>
            )}

            {/* Slide Akhir */}
            {currentSlide === totalQuestionSlides && (
              <div className="text-center flex flex-col items-center justify-center min-h-[70vh] animate-fade-in relative">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                  <div className="confetti"></div>
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-teal-500 dark:from-green-400 dark:to-teal-400">
                  Yeay, Lo Selesai! 🎉
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  Tinggal satu langkah lagi buat lihat hasil tes lo. Pencet tombol di bawah, bro! 🚀
                </p>
                <div className="mt-8 flex justify-center items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(currentSlide - 1)}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold rounded-xl shadow-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:ring-4 focus:ring-gray-300 transition-all duration-300"
                  >
                    ← Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl shadow-md hover:from-green-600 hover:to-teal-600 hover:scale-105 focus:ring-4 focus:ring-green-300 transition-all duration-300 disabled:bg-green-300 disabled:cursor-not-allowed disabled:scale-100 animate-bounce"
                  >
                    {processing ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Ngolah Hasil...
                      </span>
                    ) : (
                      'Lihat Hasil Sekarang! 🚀'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Style CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes zoom-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-zoom-in {
          animation: zoom-in 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out backwards;
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        .toggle-switch {
          transition: all 0.3s ease;
        }
        .toggle-switch:hover {
          transform: scale(1.05);
        }
        .confetti {
          position: absolute;
          width: 8px;
          height: 8px;
          background: linear-gradient(45deg, #ff3a19, #02c66f, #7fc6a6);
          border-radius: 2px;
          animation: confetti 2s linear infinite;
        }
        .confetti:nth-child(1) {
          left: 20%;
          animation-delay: 0s;
        }
        .confetti:nth-child(2) {
          left: 40%;
          animation-delay: 0.2s;
        }
        .confetti:nth-child(3) {
          left: 60%;
          animation-delay: 0.4s;
        }
        .confetti:nth-child(4) {
          left: 80%;
          animation-delay: 0.6s;
        }
        .confetti:nth-child(5) {
          left: 50%;
          animation-delay: 0.8s;
        }
      `}</style>
    </>
  )
}

RiasecTestCardViewCheckbox.layout = (page: any) => <UserLayout children={page} />
