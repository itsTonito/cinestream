import React from "react"
import { ChevronRight, Shield, LogOut } from "lucide-react"
import { useNavigate } from "react-router"
import { useAppStore } from "../store/useAppStore"
import { ProfileHeader } from "../features/user/ProfileHeader"
import { Button } from "../components/common/Button"
import { WideVideoCard } from "../features/movies/WideVideoCard"
import { DeviceList } from "../features/user/DeviceList"

export const ProfilePage = () => {
	const navigate = useNavigate()
	const { user, isPremium, logout, movies } = useAppStore()

	const continueWatchingList = movies.popular?.slice(0, 3) || []

	const handleLogout = () => {
		logout()
		navigate("/iniciar-sesion")
	}

	return (
		<div className="w-full min-h-full pt-20 px-6 md:px-20 pb-12 animate-fade-in bg-[#0a0a0a]">
			<button
				onClick={() => navigate("/")}
				className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group cursor-pointer"
			>
				<ChevronRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={20} />
				Volver al Inicio
			</button>

			<div className="max-w-5xl mx-auto">
				<ProfileHeader user={user} isPremium={isPremium} onUpgrade={() => navigate("/pricing")} />

				<div className="grid md:grid-cols-3 gap-8">
					<div className="md:col-span-1 space-y-6">
						<div className="bg-white/5 p-6 rounded-2xl border border-white/10">
							<h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
								<Shield size={18} className="text-violet-400" />
								Suscripción
							</h3>
							<div className="space-y-4">
								<div>
									<label className="text-xs text-gray-500 uppercase font-bold">Plan Actual</label>
									<p className="text-white font-medium">
										{isPremium ? "Premium 4K + HDR" : "Básico (Con Anuncios)"}
									</p>
								</div>
								<div>
									<label className="text-xs text-gray-500 uppercase font-bold">
										Próxima Facturación
									</label>
									<p className="text-white font-medium">12 Ene, 2026</p>
								</div>
								<button className="text-sm text-gray-400 hover:text-white underline decoration-gray-600 transition-colors cursor-pointer">
									Administrar Suscripción
								</button>
							</div>
						</div>

						<DeviceList />
					</div>

					<div className="md:col-span-2 flex flex-col h-full">
						<h3 className="text-2xl font-bold text-white mb-6">Continuar Viendo</h3>

						{continueWatchingList.length > 0 ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
								{continueWatchingList.map((movie) => (
									<WideVideoCard key={movie.id} movie={movie} />
								))}
							</div>
						) : (
							<div className="bg-white/5 rounded-xl p-8 text-center border border-white/10 mb-8">
								<p className="text-gray-400">No has visto contenido recientemente.</p>
							</div>
						)}

						<div className="border-t border-white/10 pt-8 flex justify-end">
							<Button variant="danger" icon={LogOut} onClick={handleLogout}>
								Cerrar Sesión
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
