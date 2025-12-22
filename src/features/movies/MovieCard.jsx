import { Star } from "lucide-react"
import { tmdbService } from "../../services/tmdb"

export const MovieCard = ({ movie, onClick }) => {
	const imageUrl = movie.poster_path
		? tmdbService.getImageW500(movie.poster_path)
		: "https://via.placeholder.com/200x300?text=No+Image"

	const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"

	const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR"

	return (
		<div
			onClick={() => onClick && onClick(movie)}
			className="group relative shrink-0 w-[200px] cursor-pointer transition-all duration-500 hover:scale-105 z-0 hover:z-10"
		>
			<div className="aspect-2/3 rounded-2xl overflow-hidden shadow-2xl bg-gray-900 relative ring-1 ring-white/5 group-hover:ring-violet-500/50 transition-all">
				<img
					src={imageUrl}
					alt={movie.title}
					loading="lazy"
					className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
				/>

				<div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

				{movie.premium && (
					<div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-amber-500/50 flex items-center gap-1 z-20">
						<Star size={12} className="text-amber-400 fill-amber-400" />
						<span className="text-[10px] font-bold text-amber-100 uppercase tracking-wider">Premium</span>
					</div>
				)}

				<div className="absolute bottom-0 left-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-full bg-linear-to-t from-black/90 to-transparent">
					<h3 className="font-bold text-white text-lg leading-tight mb-1 truncate">{movie.title}</h3>
					<div className="flex items-center justify-between text-xs text-gray-300">
						<span className="flex items-center gap-1">
							<Star size={10} className="text-yellow-400 fill-yellow-400" /> {rating}
						</span>
						<span>{year}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
