import { NavLink } from "react-router"
import { Home, Heart, User, LogOut, Star } from "lucide-react"
import { useAppStore } from "../../store/useAppStore"

export const Sidebar = () => {
	const { user, logout, isPremium } = useAppStore()

	const navItems = [
		{ to: "/", icon: <Home size={24} />, label: "Inicio" },
		{ to: "/favoritos", icon: <Heart size={24} />, label: "Favoritos" },
		{
			to: "/suscribirse",
			icon: <Star size={24} className={isPremium ? "text-yellow-400" : ""} />,
			label: "Planes",
		},
		user
			? { to: "/perfil", icon: <User size={24} />, label: "Perfil" }
			: { to: "/iniciar-sesion", icon: <User size={24} />, label: "Ingresar" },
	]

	return (
		<nav className="fixed bottom-0 left-0 w-full md:w-24 md:h-screen bg-black/90 md:bg-black border-t md:border-t-0 md:border-r border-white/10 z-50 flex md:flex-col justify-between items-center py-4 md:py-8 px-6">
			<div className="hidden md:flex flex-col items-center gap-2 mb-8">
				<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
					<span className="text-white font-bold text-xl">C</span>
				</div>
			</div>

			{/* Enlaces de Navegación */}
			<div className="flex md:flex-col gap-8 md:gap-8 w-full md:w-auto justify-around md:justify-start">
				{navItems.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						className={({ isActive }) => `
              flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 group relative
              ${isActive ? "text-white" : "text-gray-500 hover:text-gray-300"}
            `}
					>
						<div className="relative p-1">
							{item.icon}
							<NavLink
								to={item.to}
								className={({ isActive }) =>
									isActive ? "absolute right-0 top-0 w-2 h-2 bg-purple-500 rounded-full" : "hidden"
								}
							></NavLink>
						</div>
						<span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 md:block hidden transition-opacity">
							{item.label}
						</span>
					</NavLink>
				))}
			</div>
			{user && (
				<button
					onClick={logout}
					className="hidden md:flex flex-col items-center gap-1 text-gray-500 hover:text-red-500 transition-colors mt-auto"
					title="Cerrar Sesión"
				>
					<LogOut size={24} />
				</button>
			)}
		</nav>
	)
}
