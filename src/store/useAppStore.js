import { create } from "zustand"
import { persist } from "zustand/middleware"
import { tmdbService } from "../services/tmdb"

export const useAppStore = create(
	persist(
		(set, get) => ({
			user: null,
			isAuthenticated: true,
			isPremium: false,
			favorites: [],

			movies: {
				trending: [],
				popular: [],
				topRated: [],
				loading: false,
				error: null,
			},

			login: (userData) => set({ user: userData, isAuthenticated: true }),
			logout: () =>
				set({
					user: null,
					isAuthenticated: false,
					isPremium: false,
					favorites: [],
				}),
			setPremium: (status) => set({ isPremium: status }),

			fetchAllMovies: async () => {
				set((state) => ({ movies: { ...state.movies, loading: true, error: null } }))
				try {
					const [trending, popular, topRated] = await Promise.all([
						tmdbService.getTrending(),
						tmdbService.getPopular(),
						tmdbService.getTopRated(),
					])

					const processMovies = (movies) =>
						movies.map((m) => ({
							...m,
							premium: Math.random() < 0.3,
						}))

					set((state) => ({
						movies: {
							...state.movies,
							trending: processMovies(trending.results || []),
							popular: processMovies(popular.results || []),
							topRated: processMovies(topRated.results || []),
							loading: false,
						},
					}))
				} catch (error) {
					console.error("Error fetching movies:", error)
					set((state) => ({
						movies: { ...state.movies, loading: false, error: "Error al cargar películas" },
					}))
				}
			},

			addFavorite: (movie) => {
				const { favorites } = get()
				if (!favorites.some((fav) => fav.id === movie.id)) {
					set({ favorites: [...favorites, movie] })
				}
			},
			removeFavorite: (movieId) => {
				const { favorites } = get()
				set({ favorites: favorites.filter((fav) => fav.id !== movieId) })
			},
			toggleFavorite: (movie) => {
				const { favorites } = get()
				const exists = favorites.some((f) => f.id === movie.id)
				if (exists) {
					set({ favorites: favorites.filter((f) => f.id !== movie.id) })
				} else {
					set({ favorites: [...favorites, movie] })
				}
			},
			isFavorite: (movieId) => {
				return get().favorites.some((fav) => fav.id === movieId)
			},
		}),
		{
			name: "cinestream-storage",
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				isPremium: state.isPremium,
				favorites: state.favorites,
			}),
		}
	)
)
