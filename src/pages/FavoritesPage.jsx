import { useNavigate } from "react-router"
import { useAppStore } from "../store/useAppStore"
import { useState } from "react"
import { Heart, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { MovieCard } from "../features/movies/MovieCard"
import { MovieDetailModal } from "../features/movies/MovieDetailModal"

export const FavoritesPage = () => {
	const navigate = useNavigate()
	// Obtenemos los datos directamente del store
	const { favorites, toggleFavorite, isPremium, isFavorite } = useAppStore()
	const [selectedMovie, setSelectedMovie] = useState(null)

	// --- Lógica de Navegación/Reproducción (Igual que en Home) ---
	const handlePlayMovie = (movie) => {
		if (selectedMovie) setSelectedMovie(null)

		if (movie.premium && !isPremium) {
			setSelectedMovie(movie) // Si es premium y no pagó, abre modal (bloqueado)
		} else {
			navigate(`/watch/${movie.id}`) // Si tiene acceso, va al player
		}
	}

	const handleUnlock = () => {
		setSelectedMovie(null)
		navigate("/pricing")
	}

	const handleSelectMovie = (movie) => {
		setSelectedMovie(movie)
	}

	return (
		<div className="pt-24 px-8 md:px-12 pb-12 w-full animate-fade-in min-h-screen bg-[#0a0a0a]">
			<h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
				<Heart className="fill-violet-500 text-violet-500" /> Mis Favoritos
			</h1>

			{favorites.length === 0 ? (
				// --- Empty State ---
				<div className="flex flex-col items-center justify-center h-64 text-center border border-dashed border-white/10 rounded-2xl bg-white/5">
					<Heart size={48} className="text-gray-600 mb-4" />
					<p className="text-gray-400 text-lg">Aún no tienes favoritos.</p>
					<p className="text-gray-500 text-sm">Agrega películas para verlas aquí.</p>
				</div>
			) : (
				// --- Grid de Favoritos ---
				<motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
					<AnimatePresence mode="popLayout">
						{favorites.map((movie) => (
							<motion.div
								key={movie.id}
								layout
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.2 }}
								className="relative group"
							>
								<MovieCard movie={movie} onClick={handleSelectMovie} />

								{/* Botón de Eliminar (Aparece en Hover) */}
								<button
									onClick={(e) => {
										e.stopPropagation()
										toggleFavorite(movie)
									}}
									className="absolute top-2 left-2 p-2 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80 z-20 cursor-pointer backdrop-blur-sm"
									title="Eliminar de favoritos"
								>
									<X size={14} />
								</button>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			)}

			{/* --- Modal de Detalles --- */}
			{selectedMovie && (
				<MovieDetailModal
					movie={selectedMovie}
					isPremiumUser={isPremium}
					onClose={() => setSelectedMovie(null)}
					onPlay={handlePlayMovie}
					onUnlock={handleUnlock}
					isFavorite={isFavorite(selectedMovie.id)}
					onToggleFavorite={() => toggleFavorite(selectedMovie)}
				/>
			)}
		</div>
	)
}
