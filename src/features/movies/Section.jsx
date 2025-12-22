import { ChevronRight } from "lucide-react"
import { MovieCard } from "./MovieCard"

export const Section = ({ title, movies, color = "bg-white", shadow = "", onMovieClick }) => {
	if (!movies || movies.length === 0) return null

	return (
		<section>
			<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-white/90 group cursor-pointer">
				<span className={`w-1 h-8 ${color} rounded-full ${shadow}`}></span>
				{title}
				<ChevronRight
					className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all"
					size={20}
				/>
			</h2>

			<div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-hide px-2">
				{movies.map((movie, idx) => (
					// Usamos un wrapper para el click handler si MovieCard no lo propaga
					<div key={movie.id} onClick={() => onMovieClick && onMovieClick(movie)}>
						<MovieCard movie={movie} index={idx} />
					</div>
				))}
			</div>
		</section>
	)
}
