import { Play } from "lucide-react"
import { AuthForm } from "../../features/auth/AuthForm"
import { useLocation } from "react-router"

export const AuthLayout = () => {
	const location = useLocation()
	const type = location.pathname === "/iniciar-sesion" ? "login" : "register"

	const handleLogin = () => true

	return (
		<div className="fixed inset-0 z-100 flex items-center justify-center bg-[#050505]">
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80')] bg-cover opacity-50 blur-sm scale-105 animate-pulse-slow" />
				<div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />
			</div>

			<div className="relative z-10 w-full max-w-md p-8 animate-fade-in-up">
				<div className="text-center mb-10">
					<div className="w-16 h-16 bg-linear-to-br from-violet-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-violet-900/50 mx-auto mb-6 rotate-3 hover:rotate-6 transition-transform">
						<Play size={32} className="fill-white text-white ml-1" />
					</div>
					<h1 className="text-4xl font-bold text-white mb-2 tracking-tight">CineStream</h1>
					<p className="text-gray-400">Tu portal al cine inmersivo.</p>
				</div>

				<AuthForm type={type} onLogin={handleLogin} />
			</div>
		</div>
	)
}
