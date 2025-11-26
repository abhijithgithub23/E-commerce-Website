
import { razorpay } from "../lib/razorpay.js";
import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// 🧾 Create Razorpay Order
export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty product array" });
        }

        let totalAmount = 0;
        products.forEach((product) => {
            totalAmount += product.price * product.quantity;
        });

        // 🪙 Apply coupon discount if valid
        let coupon = null;
        if (couponCode) {
            coupon = await Coupon.findOne({
                code: couponCode,
                userId: req.user._id,
                isActive: true,
            });
            if (coupon) {
                totalAmount -= Math.floor(
                    (totalAmount * coupon.discountPercentage) / 100
                );
            }
        }

        // 💰 Convert to paisa for Razorpay (truncate decimals, no rounding)
        const amountInPaise = Math.floor(totalAmount * 100);

        // 🧾 Create Razorpay order
        const options = {
            amount: amountInPaise,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
            notes: {
                userId: req.user._id.toString(),
                couponCode: couponCode || "",
                // ✅ FIX: Save the products array as a JSON string
                products: JSON.stringify(products), 
            },
        };

        const order = await razorpay.orders.create(options);

        // 🎁 Generate new coupon if eligible
        if (totalAmount >= 20000) {
            await createNewCoupon(req.user._id);
        }

        res.status(200).json({
            id: order.id,
            amount: order.amount,
            currency: order.currency,
            totalAmount: Math.floor(totalAmount), // clean integer
            key: process.env.RAZORPAY_KEY_ID, // for frontend checkout

            userName: req.user.name, 
            userEmail: req.user.email,
            // Use contact if it exists on the User model; otherwise, use a known, valid placeholder.
            userContact: req.user.contact || '9999999999',
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating Razorpay order",
            error: error.message,
        });
    }
};

// ✅ Verify payment after success
// ✅ Verify payment after success
export const checkoutSuccess = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        // 1. Verify Signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid signature" });
        }

        // 2. Fetch the Order Details from Razorpay to get the Notes
        const orderData = await razorpay.orders.fetch(razorpay_order_id);
        
        // Debugging: See exactly what we got back

        const { userId, couponCode, products } = orderData.notes;

        // 3. Disable Coupon if used
        if (couponCode) {
            await Coupon.findOneAndUpdate(
                { code: couponCode, userId: userId },
                { isActive: false }
            );
        }

        // 4. Parse and Map Products
        // We saved them as: { id, quantity, price }
        // Order Model usually expects: { product: ObjectId, quantity, price }
        const productsArray = JSON.parse(products);
        
        const formattedProducts = productsArray.map((p) => ({
            product: p.id || p.product || p._id, // Handle 'id' (from simplification) or '_id'
            quantity: p.quantity,
            price: p.price,
        }));


        // 5. Create the Order
        const newOrder = new Order({
            user: userId,
            products: formattedProducts,
            totalAmount: orderData.amount / 100, // Convert paise back to rupees
            stripeSessionId: razorpay_payment_id, // Storing payment ID here
        });

        await newOrder.save();

        res.status(200).json({
            success: true,
            message: "Payment verified, order created successfully.",
            orderId: newOrder._id,
        });
    } catch (error) {
        // Send the actual error message to frontend for better debugging
        res.status(500).json({
            message: "Error verifying Razorpay payment",
            error: error.message,
        });
    }
};
// 🎟 Helper function — create new coupon
async function createNewCoupon(userId) {
    await Coupon.findOneAndDelete({ userId });

    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId,
    });

    await newCoupon.save();
    return newCoupon;
}