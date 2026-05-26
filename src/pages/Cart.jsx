import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addtocart, clearCart, deleteCart, getCart, orderPlace, updatingQt } from '../redux/slices/cartSlice'
import { useNavigate } from 'react-router-dom'
const baseURL = import.meta.env.VITE_API_BASE

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartItems } = useSelector(state => state.cart)

  useEffect(() => { dispatch(getCart()) }, [])

  const subtotal = cartItems && cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0) 

  const deletehandle = (productId)=>{
         dispatch(deleteCart({productId}))
  }

const decreasequantity = (quantity, productId) => {
    dispatch(updatingQt({
        productId,
        quantity: quantity - 1
    }))
}

const increasequantity = (quantity, productId) => {
    dispatch(updatingQt({
        productId,
        quantity: quantity + 1
    }))
}

const checkout = async ()=>{
    const result = await dispatch(orderPlace())
    if(!result.error){
        dispatch(clearCart())
        navigate('/product/cart/checkout')
    }

}
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_300px] gap-6 p-4 sm:p-6">

      {/* Cart Items */}
      <div className="order-2 sm:order-1">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-[#1a1a2e]">Cart</h1>
          <span className="text-xs font-bold bg-[#1a1a2e] text-[#ffd200] px-3 py-1 rounded-full">
            {cartItems.length} items
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {cartItems.map(item => (
            <div key={item._id} className="grid grid-cols-[72px_1fr_auto] gap-3 items-center bg-white border border-[#ede9e3] rounded-xl p-3 hover:border-[#1a1a2e]/30 transition-all">
              
              {/* Image */}
              <div className="w-18 h-18 bg-[#f7f5f2] rounded-lg overflow-hidden">
                <img
                  src={`${baseURL}/public/productImages/${item.product.image}`}
                  alt={item.product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Info */}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1a1a2e] truncate">{item.product.name}</p>
                <span className="text-[10px] font-bold bg-[#1a1a2e]/10 text-[#1a1a2e]/60 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {item.product.category}
                </span>
              </div>

              {/* Price + controls */}
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-semibold text-[#1a1a2e]">
                  ₹{item.product.price.toLocaleString('en-IN')}
                </span>
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                  <button disabled={item.quantity === 1} onClick={()=> decreasequantity(item.quantity,item.product._id)  } className="text-gray-500 hover:text-[#1a1a2e] text-sm">−</button>
                  <span className="text-sm font-medium text-[#1a1a2e] min-w-3.5 text-center">{item.quantity}</span>
                  <button onClick={()=> increasequantity(item.quantity,item.product._id)} className="text-gray-500 hover:text-[#1a1a2e] text-sm">+</button>
                </div>
               <button onClick={()=> deletehandle(item.product._id)} className="text-gray-300 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                    <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                  </svg>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="order-1 sm:order-2 flex flex-col gap-3">
        <div className="bg-white border border-[#ede9e3] rounded-xl p-5">
          <p className="text-sm font-semibold text-[#1a1a2e] mb-4">Order summary</p>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Subtotal ({cartItems.length} items)</span>
            <span className="text-[#1a1a2e] font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Shipping</span><span className="text-[#1a1a2e] font-medium">Free</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Taxes</span><span className="text-[#1a1a2e] font-medium">Included</span>
          </div>
          <hr className="my-3 border-[#ede9e3]" />
          <div className="flex justify-between text-base font-semibold text-[#1a1a2e]">
            <span>Total</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <button onClick={checkout} className="w-full bg-[#1a1a2e] text-[#ffd200] font-bold text-sm py-3 rounded-lg mt-4 hover:opacity-85 transition-opacity">
            Proceed to checkout →
          </button>
        </div>

        <div className="bg-gray-50 border border-[#ede9e3] rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-2">Have a promo code?</p>
          <div className="flex gap-2">
            <input type="text" placeholder="Enter code" className="flex-1 text-sm border border-[#ede9e3] rounded-lg px-3 py-2 outline-none focus:border-[#1a1a2e]/30" />
            <button className="bg-[#1a1a2e] text-[#ffd200] text-xs font-bold px-4 py-2 rounded-lg">Apply</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart