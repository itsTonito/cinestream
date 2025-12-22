import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { Button } from "../../components/common/Button"
import { useNavigate } from "react-router"

export const WelcomePremiumModal = ({ onClose }) => {
	const navigate = useNavigate()
	return (
		<div className="fixed inset-0 z-70 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/60 backdrop-blur-xl animate-fade-in overflow-hidden"></div>

			<motion.div
				initial={{ scale: 0.5, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ type: "spring", damping: 15 }}
				className="relative bg-[#1a1a1a] p-10 rounded-[2.5rem] border border-white/10 text-center max-w-md w-full overflow-hidden"
			>
				<div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/30 rounded-full blur-[50px]" />

				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.2, type: "spring" }}
					className="w-24 h-24 bg-linear-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/30 relative"
				>
					<Check size={48} className="text-white relative z-10" strokeWidth={4} />
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
						className="absolute inset-0 border-2 border-dashed border-white/30 rounded-full"
					/>
				</motion.div>

				<h2 className="text-3xl font-bold text-white mb-2">¡Bienvenido a Premium!</h2>
				<div className="flex items-center justify-center gap-2 mb-6">
					<Star size={16} className="text-amber-400 fill-amber-400" />
					<span className="text-amber-400 font-bold tracking-widest text-sm uppercase">Acceso Ilimitado</span>
					<Star size={16} className="text-amber-400 fill-amber-400" />
				</div>

				<p className="text-gray-400 mb-8 leading-relaxed">
					Tu cuenta ha sido mejorada exitosamente. Ahora puedes disfrutar de todo el catálogo en 4K Ultra HD
					sin interrupciones.
				</p>

				<Button variant="primary" fullWidth onClick={() => navigate("/")} className="h-14 text-lg">
					Comenzar a Ver
				</Button>
			</motion.div>
		</div>
	)
}
