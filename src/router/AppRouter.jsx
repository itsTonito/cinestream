import { createBrowserRouter, RouterProvider } from "react-router"
import { HomePage } from "../pages/HomePage"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { PricingPage } from "../pages/PricingPage"
import { ProfilePage } from "../pages/ProfilePage"
import { FavoritesPage } from "../pages/FavoritesPage"

export const AppRouter = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <HomePage />,
		},
		{
			path: "/iniciar-sesion",
			element: <LoginPage />,
		},
		{
			path: "/registrarse",
			element: <RegisterPage />,
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
	])

	return <RouterProvider router={router} />
}
