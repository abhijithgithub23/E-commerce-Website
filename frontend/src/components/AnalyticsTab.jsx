import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
	<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
			<AnalyticsCard
				title='Total Users'
				value={analyticsData.users.toLocaleString()}
				icon={Users}
			/>
			<AnalyticsCard
				title='Total Products'
				value={analyticsData.products.toLocaleString()}
				icon={Package}
			/>
			<AnalyticsCard
				title='Total Sales'
				value={analyticsData.totalSales.toLocaleString()}
				icon={ShoppingCart}
			/>
			<AnalyticsCard
				title='Total Revenue'
				value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
				icon={DollarSign}
			/>
		</div>

		<motion.div
			className='bg-[#0f0f0f] rounded-lg p-6 shadow-lg border border-[#D4AF37]/20'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.25 }}
		>
			<ResponsiveContainer width='100%' height={400}>
				<LineChart data={dailySalesData}>
					<CartesianGrid stroke='#D4AF37' strokeDasharray='3 3' opacity={0.15} />
					<XAxis dataKey='name' stroke='#D4AF37' />
					<YAxis yAxisId='left' stroke='#D4AF37' />
					<YAxis yAxisId='right' orientation='right' stroke='#D4AF37' />
					<Tooltip contentStyle={{ background: '#111', border: '1px solid #D4AF37' }} />
					<Legend wrapperStyle={{ color: '#D4AF37' }} />

					{/* Gold line */}
					<Line
						yAxisId='left'
						type='monotone'
						dataKey='sales'
						stroke='#D4AF37'
						strokeWidth={2}
						activeDot={{ r: 8 }}
						name='Sales'
					/>

					{/* White line */}
					<Line
						yAxisId='right'
						type='monotone'
						dataKey='revenue'
						stroke='#ffffff'
						strokeWidth={2}
						activeDot={{ r: 8 }}
						name='Revenue'
					/>
				</LineChart>
			</ResponsiveContainer>
		</motion.div>
	</div>
);
};

export default AnalyticsTab;


// ----------------------
// ANALYTICS CARD UPDATED
// ----------------------

const AnalyticsCard = ({ title, value, icon: Icon }) => (
	<motion.div
		className='relative bg-[#0f0f0f] border border-[#D4AF37]/20 rounded-lg p-6 shadow-lg overflow-hidden'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex justify-between items-center z-10 relative'>
			<div>
				<p className='text-[#D4AF37] text-sm mb-1 font-semibold'>{title}</p>
				<h3 className='text-white text-3xl font-bold'>{value}</h3>
			</div>
		</div>

		{/* Soft gold gradient overlay */}
		<div className='absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent pointer-events-none' />

		{/* Faded background icon */}
		<div className='absolute -bottom-4 -right-4 text-[#D4AF37]/15'>
			<Icon className='h-32 w-32' />
		</div>
	</motion.div>
);
