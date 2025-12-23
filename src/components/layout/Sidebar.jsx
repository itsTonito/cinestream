import { NavLink } from "react-router"
import { Home, Search, Heart, Settings, Play, CreditCard } from "lucide-react"
import { useAppStore } from "../../store/useAppStore"

export const Sidebar = () => {
	const { user, isPremium } = useAppStore()

	const menuItems = [
		{ path: "/", icon: Home, label: "Inicio" },
		{ path: "/favoritos", icon: Heart, label: "Favoritos" },
		{ path: "/suscribirse", icon: CreditCard, label: "Planes" },
		{ path: "/perfil", icon: Settings, label: "Ajustes" },
		{ path: "/buscar", icon: Search, label: "Buscar" },
	]

	const userImage =
		user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"

	return (
		<nav className="fixed left-0 top-0 bottom-0 w-20 hover:w-64 z-50 flex flex-col items-center hover:items-start bg-black/60 backdrop-blur-xl border-r border-white/5 transition-all duration-500 group overflow-hidden">
			<div className="h-20 flex items-center justify-center w-full group-hover:justify-start group-hover:px-8 transition-all shrink-0">
				<div className="w-10 h-10 bg-linear-to-br from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-900/50 shrink-0">
					<Play size={20} className="fill-white text-white ml-1" />
				</div>
				<span className="ml-4 font-bold text-xl tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
					CineStream
				</span>
			</div>

			<div className="flex-1 w-full py-8 flex flex-col gap-2 px-3">
				{menuItems.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						className={({ isActive }) => `
              flex items-center h-12 w-full rounded-xl transition-all duration-300 group/btn
              ${isActive ? "bg-violet-600/20 text-violet-400" : "text-gray-400 hover:bg-white/5 hover:text-white"}
            `}
					>
						<div className="w-14 flex items-center justify-center shrink-0">
							<item.icon
								size={22}
								className={`transition-all ${
									window.location.pathname === item.path
										? "drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]"
										: ""
								}`}
							/>
						</div>
						<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium whitespace-nowrap delay-75">
							{item.label}
						</span>
					</NavLink>
				))}

				{/* <button className="flex items-center h-12 w-full rounded-xl transition-all duration-300 group/btn text-gray-400 hover:bg-white/5 hover:text-white">
					<div className="w-14 flex items-center justify-center shrink-0">
						<Search size={22} />
					</div>
					<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium whitespace-nowrap delay-75">
						Buscar
					</span>
				</button> */}
			</div>

			<div className="w-full p-4 border-t border-white/5 shrink-0">
				<NavLink to="/perfil" className="block cursor-pointer">
					<div
						className={`rounded-full px-0.5 pb-1 pt-0.5 group-hover:p-3 group-hover:rounded-4xl bg-linear-to-br transition-all duration-300 ${
							isPremium
								? "from-amber-500/20 to-orange-600/20 border border-amber-500/30"
								: "from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800"
						}`}
					>
						<div className="flex items-center gap-3 overflow-hidden">
							<div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden border-2 border-white/10 shrink-0">
								<img src={userImage} alt="User" className="w-full h-full object-cover" />
							</div>
							<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
								<p className="text-sm font-bold text-white truncate max-w-[120px]">
									{user?.name || "Usuario"}
								</p>
								<p className={`text-xs ${isPremium ? "text-amber-400" : "text-gray-400"}`}>
									{isPremium ? "Plan Premium" : "Plan Gratis"}
								</p>
							</div>
						</div>
					</div>
				</NavLink>
			</div>
		</nav>
	)
}
