import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react"; 'react'
import {useProductStore} from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];


const CreateProductForm = () => {

    const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
	});

 	const {createProduct, loading} =useProductStore();

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
		} catch {
			console.log("error creating a product");
		}
	};

    const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};

			reader.readAsDataURL(file); // base64
		}
	};

    return (
    <motion.div
        className='bg-[#0f0f0f] rounded-lg p-8 mb-8 max-w-xl mx-auto border border-[#D4AF37]/20'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
    >
        <h2 className='text-2xl font-semibold mb-6 text-[#D4AF37]'>Create New Product</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>

            {/* PRODUCT NAME */}
<div>
    <label htmlFor='name' className='block text-sm font-medium text-[#C9A46C]'>
        Product Name
    </label>
    <input
        type='text'
        id='name'
        name='name'
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        className='mt-1 block w-full bg-[#1a1a1a] border border-[#3a3a3a]
                   rounded-md shadow-sm placeholder-gray-500 text-gray-200 
                   focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] py-2 px-3'
        required
    />
</div>

{/* DESCRIPTION */}
<div>
    <label htmlFor='description' className='block text-sm font-medium text-[#C9A46C]'>
        Description
    </label>
    <textarea
        id='description'
        name='description'
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        rows='3'
        className='mt-1 block w-full bg-[#1a1a1a] border border-[#3a3a3a]
                   rounded-md shadow-sm placeholder-gray-500 text-gray-200 
                   focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] py-2 px-3'
        required
    />
</div>

{/* PRICE */}
<div>
    <label htmlFor='price' className='block text-sm font-medium text-[#C9A46C]'>
        Price
    </label>
    <input
        type='number'
        id='price'
        name='price'
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        step='1'
        className='mt-1 block w-full bg-[#1a1a1a] border border-[#3a3a3a]
                   rounded-md shadow-sm placeholder-gray-500 text-gray-200 
                   focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] py-2 px-3'
        required
    />
</div>

{/* CATEGORY */}
<div>
    <label htmlFor='category' className='block text-sm font-medium text-[#C9A46C]'>
        Category
    </label>
    <select
        id='category'
        name='category'
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        className='mt-1 block w-full bg-[#1a1a1a] border border-[#3a3a3a]
                   rounded-md shadow-sm text-gray-200 
                   focus:outline-none focus:ring-[#D4AF37] focus:border-[#D4AF37] py-2 px-3'
        required
    >
        <option value='' className='text-gray-700'>Select a category</option>
        {categories.map((category) => (
            <option key={category} value={category} className='text-gray-800'>
                {category}
            </option>
        ))}
    </select>
</div>

{/* IMAGE UPLOAD */}
<div className='mt-1 flex items-center'>
    <input
        type='file'
        id='image'
        className='sr-only'
        accept='image/*'
        onChange={handleImageChange}
    />
    <label
        htmlFor='image'
        className='cursor-pointer bg-[#1a1a1a] border border-[#3a3a3a] py-2 px-3
                   rounded-md shadow-sm text-sm font-medium text-gray-200 
                   hover:bg-[#2a2a2a] focus:outline-none 
                   focus:ring-[#D4AF37] focus:border-[#D4AF37]'
    >
        <Upload className='h-5 w-5 inline-block mr-2 text-[#C9A46C]' />
        Upload Image
    </label>

    {newProduct.image && (
        <span className='ml-3 text-sm text-[#C9A46C]'>Image uploaded</span>
    )}
</div>


            {/* Submit button */}
            <button
                type='submit'
                className='w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium
                text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50'
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader className='mr-2 h-5 w-5 animate-spin' />
                        Loading...
                    </>
                ) : (
                    <>
                        <PlusCircle className='mr-2 h-5 w-5' />
                        Create Product
                    </>
                )}
            </button>

        </form>
    </motion.div>
);

}

export default CreateProductForm