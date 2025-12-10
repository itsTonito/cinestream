import { create } from "zustand"
import { persist } from "zustand/middleware"

/*
  STORE GLOBAL (useAppStore)
  --------------------------
  Aquí guardamos los datos que toda la aplicación necesita compartir
  Usamos 'zustand' porque es muy fácil de usar
  Usamos 'persist' para que los datos no se borren al recargar la página (se guardan en localStorage)
*/

export const useAppStore = create(
	persist(
		(set, get) => ({
			// --- ESTADO INICIAL ---
			user: null, // Objeto con datos del usuario o null si no está logueado
			isAuthenticated: false,
			isPremium: false, // Si el usuario pagó la suscripción
			favorites: [], // Lista de IDs de películas favoritas

			// --- ACCIONES (Funciones para modificar el estado) ---

			// Iniciar sesión (simulado)
			login: (userData) =>
				set({
					user: userData,
					isAuthenticated: true,
				}),

			// Cerrar sesión
			logout: () =>
				set({
					user: null,
					isAuthenticated: false,
					isPremium: false,
					favorites: [],
				}),

			// Activar modo Premium
			setPremium: (status) => set({ isPremium: status }),

			// Agregar a favoritos
			addFavorite: (movie) => {
				const { favorites } = get()
				// Evitar duplicados
				if (!favorites.some((fav) => fav.id === movie.id)) {
					set({ favorites: [...favorites, movie] })
				}
			},

			// Eliminar de favoritos
			removeFavorite: (movieId) => {
				const { favorites } = get()
				set({ favorites: favorites.filter((fav) => fav.id !== movieId) })
			},

			// Verificar si es favorito
			isFavorite: (movieId) => {
				return get().favorites.some((fav) => fav.id === movieId)
			},
		}),
		{
			name: "cinestream-storage", // Nombre para el localStorage
		}
	)
)
