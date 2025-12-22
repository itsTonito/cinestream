import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router"
import { useAppStore } from "../store/useAppStore"
import { useState } from "react"
import { AnimatePresence } from "motion/react"
import { PricingCard } from "../features/suscription/PricingCard"
import { PaymentModal } from "../features/suscription/PaymentModal"
import { WelcomePremiumModal } from "../features/suscription/WelcomePremiumModal"

export const PricingPage = () => {
	const navigate = useNavigate()
	const { setPremium, isPremium } = useAppStore()

	const [selectedPlan, setSelectedPlan] = useState(null)
	const [showSuccess, setShowSuccess] = useState(false)

	const handleSelectPlan = (plan) => {
		setSelectedPlan(plan)
	}

	const handlePaymentSuccess = () => {
		setSelectedPlan(null)
		setPremium(true)
		setShowSuccess(true)
	}

	const handleFinish = () => {
		setShowSuccess(false)
		navigate("/")
	}

	return (
		<div className="min-h-screen w-full flex flex-col items-center p-8 md:p-12 relative overflow-hidden animate-fade-in pt-20 bg-[#0a0a0a]">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
			<div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />

			<div className="relative z-10 max-w-7xl w-full">
				<div className="flex justify-between items-center mb-12">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
					>
						<ChevronRight
							className="rotate-180 group-hover:-translate-x-1 transition-transform"
							size={20}
						/>
						Cancelar
					</button>
				</div>

				<div className="text-center mb-16">
					<span className="inline-block py-1 px-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-semibold mb-4">
						Planes Flexibles
					</span>
					<h2 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
						Elige tu experiencia{" "}
						<span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-cyan-400">
							Cinematográfica
						</span>
					</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto">
						Desbloquea la máxima calidad y acceso exclusivo sin compromisos a largo plazo.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
					<PricingCard
						plan="Básico"
						price="Gratis"
						description="Perfecto para explorar nuestro catálogo limitado."
						features={["Resolución HD (720p)", "Con Anuncios", "1 Dispositivo"]}
						variant="secondary"
						buttonText={!isPremium ? "Plan Actual" : "Seleccionar"}
						onSelect={() => (!isPremium ? {} : console.log("Downgrade to Basic"))}
					/>

					<PricingCard
						plan="Premium"
						price="$14.99"
						description="La experiencia definitiva para cinéfilos exigentes."
						features={[
							"4K Ultra HD + HDR10",
							"Sonido Dolby Atmos",
							"Sin Anuncios",
							"4 Dispositivos Simultáneos",
							"Descargas Ilimitadas",
						]}
						variant="primary"
						isPopular={true}
						buttonText={isPremium ? "Plan Actual" : "Comenzar Prueba Gratis"}
						onSelect={() => (isPremium ? {} : handleSelectPlan({ name: "Premium", price: "$14.99" }))}
					/>

					<PricingCard
						plan="Estándar"
						price="$9.99"
						description="Calidad sólida para el entretenimiento diario."
						features={["Full HD (1080p)", "Sin Anuncios", "2 Dispositivos"]}
						variant="outline"
						buttonText="Seleccionar"
						onSelect={() => handleSelectPlan({ name: "Estándar", price: "$9.99" })}
					/>
				</div>
			</div>

			<AnimatePresence>
				{selectedPlan && (
					<PaymentModal
						plan={selectedPlan}
						onClose={() => setSelectedPlan(null)}
						onConfirm={handlePaymentSuccess}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>{showSuccess && <WelcomePremiumModal onClose={handleFinish} />}</AnimatePresence>
		</div>
	)
}
