import { useEffect, useState } from "react"
import { tmdbService } from "../../services/tmdb"
import { Info, Play } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { Button } from '../../components/common/Button'

export const HeroBanner = ({ movies = [], onPlay, onInfo }) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		if (movies.length <= 1) return

		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length)
		}, 8000)

		return () => clearInterval(interval)
	}, [movies.length])

	if (!movies || movies.length === 0) {
		return <div className="h-[85vh] bg-[#0a0a0a] animate-pulse" />
	}

	const currentMovie = movies[currentIndex]
	const backdropUrl = currentMovie ? tmdbService.getImageOriginal(currentMovie.backdrop_path) : ""

	return (
		<header className="relative w-full min-h-[85vh] flex items-end pb-24 overflow-hidden">
			<AnimatePresence mode="wait">
				<motion.div
					key={currentMovie ? currentMovie.id : "bg-empty"}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
					className="absolute inset-0"
				>
					{currentMovie && (
						<img src={backdropUrl} alt={currentMovie.title} className="w-full h-full object-cover" />
					)}
					<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
					<div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />
				</motion.div>
			</AnimatePresence>

			<div className="relative z-10 p-8 md:p-12 max-w-4xl w-full mt-20">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentMovie ? currentMovie.id : "content-empty"}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<span className="inline-block px-3 py-1 mb-4 rounded border border-cyan-500/50 text-cyan-400 text-xs font-bold tracking-widest uppercase bg-cyan-950/30 backdrop-blur-md">
							#{currentIndex + 1} En Tendencias
						</span>

						<h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-2xl text-white">
							{currentMovie?.title}
						</h1>

						<p className="text-lg text-gray-300 mb-8 line-clamp-3 max-w-xl text-shadow-sm">
							{currentMovie?.overview}
						</p>

						<div className="flex flex-wrap items-center gap-4">
							<Button
								variant="primary"
								icon={Play}
								onClick={() => onPlay && onPlay(currentMovie)}
								className="py-3 px-8 text-lg"
							>
								Ver Ahora
							</Button>

							<Button
								variant="secondary"
								icon={Info}
								onClick={() => onInfo && onInfo(currentMovie)}
								className="py-3 px-8 text-lg"
							>
								Más Info
							</Button>
						</div>
					</motion.div>
				</AnimatePresence>

				<div className="flex gap-2 mt-8 z-20 relative">
					{movies.map((_, idx) => (
						<button
							key={idx}
							onClick={() => setCurrentIndex(idx)}
							className={`h-1.5 rounded-full transition-all duration-300 ${
								idx === currentIndex ? "w-8 bg-cyan-500" : "w-2 bg-gray-600 hover:bg-gray-400"
							}`}
							aria-label={`Ir a diapositiva ${idx + 1}`}
						/>
					))}
				</div>
			</div>
		</header>
	)
}
