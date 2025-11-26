import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react"; 
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, loading} = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
		login(email, password);
	};

	return (
	<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
		
		{/* Heading */}
		<motion.div
			className='sm:mx-auto sm:w-full sm:max-w-md'
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='mt-6 text-center text-3xl font-extrabold text-[#D4AF37]'>
				Login to your account
			</h2>
		</motion.div>

		{/* Card */}
		<motion.div
			className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
		>
			<div className='bg-[#0f0f0f] py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-[#D4AF37]/20'>
				
				<form onSubmit={handleSubmit} className='space-y-6'>
					
					{/* Email */}
					<div>
						<label htmlFor='email' className='block text-sm font-medium text-[#C9A46C]'>
							Email address
						</label>

						<div className='mt-1 relative rounded-md shadow-sm'>
							<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
								<Mail className='h-5 w-5 text-[#B08A2E]' aria-hidden='true' />
							</div>

							<input
								id='email'
								type='email'
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className='block w-full px-3 py-2 pl-10 bg-[#1a1a1a] border border-[#3a3a3a] 
										rounded-md shadow-sm placeholder-gray-500 text-gray-200
										focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37]
										sm:text-sm'
								placeholder='you@example.com'
							/>
						</div>
					</div>

					{/* Password */}
					<div>
						<label htmlFor='password' className='block text-sm font-medium text-[#C9A46C]'>
							Password
						</label>

						<div className='mt-1 relative rounded-md shadow-sm'>
							<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
								<Lock className='h-5 w-5 text-[#B08A2E]' aria-hidden='true' />
							</div>

							<input
								id='password'
								type='password'
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='block w-full px-3 py-2 pl-10 bg-[#1a1a1a] border border-[#3a3a3a] 
										rounded-md shadow-sm placeholder-gray-500 text-gray-200
										focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37]
										sm:text-sm'
								placeholder='••••••••'
							/>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full flex justify-center py-2 px-4 rounded-md shadow text-sm font-medium 
								   text-black bg-[#D4AF37]
								   hover:bg-[#C9A46C] focus:outline-none 
								   focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]
								   transition duration-150 ease-in-out disabled:opacity-50'
						disabled={loading}
					>
						{loading ? (
							<>
								<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
								Loading...
							</>
						) : (
							<>
								<LogIn className='mr-2 h-5 w-5' aria-hidden='true' />
								Login
							</>
						)}
					</button>
				</form>

				{/* Footer */}
				<p className='mt-8 text-center text-sm text-gray-400'>
					Not a member?{" "}
					<Link 
						to='/signup' 
						className='font-medium text-[#D4AF37] hover:text-[#C9A46C]'
					>
						Sign up now <ArrowRight className='inline h-4 w-4' />
					</Link>
				</p>
			</div>
		</motion.div>
	</div>
);

};
export default LoginPage;