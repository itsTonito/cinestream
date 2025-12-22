import { Navigate } from "react-router"
import { useAppStore } from "../store/useAppStore"

export const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useAppStore((state) => state.isAuthenticated)
	console.log(isAuthenticated)
	if (!isAuthenticated) {
		return <Navigate to="/iniciar-sesion" replace />
	}
	return children
}
