export const Input = ({ type = "text", placeholder, icon: Icon }) => (
	<div className="relative group">
		{Icon && (
			<Icon
				size={20}
				className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-violet-400 transition-colors"
			/>
		)}
		<input
			type={type}
			placeholder={placeholder}
			className={`w-full bg-black/40 border border-white/10 rounded-xl py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all ${
				Icon ? "pl-12" : "pl-4"
			} pr-4`}
		/>
	</div>
)
