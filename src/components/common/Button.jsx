export const Button = ({
	children,
	variant = "primary",
	className = "",
	onClick,
	icon: Icon,
	disabled = false,
	fullWidth = false,
}) => {
	const baseStyle =
		"flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"

	const variants = {
		primary:
			"bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-900/50 hover:shadow-violet-900/70",
		secondary:
			"bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 hover:border-white/30",
		premium:
			"bg-gradient-to-r from-amber-400 to-orange-500 text-black hover:brightness-110 shadow-lg shadow-orange-500/20",
		outline: "border-2 border-violet-500 text-violet-400 hover:bg-violet-500/10",
		danger: "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20",
		glass: "bg-black/30 backdrop-blur-md border border-white/10 text-white hover:bg-white/10",
	}

	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyle} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
		>
			{Icon && <Icon size={20} />}
			{children}
		</button>
	)
}
