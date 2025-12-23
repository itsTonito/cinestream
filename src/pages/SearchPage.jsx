import React, { useState, useEffect } from "react"
import { Search, Loader, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router"
import { useAppStore } from "../store/useAppStore"
import { tmdbService } from "../services/tmdb"
import { MovieCard } from "../features/movies/MovieCard"
import { MovieDetailModal } from "../features/movies/MovieDetailModal"

export const SearchPage = () => {
	const navigate = useNavigate()
	const { isPremium, toggleFavorite, isFavorite } = useAppStore()

	const [query, setQuery] = useState("")
	const [results, setResults] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [selectedMovie, setSelectedMovie] = useState(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			if (query.trim()) {
				performSearch(query)
			} else {
				setResults([])
			}
		}, 500)

		return () => clearTimeout(timer)
	}, [query])

	const performSearch = async (searchTerm) => {
		setIsLoading(true)
		try {
			const data = await tmdbService.searchMovies(searchTerm)
			const filteredResults = (data.results || []).filter((movie) => movie.poster_path)
			setResults(filteredResults)
		} catch (error) {
			console.error("Error searching movies:", error)
		} finally {
			setIsLoading(false)
		}
	}

	const handlePlayMovie = (movie) => {
		if (selectedMovie) setSelectedMovie(null)

		if (movie.premium && !isPremium) {
			navigate(`/watch/${movie.id}`)
		} else {
			navigate(`/watch/${movie.id}`)
		}
	}

	const handleUnlock = () => {
		setSelectedMovie(null)
		navigate("/pricing")
	}

	return (
		<div className="pt-24 px-6 md:px-12 pb-12 w-full min-h-screen bg-[#0a0a0a] animate-fade-in">
			<div className="max-w-4xl mx-auto mb-12">
				<div className="relative group">
					<div className="absolute -inset-1 bg-linear-to-r from-violet-600 to-cyan-500 rounded-2xl blur opacity-25 group-focus-within:opacity-75 transition duration-500"></div>
					<div className="relative bg-[#121212] rounded-2xl flex items-center p-4 border border-white/10 shadow-2xl">
						<Search className="text-gray-400 ml-2" size={24} />
						<input
							type="text"
							placeholder="¿Qué quieres ver hoy?"
							className="w-full bg-transparent border-none outline-none text-white text-lg px-4 placeholder-gray-500 font-medium"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							autoFocus
						/>
						{query && (
							<button
								onClick={() => {
									setQuery("")
									setResults([])
								}}
								className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
							>
								<X size={20} />
							</button>
						)}
						{isLoading && <Loader className="animate-spin text-violet-500 ml-2" size={24} />}
					</div>
				</div>
			</div>

			<div className="w-fit mx-auto">
				{results.length > 0 ? (
					<motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
						<AnimatePresence>
							{results.map((movie, idx) => (
								<motion.div
									key={movie.id}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.9 }}
									transition={{ duration: 0.2, delay: idx * 0.05 }}
								>
									<MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
				) : query.trim() && !isLoading ? (
					<div className="text-center py-20">
						<div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
							<Search size={40} className="text-gray-600" />
						</div>
						<h3 className="text-xl text-gray-300 font-medium">No encontramos resultados para "{query}"</h3>
						<p className="text-gray-500 mt-2">Intenta con otro título o género.</p>
					</div>
				) : !query.trim() ? (
					<div className="text-center py-20 opacity-50">
						<Search size={64} className="text-gray-700 mx-auto mb-4" />
						<p className="text-gray-500 text-lg">Escribe el nombre de una película para comenzar</p>
					</div>
				) : null}
			</div>

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
