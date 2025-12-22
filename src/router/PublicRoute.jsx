import { Navigate } from 'react-router'
import { useAppStore } from "../store/useAppStore"

export const PublicRoute = ({ children }) => {
	const isAuthenticated = useAppStore((state) => state.isAuthenticated)
	if (isAuthenticated) {
		return <Navigate to="/" replace />
	}
	return children
}
