import axios from "axios"

const API_KEY =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTNmN2JmZDliOWQyN2FlMTY3YjdiMjg0MWYzMmUxZSIsIm5iZiI6MTc2NTMxOTY5Ny4wMTEwMDAyLCJzdWIiOiI2OTM4YTQxMTgxNWU1Y2ZkNzQzY2ViZWQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.bbY_jGmOGgEqttqX1d0iRBKnE5TyO-NasorvvmJTydU"
const BASE_URL = "https://api.themoviedb.org/3"

export const tmdbApi = axios.create({
	baseURL: BASE_URL,
	params: {
		api_key: API_KEY,
		language: "es-MX",
	},
})

export const movieService = {
	// Obtener tendencias
	getTrending: async () => {
		const response = await tmdbApi.get("/trending/movie/week")
		return response.data.results
	},

	// Obtener detalles de una película
	getMovieDetails: async (id) => {
		const response = await tmdbApi.get(`/movie/${id}`)
		return response.data
	},

	// Obtener por categoría (ej: Acción, Comedia)
	getByGenre: async (genreId) => {
		const response = await tmdbApi.get("/discover/movie", {
			params: { with_genres: genreId },
		})
		return response.data.results
	},
}
