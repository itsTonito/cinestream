import { X, CreditCard, Lock, Calendar, User } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../../components/common/Button"
import { Input } from "../../components/common/Input"

export const PaymentModal = ({ plan, onClose, onConfirm }) => {
	const [isFlipped, setIsFlipped] = useState(false)
	const [cardNumber, setCardNumber] = useState("")
	const [holder, setHolder] = useState("")
	const [expiry, setExpiry] = useState("")
	const [cvv, setCvv] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const handleConfirm = (e) => {
		e.preventDefault()
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			onConfirm()
		}, 2000)
	}

	const handleCardNumberChange = (e) => {
		const value = e.target.value.replace(/\D/g, "").slice(0, 16)
		setCardNumber(value.replace(/(\d{4})(?=\d)/g, "$1 "))
	}

	return (
		<div className="fixed inset-0 z-60 flex items-center justify-center p-4">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="absolute inset-0 bg-black/80 backdrop-blur-sm"
				onClick={onClose}
			/>

			<motion.div
				initial={{ scale: 0.9, opacity: 0, y: 20 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.9, opacity: 0, y: 20 }}
				className="relative w-full max-w-[428px] bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10"
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
				>
					<X size={24} />
				</button>

				<div className="p-8">
					<h2 className="text-2xl font-bold text-white mb-2">Checkout Seguro</h2>
					<p className="text-gray-400 mb-8 text-sm">
						Estás a un paso de obtener <span className="text-violet-400 font-bold">{plan.name}</span>
					</p>

					<div
						className="w-full h-56 perspective-1000 mb-8 mx-auto relative group cursor-pointer"
						onClick={() => setIsFlipped(!isFlipped)}
					>
						<motion.div
							className="w-full h-full relative preserve-3d transition-transform duration-700"
							animate={{ rotateY: isFlipped ? 180 : 0 }}
							style={{ transformStyle: "preserve-3d" }}
						>
							<div className="absolute inset-0 w-full h-full bg-linear-to-br from-violet-600 to-indigo-900 rounded-2xl p-6 shadow-xl backface-hidden flex flex-col justify-between border border-white/10">
								<div className="flex justify-between items-start">
									<div className="w-12 h-8 bg-yellow-400/80 rounded-md flex items-center justify-center">
										<div className="w-8 h-5 border border-black/20 rounded-sm opacity-50"></div>
									</div>
									<span className="text-white font-bold italic text-lg opacity-80">VISA</span>
								</div>

								<div className="space-y-4">
									<p className="text-white text-xl md:text-2xl font-mono tracking-widest drop-shadow-md">
										{cardNumber || "#### #### #### ####"}
									</p>
									<div className="flex justify-between text-xs text-white/70 uppercase tracking-wide">
										<div>
											<span className="block text-[10px]">Titular</span>
											<span className="text-sm font-medium text-white">
												{holder || "NOMBRE APELLIDO"}
											</span>
										</div>
										<div>
											<span className="block text-[10px]">Expira</span>
											<span className="text-sm font-medium text-white">{expiry || "MM/YY"}</span>
										</div>
									</div>
								</div>
							</div>

							<div
								className="absolute inset-0 w-full h-full bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl backface-hidden flex flex-col pt-6 border border-white/10"
								style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
							>
								<div className="w-full h-10 bg-black/80 mb-4" />
								<div className="px-6">
									<div className="bg-white h-8 w-full flex items-center justify-end px-2 mb-2">
										<span className="font-mono text-black font-bold tracking-widest">
											{cvv || "***"}
										</span>
									</div>
									<p className="text-[10px] text-gray-400 text-right">
										Código de seguridad de 3 dígitos
									</p>
								</div>
								<div className="mt-auto p-6 flex items-center justify-between opacity-50">
									<div className="w-8 h-8 rounded-full bg-white/10" />
									<span className="text-xs text-white">Digital Payment</span>
								</div>
							</div>
						</motion.div>
					</div>

					<form onSubmit={handleConfirm} className="space-y-4">
						<Input
							placeholder="Número de Tarjeta"
							icon={CreditCard}
							value={cardNumber}
							onChange={handleCardNumberChange}
							maxLength={19}
							onFocus={() => setIsFlipped(false)}
							required
						/>

						<div className="grid grid-cols-2 gap-4">
							<Input
								placeholder="MM / YY"
								icon={Calendar}
								value={expiry}
								onChange={(e) => {
									let val = e.target.value.replace(/\D/g, "")
									if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2, 4)
									setExpiry(val)
								}}
								maxLength={5}
								onFocus={() => setIsFlipped(false)}
								required
							/>
							<Input
								placeholder="CVV"
								icon={Lock}
								type="password"
								maxLength={3}
								value={cvv}
								onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
								onFocus={() => setIsFlipped(true)}
								onBlur={() => setIsFlipped(false)}
								required
							/>
						</div>

						<Input
							placeholder="Nombre del Titular"
							icon={User}
							value={holder}
							onChange={(e) => setHolder(e.target.value.toUpperCase())}
							onFocus={() => setIsFlipped(false)}
							required
						/>

						<Button
							variant="primary"
							type="submit"
							fullWidth
							className="mt-6 h-12 text-lg"
							disabled={isLoading}
						>
							{isLoading ? (
								<div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
							) : (
								`Pagar ${plan.price}`
							)}
						</Button>

						<p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
							<Lock size={12} /> Transacción encriptada de extremo a extremo
						</p>
					</form>
				</div>
			</motion.div>
		</div>
	)
}
