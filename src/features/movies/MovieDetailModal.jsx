import { Heart, Lock, Play, X } from "lucide-react"
import { tmdbService } from "../../services/tmdb"
import { Button } from "../../components/common/Button"
import { Badge } from "../../components/common/Badge"
import { AnimatePresence, motion } from "motion/react"

export const MovieDetailModal = ({ movie, isPremiumUser, onClose, onPlay, onUnlock, isFavorite, onToggleFavorite }) => {
	if (!movie) return null

	const imageUrl = movie.poster_path
		? tmdbService.getImageW500(movie.poster_path) // O getImageOriginal para mayor calidad
		: ""
	const backdropUrl = movie.backdrop_path ? tmdbService.getImageOriginal(movie.backdrop_path) : ""

	const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR"
	const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"

	return (
		<AnimatePresence>
			<div className="fixed inset-0 z-60 flex items-center justify-center p-4 md:p-8">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
					className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
				/>

				<motion.div
					initial={{ scale: 0.9, opacity: 0, y: 20 }}
					animate={{ scale: 1, opacity: 1, y: 0 }}
					exit={{ scale: 0.9, opacity: 0, y: 20 }}
					transition={{ type: "spring", damping: 25, stiffness: 300 }}
					className="relative w-full max-w-6xl bg-[#121212] rounded-3xl overflow-hidden shadow-2xl shadow-black ring-1 ring-white/10 flex flex-col md:flex-row max-h-[95vh] md:h-[85vh]"
				>
					<button
						onClick={onClose}
						className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
					>
						<X size={24} />
					</button>

					<div className="relative w-full md:w-[45%] h-64 md:h-full shrink-0 group overflow-hidden">
						<div className="absolute inset-0 bg-linear-to-t from-[#121212] via-transparent to-transparent md:bg-linear-to-r md:from-transparent md:to-[#121212] z-10" />

						<img
							src={imageUrl || backdropUrl}
							alt={movie.title}
							className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
						/>

						{movie.premium && !isPremiumUser && (
							<div className="absolute inset-0 z-20 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
								<motion.div
									animate={{ y: [0, -10, 0] }}
									transition={{ repeat: Infinity, duration: 2 }}
									className="p-4 bg-amber-500/10 rounded-full mb-4 border border-amber-500/20"
								>
									<Lock size={40} className="text-amber-400" />
								</motion.div>
								<h3 className="text-2xl font-bold text-white mb-2">Exclusivo Premium</h3>
								<p className="text-gray-300 text-sm mb-6 max-w-xs">
									Esta obra maestra requiere una suscripción activa.
								</p>
								<Button
									variant="premium"
									onClick={onUnlock}
									className="bg-amber-500 hover:bg-amber-600 text-black font-bold border-none"
								>
									Desbloquear Acceso
								</Button>
							</div>
						)}
					</div>

					<div className="w-full md:w-[55%] p-8 md:p-12 overflow-y-auto custom-scrollbar bg-[#121212] flex flex-col">
						<div className="flex items-center gap-3 mb-6 flex-wrap">
							<span className="text-emerald-400 font-bold text-lg">{rating} Puntuación</span>
							<span className="text-gray-400 border-l border-white/20 pl-3 ml-1">{year}</span>

							<div className="flex gap-2 ml-auto md:ml-2">
								<Badge variant="outline">HD</Badge>
								{movie.premium && (
									<span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/50 uppercase tracking-wider">
										PREMIUM
									</span>
								)}
							</div>
						</div>

						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight tracking-tight">
							{movie.title}
						</h2>

						<p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-violet-500/50 pl-6 py-1">
							{movie.overview}
						</p>

						<div className="flex items-center gap-4 mb-10 mt-auto md:mt-0">
							{!movie.premium || isPremiumUser ? (
								<Button
									variant="primary"
									className="w-full md:w-auto px-10 py-4 text-lg shadow-lg shadow-violet-900/20"
									icon={Play}
									onClick={() => onPlay(movie)}
								>
									Reproducir
								</Button>
							) : (
								<Button
									variant="secondary"
									className="w-full md:w-auto opacity-50 cursor-not-allowed bg-gray-800"
									icon={Lock}
									disabled={true}
								>
									Bloqueado
								</Button>
							)}

							<button
								onClick={onToggleFavorite}
								className={`p-4 rounded-xl border transition-all ${
									isFavorite
										? "bg-violet-500/20 border-violet-500 text-violet-400"
										: "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30"
								}`}
							>
								<Heart size={24} className={isFavorite ? "fill-current" : ""} />
							</button>
						</div>

						<div className="mt-auto border-t border-white/10 pt-8">
							<div className="grid grid-cols-2 gap-8">
								<div>
									<h4 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-2">
										Popularidad
									</h4>
									<p className="text-white font-medium">{Math.round(movie.popularity)} Puntos</p>
								</div>
								<div>
									<h4 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-2">
										Idioma Original
									</h4>
									<p className="text-white font-medium uppercase">{movie.original_language}</p>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</AnimatePresence>
	)
}
