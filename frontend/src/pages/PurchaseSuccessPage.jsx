import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import Confetti from "react-confetti"; // Keep Confetti for celebration!

const PurchaseSuccessPage = () => {
    // 1. We don't need 'isProcessing' or 'error' state since verification is done in the backend
    const { clearCart } = useCartStore(); 
    
    // We can use a simple state to control the confetti duration
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // 2. Clear the cart immediately upon component mount.
        clearCart(); 

        // Stop confetti after 5 seconds for performance
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer); // Cleanup function
    }, [clearCart]);

    // 3. Directly return the success UI, no conditional loading or error checking needed here

    return (
  <div className="h-screen flex items-center justify-center px-4">
    {showConfetti && (
      <Confetti
        width={window.innerWidth} 
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />
    )}

    <div className="max-w-md w-full bg-[#0f0f0f] border-[#D4AF37]/20 rounded-lg shadow-xl overflow-hidden relative z-10">
      <div className="p-6 sm:p-8">
        <div className="flex justify-center">
          <CheckCircle className="text-yellow-400 w-16 h-16 mb-4" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-yellow-400 mb-2">
          Purchase Successful!
        </h1>

        <p className="text-gray-300 text-center mb-2">
          Thank you for your order. We're processing it now.
        </p>

        <p className="text-yellow-400 text-center text-sm mb-6">
          Check your email for order details and updates.
        </p>

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Order number</span>
            <span className="text-sm font-semibold text-yellow-400">#12345</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Estimated delivery</span>
            <span className="text-sm font-semibold text-yellow-400">3–5 business days</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4
            rounded-lg transition duration-300 flex items-center justify-center"
          >
            <HandHeart className="mr-2" size={18} />
            Thanks for trusting us!
          </button>

          <Link
            to={"/"}
            className="w-full bg-gray-800 hover:bg-gray-700 text-yellow-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center"
          >
            Continue Shopping
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </div>
    </div>
  </div>
);
};
export default PurchaseSuccessPage;