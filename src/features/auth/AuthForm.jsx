import React, { useState } from "react"
import { Lock, Mail, User, AlertCircle } from "lucide-react"
import { Input } from "../../components/common/Input"
import { Button } from "../../components/common/Button"
import { NavLink } from "react-router"

export const AuthForm = ({ type, onLogin }) => {
	const isLogin = type === "login"

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	})
	const [errors, setErrors] = useState({})
	const [isLoading, setIsLoading] = useState(false)
	const [generalError, setGeneralError] = useState("")

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))

		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }))
		}
		if (generalError) setGeneralError("")
	}

	const validate = () => {
		const newErrors = {}
		if (!isLogin && !formData.name.trim()) {
			newErrors.name = "El nombre es obligatorio"
		}
		if (!formData.email.trim()) {
			newErrors.email = "El email es obligatorio"
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email inválido"
		}
		if (!formData.password) {
			newErrors.password = "La contraseña es obligatoria"
		} else if (formData.password.length < 6) {
			newErrors.password = "Mínimo 6 caracteres"
		}
		return newErrors
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const validationErrors = validate()

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			return
		}

		setIsLoading(true)

		setTimeout(() => {
			if (formData.email === "error@test.com") {
				setGeneralError("Credenciales inválidas")
				setIsLoading(false)
				return
			}

			onLogin(formData)
			setIsLoading(false)
		}, 1000)
	}

	return (
		<div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl ring-1 ring-white/5">
			<h2 className="text-2xl font-bold text-white mb-6">{isLogin ? "Bienvenido de nuevo" : "Crear Cuenta"}</h2>

			{generalError && (
				<div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200 text-sm">
					<AlertCircle size={16} />
					{generalError}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				{!isLogin && (
					<div className="space-y-1">
						<Input
							type="text"
							name="name"
							placeholder="Nombre completo"
							icon={User}
							value={formData.name}
							onChange={handleChange}
							error={errors.name}
						/>
						{errors.name && <p className="text-xs text-red-400 ml-1">{errors.name}</p>}
					</div>
				)}

				<div className="space-y-1">
					<Input
						type="email"
						name="email"
						placeholder="Correo electrónico"
						icon={Mail}
						value={formData.email}
						onChange={handleChange}
						error={errors.email}
					/>
					{errors.email && <p className="text-xs text-red-400 ml-1">{errors.email}</p>}
				</div>

				<div className="space-y-1">
					<Input
						type="password"
						name="password"
						placeholder="Contraseña"
						icon={Lock}
						value={formData.password}
						onChange={handleChange}
						error={errors.password}
					/>
					{errors.password && <p className="text-xs text-red-400 ml-1">{errors.password}</p>}
				</div>

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
					to={isLogin ? "/registrarse" : "/iniciar-sesion"}
					className="text-violet-400 hover:text-violet-300 font-semibold transition-colors"
				>
					{isLogin ? "Regístrate" : "Inicia Sesión"}
				</NavLink>
			</div>
		</div>
	)
}
