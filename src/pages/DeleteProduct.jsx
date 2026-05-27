import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProducts } from '../redux/slices/products'
const baseURL = import.meta.env.VITE_API_BASE
import toast from 'react-hot-toast'

const DeleteProduct = ({ id, setRemove }) => {
  const { products } = useSelector(state => state.Products)
  const dispatch = useDispatch()

  const product = products.find(item => item._id === id)

const deletehandle = (id) => {
    dispatch(deleteProducts(id))
    toast.success('Product deleted successfully')
    setRemove(false)
}
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-2xl border border-[#ede9e3] p-8 w-full max-w-md">

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-[#1a1a2e]">Delete product</p>
            <p className="text-xs text-gray-400">This action cannot be undone</p>
          </div>
        </div>

        {/* Product preview */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 mb-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-white border border-[#ede9e3] flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={`${baseURL}/public/productImages/${product.image}`}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[#1a1a2e] truncate">{product.name}</p>
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mt-0.5">{product.category}</p>
            <p className="text-xs font-bold text-[#1a1a2e] mt-0.5">₹{product.price?.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Message */}
<p className="text-[10px] text-gray-400 leading-relaxed mb-6">
  Are you sure you want to delete this product? It will be permanently removed from your store.
</p>
        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => setRemove(false)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#1a1a2e] border border-[#ede9e3] hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => deletehandle(id)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
            Yes, delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default DeleteProduct