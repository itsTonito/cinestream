import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { HeroBanner } from "../features/movies/HeroBanner"
import { useAppStore } from "../store/useAppStore"
import { Section } from "../features/movies/Section"
import { useNavigate } from "react-router"
import { MovieDetailModal } from "../features/movies/MovieDetailModal"

export const HomePage = () => {
	const navigate = useNavigate()
	const { movies, fetchAllMovies, isPremium, toggleFavorite, isFavorite } = useAppStore()
	const { trending, popular, topRated, loading } = movies
	const [selectedMovie, setSelectedMovie] = useState(null)

	useEffect(() => {
		if (trending.length === 0) {
			fetchAllMovies()
		}
	}, [fetchAllMovies, trending.length])

	const handlePlayMovie = (movie) => {
		if (selectedMovie) setSelectedMovie(null)

		if (movie.premium && !isPremium) {
			setSelectedMovie(movie)
		} else {
			console.log("Reproduciendo película:", movie.title)
			navigate(`/watch/${movie.id}`)
		}
	}

	const handleInfo = (movie) => {
		setSelectedMovie(movie)
	}

	const handleUnlock = () => {
		setSelectedMovie(null)
		navigate("/suscribirse")
	}

	if (loading && trending.length === 0) {
		return (
			<div className="h-screen flex items-center justify-center bg-[#0a0a0a]">
				<Loader className="animate-spin text-cyan-500" size={48} />
			</div>
		)
	}

	const heroMovies = trending.slice(0, 5)

	return (
		<div className="pb-20 bg-[#0a0a0a] min-h-screen">
			<HeroBanner movies={heroMovies} onPlay={handlePlayMovie} onInfo={handleInfo} />

			<div className="relative z-20 -mt-12 px-4 md:px-12 space-y-12">
				<Section
					title="Tendencias"
					movies={trending}
					color="bg-violet-600"
					shadow="shadow-[0_0_10px_rgba(124,58,237,0.5)]"
					onMovieClick={handleInfo}
				/>

				<Section
					title="Populares en Cinestream"
					movies={popular}
					color="bg-cyan-500"
					shadow="shadow-[0_0_10px_rgba(6,182,212,0.5)]"
					onMovieClick={handleInfo}
				/>

				<Section
					title="Aclamadas por la Crítica"
					movies={topRated}
					color="bg-emerald-500"
					shadow="shadow-[0_0_10px_rgba(16,185,129,0.5)]"
					onMovieClick={handleInfo}
				/>
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
