export const Badge = ({ children, variant = "default" }) => {
	const styles = {
		default: "border-gray-600 text-gray-400",
		premium: "border-amber-500/50 text-amber-400 bg-amber-900/20",
		hd: "border-cyan-500/50 text-cyan-400 bg-cyan-900/20",
	}
	return (
		<span className={`px-2 py-0.5 border rounded text-xs font-medium ${styles[variant] || styles.default}`}>
			{children}
		</span>
	)
}
