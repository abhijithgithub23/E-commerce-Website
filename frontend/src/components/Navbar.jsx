import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (	
	<header className='fixed top-0 left-0 w-full 
		bg-[#0a0a0a]/90 
		backdrop-blur-md 
		shadow-lg 
		z-40 
		transition-all duration-300 
		border-b border-[#D4AF37]/40'>

		<div className='container mx-auto px-4 py-3'>
			<div className='flex flex-wrap justify-between items-center'>

				{/* Logo */}
				<Link 
					to='/' 
					className='text-2xl font-bold text-[#D4AF37] items-center space-x-2 flex'
				>
					E-Commerce
				</Link>

				{/* NAV LINKS */}
				<nav className='flex flex-wrap items-center gap-4'>

					{/* Home */}
					<Link
						to={"/"}
						className='text-gray-300 hover:text-[#D4AF37] transition duration-300 ease-in-out'
					>
						Home
					</Link>

					{/* Cart */}
					{user && (
						<Link
							to={"/cart"}
							className='relative group text-gray-300 hover:text-[#D4AF37] transition duration-300 ease-in-out'
						>
							<ShoppingCart 
								className='inline-block mr-1 group-hover:text-[#D4AF37]' 
								size={20} 
							/>
							<span className='hidden sm:inline'>Cart</span>

							{/* Cart badge */}
							{cart.length > 0 && (
								<span
									className='absolute -top-2 -left-2 bg-[#D4AF37] text-black rounded-full px-2 py-0.5 
											   text-xs group-hover:bg-[#C9A46C] transition duration-300 ease-in-out'
								>
									{cart.length}
								</span>
							)}
						</Link>
					)}

					{/* Admin Dashboard */}
					{isAdmin && (
						<Link
							className='bg-[#C9A46C] hover:bg-[#D4AF37] text-black px-3 py-1 rounded-md font-medium
									   transition duration-300 ease-in-out flex items-center'
							to={"/secret-dashboard"}
						>
							<Lock className='inline-block mr-1' size={18} />
							<span className='hidden sm:inline'>Dashboard</span>
						</Link>
					)}

					{/* Auth */}
					{user ? (
						<button
							className='bg-[#1a1a1a] hover:bg-[#2a2a2a] text-[#D4AF37] py-2 px-4 
										rounded-md flex items-center transition duration-300 ease-in-out'
							onClick={logout}
						>
							<LogOut size={18} />
							<span className='hidden sm:inline ml-2'>Log Out</span>
						</button>
					) : (
						<>
							{/* Signup */}
							<Link
								to={"/signup"}
								className='bg-[#0a0a0a] text-[#D4AF37] border border-[#D4AF37]/40 
										   hover:border-[#D4AF37]/80 hover:text-[#D4AF37] 
										   py-2 px-4 rounded-md flex items-center 
										   transition duration-300 ease-in-out'
							>
								<UserPlus className='mr-2' size={18} />
								Sign Up
							</Link>

							{/* Login */}
							<Link
								to={"/login"}
								className='bg-[#0a0a0a] text-[#D4AF37] border border-[#D4AF37]/40 
										   hover:border-[#D4AF37]/80 hover:text-[#D4AF37] 
										   py-2 px-4 rounded-md flex items-center 
										   transition duration-300 ease-in-out'
							>
								<LogIn className='mr-2' size={18} />
								Login
							</Link>
						</>
					)}

				</nav>
			</div>
		</div>
	</header>
);

};
export default Navbar;