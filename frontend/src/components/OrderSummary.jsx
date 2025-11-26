
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import axios from "../lib/axios";

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  // ✅ Razorpay checkout flow
  const handlePayment = async () => {
    try {
      console.log("🟢 Initiating Razorpay order creation...");

      // 1️⃣ Create Razorpay order on backend (fixed route)
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });

      // ➡️ EDITED: Destructure the new user data fields from the backend response
      const { 
          id: order_id, 
          amount, 
          currency, 
          key, 
          userName, // User data from backend
          userEmail, // User data from backend
          userContact // User data from backend
      } = res.data;
      console.log("✅ Backend response:", res.data);

      // 2️⃣ Load Razorpay SDK if not already loaded
      if (typeof window.Razorpay === "undefined") {
        console.log("⏳ Loading Razorpay script...");
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => {
            console.log("✅ Razorpay script loaded");
            setTimeout(resolve, 300); // small delay to ensure init
          };
          script.onerror = reject;
          document.body.appendChild(script);
        });
      } else {
        console.log("✅ Razorpay already loaded");
      }

      // 3️⃣ Razorpay options setup
      const options = {
        key,
        amount, // in paise
        currency,
        name: "E-Commerce Store",
        description: "Order Payment",
        order_id: order_id,
        handler: async function (response) {
          console.log("🎉 Payment success:", response);
          try {
            await axios.post("/payments/checkout-success", response);
            // alert("✅ Payment Successful!");
            window.location.href = "/purchase-success";
          } catch (err) {
            console.error("❌ Error saving payment:", err);
            // alert("Payment verified, but order saving failed. Contact support.");
          }
        },
        // ➡️ EDITED: Use the dynamic data for prefill
        prefill: {
          name: userName || "Test User",       // Use real name, fall back to dummy
          email: userEmail || "test@example.com",   // Use real email, fall back to dummy
          contact: userContact || "9999999999", // Use real contact, fall back to dummy
        },
        theme: { color: "#10b981" },
      };

      console.log("🧾 Razorpay options:", options);

      const rzp = new window.Razorpay(options);

      // 4️⃣ Handle payment failure
      rzp.on("payment.failed", (response) => {
        console.error("❌ Payment failed:", response);
        // alert("Payment failed. Please try again.");
      });

      // 5️⃣ Open Razorpay Checkout
      rzp.open();
    } catch (error) {
      console.error("🚨 Payment initiation failed:", error);
      // alert("Payment initialization failed. Check console.");
    }
  };

  return (
  <motion.div
    className="space-y-4 rounded-lg border bg-[#0f0f0f] border-[#D4AF37]/20 p-4 shadow-sm sm:p-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-xl font-semibold text-[#D4AF37]">Order Summary</p>

    <div className="space-y-4">
      <div className="space-y-2">

        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base font-normal text-gray-300">Original price</dt>
          <dd className="text-base font-medium text-white">₹{formattedSubtotal}</dd>
        </dl>

        {savings > 0 && (
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">Savings</dt>
            <dd className="text-base font-medium text-[#D4AF37]">-₹{formattedSavings}</dd>
          </dl>
        )}

        {coupon && isCouponApplied && (
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              Coupon ({coupon.code})
            </dt>
            <dd className="text-base font-medium text-[#D4AF37]">
              -{coupon.discountPercentage}%
            </dd>
          </dl>
        )}

        <dl className="flex items-center justify-between gap-4 border-t border-[#D4AF37]/20 pt-2">
          <dt className="text-base font-bold text-white">Total</dt>
          <dd className="text-base font-bold text-[#D4AF37]">₹{formattedTotal}</dd>
        </dl>

      </div>

      {/* GOLD CHECKOUT BUTTON */}
      <motion.button
        className="flex w-full items-center justify-center rounded-lg 
        bg-[#D4AF37] px-5 py-2.5 text-sm font-medium text-black 
        hover:bg-[#c79c2e] focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePayment}
      >
        Proceed to Checkout
      </motion.button>

      {/* LINK */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-normal text-gray-400">or</span>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#D4AF37] underline 
          hover:text-[#c79c2e] hover:no-underline"
        >
          Continue Shopping
          <MoveRight size={16} />
        </Link>
      </div>
    </div>
  </motion.div>
);
};

export default OrderSummary;