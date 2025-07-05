// inertia/pages/About.tsx

import { Head } from '@inertiajs/react'
import { FileText, Github, Linkedin, Send } from 'lucide-react'
import UserLayout from '../layouts/main'

interface AboutProps {
    title: string
    description: string
}

// Komponen kartu kontak (sosmed)
const ContactCard = ({
    icon: Icon,
    title,
    content,
    href,
}: {
    icon: any
    title: string
    content: string
    href?: string
}) => (
    <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Icon className="w-12 h-12 text-blue-500 mb-3" />
        <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{title}</h4>
        {href ? (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-200"
            >
                {content}
            </a>
        ) : (
            <p className="text-gray-600 dark:text-gray-300">{content}</p>
        )}
    </div>
)

export default function About({ title, description }: AboutProps) {
    return (
        <UserLayout>
            <Head>
                <title>{title || 'Skripsi Fauzan'}</title>
                <meta name="description" content={description} />
            </Head>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                {/* Abstrak */}
                <section className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
                    <div className="flex items-center mb-6">
                        <div className="bg-blue-100 dark:bg-blue-950 p-3 rounded-full mr-4">
                            <FileText className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                            Website Sistem Rekomendasi
                        </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base lg:text-lg">
                        Website ini merupakan sistem rekomendasi jurusan kuliah berbasis tes minat bakat RIASEC
                        yang dirancang untuk membantu siswa SMA dalam menentukan jurusan yang sesuai dengan
                        minat dan bakat mereka. Sistem ini menggabungkan metode RIASEC dengan teknologi web
                        untuk memberikan rekomendasi yang akurat dan mudah diakses.
                    </p>
                </section>

                {/* Kontak Sosmed */}
                <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-2xl shadow-lg">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                            Kontak dan Sosial Media
                        </h2>
                        <p className="mt-3 text-gray-500 dark:text-gray-300 text-base lg:text-lg max-w-xl mx-auto">
                            
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                        <ContactCard
                            icon={Github}
                            title="GitHub"
                            content="github.com/evandaru"
                            href="https://github.com/evandaru"
                        />
                        <ContactCard
                            icon={Send}
                            title="Telegram"
                            content="@evndaru"
                            href="https://t.me/evndaru"
                        />
                        <ContactCard
                            icon={Linkedin}
                            title="LinkedIn"
                            content="linkedin.com/in/fauzanhasyim"
                            href="https://linkedin.com/in/fauzanhasyim"
                        />
                    </div>
                </section>
            </div>
        </UserLayout>
    )
}