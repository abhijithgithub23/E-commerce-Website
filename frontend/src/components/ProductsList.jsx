import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	console.log("products", products);

	return (
	<motion.div
		className='bg-[#0f0f0f] shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto border border-[#D4AF37]/20'
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8 }}
	>
		<table className='min-w-full divide-y divide-[#D4AF37]/20'>
			<thead className='bg-black'>
				<tr>
					{["Product", "Price", "Category", "Featured", "Actions"].map((title) => (
						<th
							key={title}
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-[#D4AF37] uppercase tracking-wider'
						>
							{title}
						</th>
					))}
				</tr>
			</thead>

			<tbody className='bg-[#111] divide-y divide-[#D4AF37]/10'>
				{products?.map((product) => (
					<tr
						key={product._id}
						className='hover:bg-[#1a1a1a] hover:shadow-[0_0_10px_#D4AF37]/20 transition-all'
					>
						<td className='px-6 py-4 whitespace-nowrap'>
							<div className='flex items-center'>
								<div className='flex-shrink-0 h-10 w-10'>
									<img
										className='h-10 w-10 rounded-full object-cover'
										src={product.image}
										alt={product.name}
									/>
								</div>
								<div className='ml-4'>
									<div className='text-sm font-medium text-white'>{product.name}</div>
								</div>
							</div>
						</td>

						<td className='px-6 py-4 whitespace-nowrap'>
							<div className='text-sm text-[#D4AF37]/90'>₹{product.price.toFixed(2)}</div>
						</td>

						<td className='px-6 py-4 whitespace-nowrap'>
							<div className='text-sm text-gray-300'>{product.category}</div>
						</td>

						<td className='px-6 py-4 whitespace-nowrap'>
							<button
								onClick={() => toggleFeaturedProduct(product._id)}
								className={`p-1 rounded-full transition-colors duration-200 ${
									product.isFeatured
										? "bg-[#D4AF37] text-black hover:bg-[#c7a030]"
										: "bg-[#333] text-gray-300 hover:bg-[#444]"
								}`}
							>
								<Star className='h-5 w-5' />
							</button>
						</td>

						<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
							<button
								onClick={() => deleteProduct(product._id)}
								className='text-red-400 hover:text-red-300'
							>
								<Trash className='h-5 w-5' />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</motion.div>
);

};
export default ProductsList;