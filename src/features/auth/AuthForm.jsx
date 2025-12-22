import { Lock, Mail, User } from "lucide-react"
import { Input } from "../../components/common/Input"
import { Button } from "../../components/common/Button"
import { NavLink } from "react-router"

export const AuthForm = ({ type, onLogin }) => {
	const isLogin = type === "login"

	return (
		<div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl ring-1 ring-white/5">
			<h2 className="text-2xl font-bold text-white mb-6">{isLogin ? "Bienvenido de nuevo" : "Crear Cuenta"}</h2>

			<div className="space-y-4">
				{!isLogin && <Input type="text" placeholder="Nombre completo" icon={User} />}
				<Input type="email" placeholder="Correo electrónico" icon={Mail} />
				<Input type="password" placeholder="Contraseña" icon={Lock} />

				<Button variant="primary" fullWidth onClick={onLogin} className="mt-6">
					{isLogin ? "Iniciar Sesión" : "Registrarse"}
				</Button>
			</div>

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
