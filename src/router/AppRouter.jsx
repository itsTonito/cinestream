import { createBrowserRouter, Navigate, RouterProvider } from "react-router"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { PricingPage } from "../pages/PricingPage"
import { ProfilePage } from "../pages/ProfilePage"
import { FavoritesPage } from "../pages/FavoritesPage"
import { MainLayout } from "../components/layout/MainLayout"
import { ProtectedRoute } from "./ProtectedRoute"
import { VideoPlayer } from "../features/player/VideoPlayer"
import { PublicRoute } from "./PublicRoute"
import { AuthLayout } from "../components/layout/AuthLayout"

const router = createBrowserRouter([
	{
		path: "/watch/:id",
		element: (
			<ProtectedRoute>
				<VideoPlayer />
			</ProtectedRoute>
		),
	},

	{
		element: (
			<PublicRoute>
				<AuthLayout />
			</PublicRoute>
		),
		children: [
			{
				path: "/iniciar-sesion",
				element: <LoginPage />,
			},
			{
				path: "/registrarse",
				element: <RegisterPage />,
			},
		],
	},

	{
		element: (
			<ProtectedRoute>
				<MainLayout />
			</ProtectedRoute>
		),
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/suscribirse",
				element: <PricingPage />,
			},
			{
				path: "/perfil",
				element: <ProfilePage />,
			},
			{
				path: "/favoritos",
				element: <FavoritesPage />,
			},
		],
	},

	{
		path: "*",
		element: <Navigate to="/" replace />,
	},
])

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
