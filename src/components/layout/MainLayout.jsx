import { Outlet } from "react-router"
import { Sidebar } from "./Sidebar"

export const MainLayout = () => {
	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
			<div className="flex flex-col md:flex-row min-h-screen">
				<Sidebar />

				<main className="flex-1 w-full md:pl-24 pb-24 md:pb-0 relative overflow-x-hidden">
					<div className="container mx-auto px-4 py-6 md:px-8 md:py-8 max-w-7xl animate-fade-in">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	)
}
