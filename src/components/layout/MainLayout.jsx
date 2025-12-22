import { Outlet } from "react-router"
import { Sidebar } from "./Sidebar"

export const MainLayout = () => {
	return (
		<div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500/30">
			<div className="flex flex-col md:flex-row min-h-screen">
				<Sidebar />

				<main className="flex-1 w-full md:pl-[78px] pb-24 md:pb-0 relative overflow-x-hidden">
					<div className="container min-w-full animate-fade-in">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	)
}
