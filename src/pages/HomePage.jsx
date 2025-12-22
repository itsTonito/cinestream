import {
	Home,
	Search,
	Heart,
	Settings,
	Play,
	Info,
	X,
	ChevronRight,
	Check,
	Lock,
	Volume2,
	Maximize,
	SkipBack,
	SkipForward,
	Menu,
	CreditCard,
	Star,
	Pause,
	User,
	Mail,
	Shield,
	Smartphone,
	LogOut,
	Edit2,
	Eye,
	EyeOff,
	ArrowRight,
	Monitor,
	Tablet,
	Tv,
} from "lucide-react"
import { useState } from "react"
import { Button } from "../components/common/Button"
import { MovieCard } from "../features/movies/MovieCard"

const REAL_MOVIES = [
	{
		id: 1,
		title: "Dune: Parte Dos",
		year: 2024,
		rating: "9.5",
		duration: "2h 46m",
		premium: true,
		image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=800&q=80",
		backdrop: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=1600&q=80",
		synopsis:
			"Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.",
	},
	{
		id: 2,
		title: "Oppenheimer",
		year: 2023,
		rating: "9.3",
		duration: "3h 00m",
		premium: true,
		image: "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=800&q=80",
		backdrop: "https://images.unsplash.com/photo-1478144592103-25e218a04891?auto=format&fit=crop&w=1600&q=80",
		synopsis:
			"La historia del científico estadounidense J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.",
	},
	{
		id: 3,
		title: "Blade Runner 2049",
		year: 2017,
		rating: "8.9",
		duration: "2h 44m",
		premium: false,
		image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
		backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80",
		synopsis:
			"Un joven blade runner descubre un secreto largamente oculto que podría sumir lo que queda de la sociedad en el caos.",
	},
	{
		id: 4,
		title: "Interstellar",
		year: 2014,
		rating: "9.1",
		duration: "2h 49m",
		premium: false,
		image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
		backdrop: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80",
		synopsis:
			"Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.",
	},
	{
		id: 5,
		title: "The Batman",
		year: 2022,
		rating: "8.5",
		duration: "2h 56m",
		premium: true,
		// Nueva imagen fiable: Dark City / Rain vibe
		image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
		backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&w=1600&q=80",
		synopsis:
			"Cuando un asesino serial sádico comienza a asesinar a figuras políticas clave en Gotham, Batman se ve obligado a investigar la corrupción oculta de la ciudad.",
	},
	{
		id: 6,
		title: "Cyberpunk: Edgerunners",
		year: 2022,
		rating: "9.0",
		duration: "1 temporada",
		premium: false,
		image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=800&q=80",
		backdrop: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=1600&q=80",
		synopsis:
			"En una distopía plagada de corrupción e implantes cibernéticos, un chico talentoso e imprudente intenta convertirse en un mercenario al margen de la ley.",
	},
	{
		id: 7,
		title: "Tron: Legacy",
		year: 2010,
		rating: "7.8",
		duration: "2h 05m",
		premium: false,
		image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
		backdrop: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
		synopsis: "El hijo de un diseñador virtual busca a su padre y termina dentro del mundo digital que él diseñó.",
	},
]

export const HomePage = () => {
	const [selectedMovie, setSelectedMovie] = useState(null)
	const [isPremium, setIsPremium] = useState(false)
	const [playerMovie, setPlayerMovie] = useState(null)

	const handlePlayMovie = (movie) => {
		if (movie.premium && !isPremium) {
			setSelectedMovie(movie)
		} else {
			setSelectedMovie(null)
			setPlayerMovie(movie)
		}
	}
	return (
		<div className="pb-20">
			<header className="relative w-full min-h-[85vh] flex items-end pb-24">
				<div className="absolute inset-0">
					<img src={REAL_MOVIES[3].backdrop} alt="Hero" className="w-full h-full object-cover" />
					<div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
					<div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent" />
				</div>
				<div className="relative z-10 p-12 max-w-3xl animate-fade-in-up mt-20">
					<span className="inline-block px-3 py-1 mb-4 rounded border border-cyan-500/50 text-cyan-400 text-xs font-bold tracking-widest uppercase bg-cyan-950/30 backdrop-blur-md">
						#1 En Tendencias
					</span>
					<h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight drop-shadow-2xl text-white">
						{REAL_MOVIES[3].title}
					</h1>
					<p className="text-lg text-gray-300 mb-8 line-clamp-3 max-w-xl text-shadow-sm">
						{REAL_MOVIES[3].synopsis}
					</p>
					<div className="flex flex-wrap items-center gap-4">
						<Button variant="primary" icon={Play} onClick={() => handlePlayMovie(REAL_MOVIES[3])}>
							Ver Ahora
						</Button>
						<Button variant="secondary" icon={Info} onClick={() => setSelectedMovie(REAL_MOVIES[3])}>
							Más Info
						</Button>
					</div>
				</div>
			</header>

			<div className="relative z-20 -mt-12 px-8 md:px-12 space-y-12">
				<section>
					<h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white/90">
						<span className="w-1 h-6 bg-violet-600 rounded-full shadow-[0_0_10px_rgba(124,58,237,0.5)]"></span>
						Tendencias
					</h2>
					<div className="flex gap-6 overflow-x-auto pb-8 pt-2 hide-scrollbar">
						{REAL_MOVIES.map((movie) => (
							<MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
						))}
					</div>
				</section>
				<section>
					<h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-white/90">
						<span className="w-1 h-6 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>
						Sci-Fi & Futurismo
					</h2>
					<div className="flex gap-6 overflow-x-auto pb-8 pt-2 hide-scrollbar">
						{[...REAL_MOVIES].reverse().map((movie) => (
							<MovieCard key={`new-${movie.id}`} movie={movie} onClick={setSelectedMovie} />
						))}
					</div>
				</section>
			</div>
		</div>
	)
}
