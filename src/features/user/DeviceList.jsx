import { Smartphone, Tv, Monitor, Tablet } from "lucide-react"

export const DeviceList = () => {
	return (
		<div className="bg-white/5 p-6 rounded-2xl border border-white/10">
			<h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
				<Smartphone size={18} className="text-cyan-400" />
				Dispositivos Activos
			</h3>
			<ul className="space-y-4">
				<li className="flex items-center gap-3 text-sm">
					<div className="p-2 bg-white/10 rounded-lg">
						<Tv size={16} className="text-gray-300" />
					</div>
					<div className="flex-1">
						<p className="text-white">Smart TV (Sala)</p>
						<span className="text-green-400 text-xs flex items-center gap-1">
							<span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Reproduciendo
						</span>
					</div>
				</li>
				<li className="flex items-center gap-3 text-sm">
					<div className="p-2 bg-white/10 rounded-lg">
						<Monitor size={16} className="text-gray-300" />
					</div>
					<div className="flex-1">
						<p className="text-white">MacBook Pro</p>
						<span className="text-gray-500 text-xs">Hace 2h</span>
					</div>
				</li>
				<li className="flex items-center gap-3 text-sm">
					<div className="p-2 bg-white/10 rounded-lg">
						<Tablet size={16} className="text-gray-300" />
					</div>
					<div className="flex-1">
						<p className="text-white">iPad Air</p>
						<span className="text-gray-500 text-xs">Ayer</span>
					</div>
				</li>
			</ul>
			<button className="mt-6 text-xs text-red-400 hover:text-red-300 w-full text-left transition-colors cursor-pointer">
				Cerrar sesión en todos los dispositivos
			</button>
		</div>
	)
}
