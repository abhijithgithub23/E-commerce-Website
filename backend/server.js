import express from "express"; //express
const app=express();

import cookieParser from "cookie-parser"; //cookie-parser

import dotenv from "dotenv"; //dotenv
dotenv.config();

import {connectDB} from "./lib/db.js";

import authRoutes from "./routes/auth.route.js"; //autherisation route
import productRoutes from "./routes/product.route.js"; //product route
import cartRoutes from "./routes/cart.route.js"; //product route
import couponRoutes from "./routes/coupon.route.js"; //coupon route
import paymentRoutes from "./routes/payment.route.js"; //payment route
import analyticsRoutes from "./routes/analytics.route.js"; //analytics route

app.use(express.json()); //allows to parse req body

app.use(cookieParser()); //allows to parse cookie 


app.use("/api/auth", authRoutes); //Authorisation routes

app.use("/api/products", productRoutes); //Product routes

app.use("/api/cart", cartRoutes);  // Cart routes 

app.use("/api/coupon", couponRoutes);  // Coupons routes 

app.use("/api/payments", paymentRoutes);  // Payment routes 

app.use("/api/analytics", analyticsRoutes);  // Analytics routes 


const PORT=process.env.PORT || 8000 ;
app.listen(PORT, ()=>{
    console.log("Server Listening on port "+PORT);
    connectDB();
});


  