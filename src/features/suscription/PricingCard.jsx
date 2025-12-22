import { Check } from "lucide-react"
import { Button } from "../../components/common/Button"

export const PricingCard = ({
	plan,
	price,
	period = "/mes",
	description,
	features,
	variant = "secondary",
	buttonText = "Seleccionar",
	isPopular = false,
	onSelect,
}) => {
	const isPremium = variant === "primary"

	if (isPremium) {
		return (
			<div className="relative p-1 rounded-4xl bg-linear-to-b from-violet-500 to-cyan-500 shadow-[0_0_40px_rgba(124,58,237,0.3)] transform md:scale-105 z-10 transition-transform duration-300">
				<div className="bg-[#0f0f12] rounded-[1.9rem] p-8 h-full relative overflow-hidden flex flex-col">
					<div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 blur-3xl" />

					{isPopular && (
						<div className="absolute top-6 right-6">
							<span className="bg-white text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
								Popular
							</span>
						</div>
					)}

					<h3 className="text-xl font-bold text-white mb-2">{plan}</h3>

					<div className="flex items-end gap-1 mb-6">
						<span className="text-5xl font-bold text-white">{price}</span>
						{price !== "Gratis" && <span className="text-gray-400 mb-2">{period}</span>}
					</div>

					<p className="text-sm text-gray-400 mb-8 min-h-[40px]">{description}</p>

					<Button
						variant="primary"
						fullWidth
						className="mb-8 py-4 text-lg shadow-lg shadow-violet-900/40"
						onClick={onSelect}
					>
						{buttonText}
					</Button>

					<ul className="space-y-4">
						{features.map((feature, idx) => (
							<li key={idx} className="flex gap-3 text-sm text-white font-medium">
								<Check size={18} className="text-violet-400" /> {feature}
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	}

	return (
		<div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group flex flex-col h-fit">
			<h3 className="text-xl font-medium text-gray-400 mb-2">{plan}</h3>

			<div className="flex items-end gap-1 mb-6">
				<span className="text-4xl font-bold text-white">{price}</span>
				{price !== "Gratis" && <span className="text-gray-400 mb-1">{period}</span>}
			</div>

			<p className="text-sm text-gray-400 mb-6 min-h-[40px]">{description}</p>

			<Button variant={variant} fullWidth className="mb-8" onClick={onSelect}>
				{buttonText}
			</Button>

			<ul className="space-y-4">
				{features.map((feature, idx) => (
					<li key={idx} className="flex gap-3 text-sm text-gray-300">
						<Check size={18} className="text-white" /> {feature}
					</li>
				))}
			</ul>
		</div>
	)
}
