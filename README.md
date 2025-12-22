🎬 CineStream - Guía para Desarrolladores

Bienvenido al equipo de desarrollo de CineStream. Esta guía te ayudará a conectar tus componentes y páginas con la
infraestructura que hemos preparado (Router, Store, Servicios y Hooks).

🛠️ Instalación Requerida

Antes de empezar, asegúrense de instalar las dependencias necesarias para que el código base funcione:

npm install zustand axios lucide-react clsx tailwind-merge

🧠 1. La Store (Estado Global)

Usamos Zustand para manejar los datos del usuario, suscripción y favoritos. No uses useState para datos que necesitan
compartirse entre páginas.

Ubicación: src/store/useAppStore.js

¿Cómo usarlo en tu componente?

import { useAppStore } from '../store/useAppStore';

const MiComponente = () => { // Extraer datos y funciones const { user, isPremium, login, addFavorite } = useAppStore();

if (isPremium) { return <div>¡Eres VIP, {user?.name}!</div>; }

return <button onClick={() => addFavorite(movie)}>Favorito</button>; };

Datos disponibles:

user: Datos del usuario (null si no está logueado).

isAuthenticated: Booleano (true/false).

isPremium: Booleano (true/false).

favorites: Array de películas favoritas.

🌐 2. Servicios (API)

No hagan fetch directamente en los componentes. Usen los servicios preparados.

Ubicación: src/services/

Ejemplo con Películas (tmdb.js)

Configuren su API KEY en src/services/api.js primero.

import { movieService } from '../services/api';

// Dentro de un useEffect o función const cargarPeliculas = async () => { const peliculas = await
movieService.getTrending(); console.log(peliculas); };

Ejemplo con Auth (auth.js)

Para el Login o Registro simulado.

import { authService } from '../services/auth';

const handleLogin = async () => { try { const user = await authService.login("demo@cinestream.com", "123456"); //
¡IMPORTANTE! Guardar en la store después de obtener respuesta useAppStore.getState().login(user); } catch (error) {
alert("Error de credenciales"); } };

🪝 3. Custom Hooks

Para facilitar la vida, usen el hook useFetch para cargar datos sin escribir tantos useEffect.

Ubicación: src/hooks/useFetch.js

Ejemplo de Uso

import { useFetch } from '../hooks/useFetch'; import { movieService } from '../services/api';

const HomePage = () => { // Carga automática y manejo de loading const { data: movies, loading } =
useFetch(movieService.getTrending);

if (loading) return <div>Cargando cine...</div>;

return ( <div> {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)} </div> ); };

🚦 4. Enrutamiento

El router ya está configurado en src/router/AppRouter.jsx. Todas las páginas están envueltas automáticamente en el
MainLayout (que tiene el Navbar/Sidebar).

Para crear enlaces: No usen <a>, usen <Link> o <NavLink> de react-router.

import { Link } from 'react-router';

<Link to={`/movie/${id}`}>Ver Detalles</Link>

Rutas Protegidas: Si intentas entrar a /perfil o /favoritos sin estar logueado, el sistema te redirigirá automáticamente
al Login.

🎨 5. Estilos

Usamos Tailwind CSS.

El modo oscuro está activado por defecto.

Colores principales configurados en CSS variables.
