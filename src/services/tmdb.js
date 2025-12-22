import axios from "axios"

const TMDB_TOKEN =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTNmN2JmZDliOWQyN2FlMTY3YjdiMjg0MWYzMmUxZSIsIm5iZiI6MTc2NTMxOTY5Ny4wMTEwMDAyLCJzdWIiOiI2OTM4YTQxMTgxNWU1Y2ZkNzQzY2ViZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bbY_jGmOGgEqttqX1d0iRBKnE5TyO-NasorvvmJTydU"
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

const api = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		Authorization: `Bearer ${TMDB_TOKEN}`,
		"Content-Type": "application/json",
	},
	params: {
		language: "es-ES",
	},
})

const fetchFromTMDB = async (endpoint, extraParams = {}) => {

	try {
		const response = await api.get(endpoint, {
			params: extraParams,
		})
		return response.data
	} catch (error) {
		console.error("❌ Error en petición a TMDB:", error)
		return { results: [] }
	}
}

export const tmdbService = {
	getTrending: () => fetchFromTMDB("/trending/movie/week"),
	getPopular: () => fetchFromTMDB("/movie/popular"),
	getTopRated: () => fetchFromTMDB("/movie/top_rated"),

	getMovieDetails: (id) => fetchFromTMDB(`/movie/${id}`),
	getMovieVideos: (id) => fetchFromTMDB(`/movie/${id}/videos`),

	searchMovies: (query) => fetchFromTMDB("/search/movie", { query }),

	getImageOriginal: (path) => (path ? `${IMAGE_BASE_URL}/original${path}` : null),
	getImageW500: (path) => (path ? `${IMAGE_BASE_URL}/w500${path}` : null),
}
