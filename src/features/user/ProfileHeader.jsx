import { Edit2, Mail } from "lucide-react"
import { Button } from "../../components/common/Button"

export const ProfileHeader = ({ user, isPremium, onUpgrade }) => {
	const defaultImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
	const userName = user?.name || "Usuario"
	const userEmail = user?.email || "usuario@cinestream.com"
	const userImage = user?.image || defaultImage

	return (
		<div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12 bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
			<div className="relative group">
				<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-violet-600/50 shadow-xl shadow-violet-900/20">
					<img src={userImage} alt="User" className="w-full h-full object-cover" />
				</div>
				<button className="absolute bottom-0 right-0 p-2 bg-violet-600 rounded-full text-white hover:bg-violet-500 transition-colors shadow-lg cursor-pointer">
					<Edit2 size={16} />
				</button>
			</div>

			<div className="flex-1 text-center md:text-left">
				<div className="flex flex-col md:flex-row md:items-center gap-3 mb-2 justify-center md:justify-start">
					<h1 className="text-4xl font-bold text-white">{userName}</h1>
					{isPremium && (
						<span className="px-3 py-1 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-full text-xs font-bold tracking-wider uppercase inline-block w-fit mx-auto md:mx-0">
							Miembro Premium
						</span>
					)}
				</div>
				<p className="text-gray-400 mb-6 flex items-center justify-center md:justify-start gap-2">
					<Mail size={14} /> {userEmail}
				</p>

				<div className="flex flex-wrap gap-4 justify-center md:justify-start">
					<Button variant="secondary" className="h-10 text-sm">
						Editar Perfil
					</Button>
					{!isPremium && (
						<Button variant="premium" className="h-10 text-sm" onClick={onUpgrade}>
							Pasar a Premium
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
