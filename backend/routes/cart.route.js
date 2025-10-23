import express from "express";
import { 
    getCartProducts,
    addToCart, 
    removeAllFromCart ,
    updateQuantity,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router=express.Router();

router.get("/", protectRoute, getCartProducts); //View cart items
router.post("/", protectRoute, addToCart);   // Add items to cart
router.delete("/", protectRoute, removeAllFromCart);  //Delete items from cart
router.post("/:id", protectRoute, updateQuantity);  //Update quantity of a specific cart item


export default router;  