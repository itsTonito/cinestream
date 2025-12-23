import { ChevronRight } from "lucide-react"
import { MovieCard } from "./MovieCard"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export const Section = ({ title, movies, color = "bg-white", shadow = "", onMovieClick }) => {
	const carouselRef = useRef(null)
	const [width, setWidth] = useState(0)
	const isDragging = useRef(false)

	useEffect(() => {
		if (carouselRef.current) {
			setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
		}
	}, [movies])

	if (!movies || movies.length === 0) return null

	const handleCardClick = (movie) => {
		if (isDragging.current) {
			return
		}
		if (onMovieClick) onMovieClick(movie)
	}

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

			<div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden pb-8 pt-2 px-2">
				<motion.div
					drag="x"
					dragConstraints={{ right: 0, left: -width }}
					className="flex gap-6 w-fit"
					whileTap={{ cursor: "grabbing" }}
					onDragStart={() => {
						isDragging.current = true
					}}
					onDragEnd={() => {
						setTimeout(() => {
							isDragging.current = false
						}, 150)
					}}
				>
					{movies.map((movie, idx) => (
						<div
							key={movie.id}
							onClickCapture={() => {
								if (isDragging.current) return
							}}
							onClick={() => handleCardClick(movie)}
						>
							<MovieCard movie={movie} index={idx} />
						</div>
					))}
				</motion.div>
			</div>
		</section>
	)
}
