import React, { useState, useRef, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import { tmdbService } from "../../services/tmdb"

export const VideoPlayer = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const videoRef = useRef(null)
	const containerRef = useRef(null)

	const [isPlaying, setIsPlaying] = useState(true)
	const [isMuted, setIsMuted] = useState(false)
	const [progress, setProgress] = useState(0)
	const [showControls, setShowControls] = useState(true)
	const [movieTitle, setMovieTitle] = useState("Cargando...")
	const controlsTimeoutRef = useRef(null)

	useEffect(() => {
		const fetchMovieData = async () => {
			if (!id) return
			try {
				const details = await tmdbService.getMovieDetails(id)
				if (details && details.title) {
					setMovieTitle(details.title)
				} else {
					setMovieTitle("Película desconocida")
				}
			} catch (error) {
				console.error("Error fetching movie details:", error)
				setMovieTitle("CineStream Player")
			}
		}

		fetchMovieData()
	}, [id])

	useEffect(() => {
		const handleMouseMove = () => {
			setShowControls(true)
			if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
			controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000)
		}

		window.addEventListener("mousemove", handleMouseMove)
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
			if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
		}
	}, [])

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) videoRef.current.pause()
			else videoRef.current.play()
			setIsPlaying(!isPlaying)
		}
	}

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted
			setIsMuted(!isMuted)
		}
	}

	const handleTimeUpdate = () => {
		if (videoRef.current) {
			const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
			setProgress(progress)
		}
	}

	const handleSeek = (e) => {
		if (videoRef.current) {
			const rect = e.currentTarget.getBoundingClientRect()
			const x = e.clientX - rect.left
			const seekTime = (x / rect.width) * videoRef.current.duration
			videoRef.current.currentTime = seekTime
		}
	}

	const handleFullscreen = async () => {
		try {
			if (!document.fullscreenElement) {
				if (containerRef.current && containerRef.current.requestFullscreen) {
					await containerRef.current.requestFullscreen()
				} else if (containerRef.current && containerRef.current.webkitRequestFullscreen) {
					await containerRef.current.webkitRequestFullscreen()
				}
			} else {
				if (document.exitFullscreen) {
					await document.exitFullscreen()
				} else if (document.webkitExitFullscreen) {
					await document.webkitExitFullscreen()
				}
			}
		} catch (err) {
			console.error("Error fullscreen:", err)
		}
	}

	return (
		<div className="fixed inset-0 bg-black z-100 flex items-center justify-center overflow-hidden">
			<video
				ref={videoRef}
				className="w-full h-full object-contain"
				src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
				poster="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059"
				onTimeUpdate={handleTimeUpdate}
				onClick={togglePlay}
				autoPlay
			></video>

			<div
				className={`absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/60 transition-opacity duration-300 ${
					showControls ? "opacity-100" : "opacity-0 cursor-none"
				}`}
			>
				<div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors bg-black/40 px-4 py-2 rounded-full backdrop-blur-md"
					>
						<ArrowLeft className="w-6 h-6" />
						<span className="font-medium text-lg">Volver</span>
					</button>
					<h2 className="text-white/80 font-medium bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
						{movieTitle}
					</h2>
				</div>

				{!isPlaying && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 p-6 rounded-full backdrop-blur-sm pointer-events-none animate-pulse">
						<Play className="w-12 h-12 text-white fill-white" />
					</div>
				)}

				<div className="absolute bottom-0 left-0 right-0 p-8 space-y-4 z-20">
					<div
						className="w-full h-1.5 bg-gray-600/50 rounded-full cursor-pointer group relative py-2"
						onClick={handleSeek}
					>
						<div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-gray-600/50 rounded-full pointer-events-none" />

						<div
							className="h-1.5 bg-violet-500 rounded-full relative top-1/2 -translate-y-1/2 pointer-events-none"
							style={{ width: `${progress}%` }}
						>
							<div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform shadow-lg"></div>
						</div>
					</div>

					<div className="flex justify-between items-center">
						<div className="flex items-center gap-6">
							<button onClick={togglePlay} className="text-white hover:text-violet-500 transition-colors">
								{isPlaying ? (
									<Pause className="w-8 h-8 fill-current" />
								) : (
									<Play className="w-8 h-8 fill-current" />
								)}
							</button>

							<div className="flex items-center gap-2 group">
								<button
									onClick={toggleMute}
									className="text-white hover:text-gray-300 transition-colors"
								>
									{isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
								</button>
								<input
									type="range"
									min="0"
									max="1"
									step="0.1"
									className="w-0 group-hover:w-20 transition-all duration-300 h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer accent-violet-500"
									onChange={(e) => {
										if (videoRef.current) videoRef.current.volume = e.target.value
									}}
								/>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<span className="text-gray-300 text-sm font-medium border border-gray-500 px-1.5 rounded">
								HD
							</span>
							<button
								onClick={handleFullscreen}
								className="text-white hover:text-violet-500 transition-colors"
							>
								<Maximize className="w-6 h-6" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
