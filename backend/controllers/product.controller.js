import Product from "../models/product.model.js";
import {redis} from "../lib/reddis.js";
import cloudinary from "../lib/cloudinary.js";


export const getAllProducts=async(req, res)=>{
    try {
        const products=await Product.find({});
        res.json({products});

    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const getFeaturedlProducts=async(req, res)=>{
    try {
        let featuredProducts=await redis.get("featured_products"); //fetching featured products from redis
        if(featuredProducts){
            return res.json(JSON.parse(featuredProducts));
        }

        featuredProducts=await Product.find({isFeatured: true}).lean(); //if redis doesnt have then fetch from mongodb
        if(!featuredProducts){
            return res.status(404).json({message: error.message});
        }

        await redis.set("featured_products", JSON.stringify(featuredProducts));

        res.json(featuredProducts);


    } catch (error) {
        console.log("Error in getFeaturedlProducts controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const createProduct=async(req, res)=>{
    try {
        const { name, description, price, image, category }= req.body;

        let cloudinaryResponse=null;

        if(image){
            cloudinaryResponse=await cloudinary.uploader.upload(image, {folder:"e-commerce"});
        }

        const product=await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url:"",
            category,
        });

        res.status(201).json(product);

    } catch (error) {
        console.log("Error in createProduct controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const deleteProduct = async (req, res)=>{
     try {
        const product= await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not Found"});
        }

        if(product.image){
            const publicId=product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`e-commerce/${publicId}`);
                console.log("Deleted Image from Cloudinary");
            } catch (error) {
                console.log("error deleting image from cloudinary", error);
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json("Product deleted succesfully from db");

     } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({message: error.message});
     }
}

export const getRecommendedProducts = async(req, res)=>{
    try {
        const products=await Product.aggregate([
            {
                $sample:{size:3}
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    description:1,
                    image:1,
                    price:1
                }
            }
        ]);
        res.json(products);

    } catch (error) {
        console.log("Error in getRecommendedProducts controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const getProductByCategory = async (req, res)=>{
    const {category}=req.params;

    try {
        const products= await Product.find({category}); 
        res.json(products);

    } catch (error) {
        console.log("Error in getProductByCategory controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const toggleFeaturedProduct = async (req, res)=>{

    try {
        const product= await Product.findById(req.params.id);
        if(product){
            product.isFeatured=!product.isFeatured;
            const updatedProduct=await product.save();

            await updateFeaturedProductCache();

            res.json(updatedProduct);
        }else{
            res.status(404).json({message: "Product not Found"});
        }
    } catch ( error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({message: error.message});
    }
}

async function updateFeaturedProductCache() {
    try {
        const featuredProducts= await Product.find({isFeatured:true}).lean();
        await redis.set("featured_products", JSON.stringify(featuredProducts));
    } catch (error) {
        console.log("Error in updateFeaturedProductCache function", error.message);
        res.status(500).json({message: error.message});
    }
}

