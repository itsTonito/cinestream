import { Lock, Mail, User } from "lucide-react"
import { Input } from "../../components/common/Input"
import { Button } from "../../components/common/Button"
import { NavLink } from "react-router"
import { useState } from "react"

export const AuthForm = ({ type, onLogin }) => {
	const isLogin = type === "login"

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	})
	const [isLoading, setIsLoading] = useState(false)

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setIsLoading(true)

		setTimeout(() => {
			onLogin(formData)
			setIsLoading(false)
		}, 1000)
	}

	return (
		<div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl ring-1 ring-white/5">
			<h2 className="text-2xl font-bold text-white mb-6">{isLogin ? "Bienvenido de nuevo" : "Crear Cuenta"}</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				{!isLogin && (
					<Input
						type="text"
						name="name"
						placeholder="Nombre completo"
						icon={User}
						value={formData.name}
						onChange={handleChange}
						required
					/>
				)}
				<Input
					type="email"
					name="email"
					placeholder="Correo electrónico"
					icon={Mail}
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<Input
					type="password"
					name="password"
					placeholder="Contraseña"
					icon={Lock}
					value={formData.password}
					onChange={handleChange}
					required
				/>

				<Button variant="primary" fullWidth type="submit" className="mt-6" disabled={isLoading}>
					{isLoading ? (
						<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
					) : isLogin ? (
						"Iniciar Sesión"
					) : (
						"Registrarse"
					)}
				</Button>
			</form>

			<div className="mt-6 text-center text-sm text-gray-400">
				{isLogin ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
				<NavLink
					to={isLogin ? "/Registrarse" : "/iniciar-sesion"}
					className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
				>
					{isLogin ? "Regístrate" : "Inicia Sesión"}
				</NavLink>
			</div>
		</div>
	)
}
