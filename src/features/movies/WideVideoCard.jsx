import { useMemo } from "react"
import { tmdbService } from "../../services/tmdb"
import { Play } from 'lucide-react'

export const WideVideoCard = ({ movie }) => {
	const backdropUrl = movie.backdrop_path
		? tmdbService.getImageW500(movie.backdrop_path)
		: movie.image || "https://via.placeholder.com/300x169?text=No+Image"

	const progress = useMemo(() => {
		const seed = movie.id ? Number(movie.id) : 0
		return ((seed * 17) % 51) + 30
	}, [movie.id])

	return (
		<div className="relative aspect-video rounded-xl overflow-hidden group cursor-pointer border border-white/10 bg-gray-900">
			<img
				src={backdropUrl}
				alt={movie.title}
				className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500"
			/>

			<div className="absolute inset-0 flex items-center justify-center">
				<div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
					<Play size={16} className="text-white ml-0.5 fill-white" />
				</div>
			</div>

			<div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
				<div className="h-full bg-violet-500" style={{ width: `${progress}%` }} />
			</div>

			<div className="absolute bottom-2 left-2 text-xs font-medium text-white shadow-black drop-shadow-md truncate max-w-[90%]">
				{movie.title}
			</div>
		</div>
	)
}
