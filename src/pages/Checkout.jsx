import React from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white border border-[#ede9e3] rounded-2xl p-10 max-w-md w-full text-center">
        
        <div className="w-16 h-16 bg-[#1a1a2e] rounded-full flex items-center justify-center mx-auto mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffd200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
          Order Confirmed
        </span>

        <h1 className="text-xl font-semibold text-[#1a1a2e] mb-2">Your order is on its way!</h1>
        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
          Thank you for shopping with us. All your items have been dispatched successfully.
        </p>

        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-xs text-gray-500">Estimated Delivery</span>
            <span className="text-sm font-medium text-[#1a1a2e]">5–7 business days</span>
          </div>
          <div className="flex justify-between bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-xs text-gray-500">Shipping</span>
            <span className="text-sm font-medium text-[#1a1a2e]">Free</span>
          </div>
          <div className="flex justify-between bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-xs text-gray-500">Status</span>
            <span className="text-sm font-medium text-[#1a1a2e]">Dispatched ✓</span>
          </div>
        </div>

        <hr className="border-[#ede9e3] mb-6" />

        <button 
          onClick={() => navigate('/home')}
          className="w-full bg-[#1a1a2e] text-[#ffd200] font-bold text-sm py-3 rounded-xl hover:opacity-85 transition-opacity"
        >
          Continue Shopping →
        </button>

      </div>
    </div>
  )
}

export default Checkout