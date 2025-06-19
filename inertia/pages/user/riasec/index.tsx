// title: inertia/pages/user/riasec/index.tsx
import { Head, Link, usePage } from '@inertiajs/react'
import UserLayout from '../layouts/main'

interface User {
    fullName: string
}

interface IndexPageProps {
    user: User
}

export default function RiasecIndexPage() {
    const { user } = usePage<IndexPageProps>().props

    return (
        <>
            <Head title="Tes Minat RIASEC" />
            <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg ">
                <img className="w-full h-96 object-cover rounded-xl mb-6" src="https://images.unsplash.com/photo-1507183711269-1235bed98f14?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Halo, {user.fullName}! 👋</h1>
                <p className="text-lg text-slate-700 mb-8">
                    Selamat datang! Silakan mulai Tes Minat RIASEC untuk mengetahui tipe kepribadian dan
                    potensi karir Anda.
                </p>

                <div className="space-y-4">
                    {/* Tombol ini akan mengarahkan ke controller 'start' yang akan memvalidasi sekali lagi sebelum menampilkan soal */}
                    <Link
                        href="/riasec/test"
                        className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                    >
                        Mulai Tes Minat RIASEC
                    </Link>
                </div>
            </section>
        </>
    )
}

// Layout tetap digunakan
RiasecIndexPage.layout = (page: any) => <UserLayout children={page} />