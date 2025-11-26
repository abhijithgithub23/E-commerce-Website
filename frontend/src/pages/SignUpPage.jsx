import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
	<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 '>
		<motion.div
			className='sm:mx-auto sm:w-full sm:max-w-md '
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='mt-6 text-center text-3xl font-extrabold text-[#D4AF37]'>
				Create your account
			</h2>
		</motion.div>

		<motion.div
			className='mt-8 sm:mx-auto sm:w-full sm:max-w-md border-[#D4AF37]/20'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, delay: 0.2 }}
		>
			<div className='bg-[#0f0f0f] py-8 px-4 shadow sm:rounded-lg sm:px-10 border-[#D4AF37]/20'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					
					{/* NAME */}
	<div>
	<label htmlFor='name' className='block text-sm font-medium text-[#C9A46C]'>
		Full name
	</label>
	<div className='mt-1 relative rounded-md shadow-sm'>
		<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
			<User className='h-5 w-5 text-[#B08A2E]' aria-hidden='true' />
		</div>
		<input
			id='name'
			type='text'
			required
			value={formData.name}
			onChange={(e) => setFormData({ ...formData, name: e.target.value })}
			className='block w-full px-3 py-2 pl-10 bg-[#1a1a1a] border border-[#3a3a3a]
					   rounded-md shadow-sm placeholder-gray-500 text-gray-200
					   focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm'
			placeholder='John Doe'
		/>
	</div>
</div>

{/* EMAIL */}
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
			value={formData.email}
			onChange={(e) => setFormData({ ...formData, email: e.target.value })}
			className='block w-full px-3 py-2 pl-10 bg-[#1a1a1a] border border-[#3a3a3a]
					   rounded-md shadow-sm placeholder-gray-500 text-gray-200
					   focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm'
			placeholder='you@example.com'
		/>
	</div>
</div>

{/* PASSWORD */}
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
			value={formData.password}
			onChange={(e) => setFormData({ ...formData, password: e.target.value })}
			className='block w-full px-3 py-2 pl-10 bg-[#1a1a1a] border border-[#3a3a3a]
					   rounded-md shadow-sm placeholder-gray-500 text-gray-200
					   focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm'
			placeholder='••••••••'
		/>
	</div>
</div>

{/* CONFIRM PASSWORD */}
<div>
	<label htmlFor='confirmPassword' className='block text-sm font-medium text-[#C9A46C]'>
		Confirm Password
	</label>
	<div className='mt-1 relative rounded-md shadow-sm'>
		<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
			<Lock className='h-5 w-5 text-[#B08A2E]' aria-hidden='true' />
		</div>
		<input
			id='confirmPassword'
			type='password'
			required
			value={formData.confirmPassword}
			onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
			className='block w-full px-3 py-2 pl-10 bg-[#1a1a1a] border border-[#3a3a3a]
					   rounded-md shadow-sm placeholder-gray-500 text-gray-200
					   focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm'
			placeholder='••••••••'
		/>
	</div>
</div>


					{/* BUTTON */}
					<button
						type='submit'
						className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500
							hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2
							focus:ring-yellow-500 transition duration-150 ease-in-out disabled:opacity-50'
						disabled={loading}
					>
						{loading ? (
							<>
								<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
								Loading...
							</>
						) : (
							<>
								<UserPlus className='mr-2 h-5 w-5' aria-hidden='true' />
								Sign up
							</>
						)}
					</button>
				</form>

				<p className='mt-8 text-center text-sm text-gray-400'>
					Already have an account?{' '}
					<Link to='/login' className='font-medium text-yellow-500 hover:text-yellow-400'>
						Login here <ArrowRight className='inline h-4 w-4' />
					</Link>
				</p>
			</div>
		</motion.div>
	</div>
);

};
export default SignUpPage;