import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DeleteProduct from '../pages/DeleteProduct'
import { addtocart, getCart } from '../redux/slices/cartSlice'
const baseURL = import.meta.env.VITE_API_BASE
import toast from 'react-hot-toast'


const ProductCard = () => {
    const { products, search } = useSelector(state => state.Products)
    const { isAdmin } = useSelector(state => state.Users)
    const searchText = search.toLowerCase()
    const filtered = products.filter(item => item.name.toLowerCase().includes(searchText))
    const [remove, setRemove] = useState(false)
    const [id, setId] = useState()
    const { cartItems } = useSelector(state => state.cart)

    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const deleteModal = (id) => {
        setRemove(true)
        setId(id)
    }

const cartHandle = async (productId) => {
    let quantity = 1
    const result = await dispatch(addtocart({ productId: productId, quantity: quantity }))
    if (!result.error) {
        toast.success('Added to cart!')
        await dispatch(getCart())  
    } else {
        toast.error('Failed to add to cart.')
    }
}

    // ── ADMIN VIEW ──────────────────────────────────────────────────────────
    if (isAdmin) {
        return (
            <div className="p-6">
                {remove && <DeleteProduct id={id} remove={remove} setRemove={setRemove} />}

                <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-semibold text-[#1a1a2e]/40 uppercase tracking-widest">
                        {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    {filtered.map((item, i) => (
                        <div
                            key={item._id}
                            className="group flex items-center gap-4 bg-white border border-[#ede9e3] rounded-xl px-4 py-3 hover:border-[#1a1a2e]/30 hover:shadow-md transition-all duration-200"
                            style={{ animationDelay: `${i * 30}ms` }}
                        >
                            {/* Thumbnail */}
                            <div className="w-12 h-12 rounded-lg bg-[#f7f5f2] flex items-center justify-center overflow-hidden shrink-0">
                                <img
                                    src={`${baseURL}/public/productImages/${item.image}`}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-[#1a1a2e] truncate tracking-tight leading-snug group-hover:text-[#f7971e] transition-colors duration-200">{item.name}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] font-bold bg-[#1a1a2e]/8 text-[#1a1a2e]/50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                        {item.category}
                                    </span>
                                    <span className="text-xs font-bold text-[#1a1a2e]">
                                        ₹{item.price.toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                <Link to={`/product/${item._id}/edit`}>
                                    <button className="flex items-center gap-1.5 text-xs font-semibold text-[#1a1a2e]/60 hover:text-[#1a1a2e] border border-[#ede9e3] hover:border-[#1a1a2e]/30 px-3 py-1.5 rounded-full transition-all duration-150">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                        Edit
                                    </button>
                                </Link>

                                <button onClick={() => deleteModal(item._id)} className="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 px-3 py-1.5 rounded-full transition-all duration-150">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"/>
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                                        <path d="M10 11v6M14 11v6"/>
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // ── USER VIEW ────────────────────────────────────────────────────────────
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6">
            {filtered.map((item, i) => (
                <div
                    key={item._id}
                    className="bg-white rounded-xl border border-[#ede9e3] overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
                    style={{ animationDelay: `${i * 40}ms` }}
                >
                    {/* Image */}
                    <div className="h-48 bg-[#f7f5f2] flex items-center justify-center overflow-hidden relative p-4">
                        <img
                            src={`${baseURL}/public/productImages/${item.image}`}
                            alt={item.name}
                            className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 bg-[#1a1a2e]/75 text-[#ffd200] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                            {item.category}
                        </span>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                        <p className="text-sm font-semibold text-[#1a1a2e] truncate">{item.name}</p>
                        <p className="text-base font-bold text-[#1a1a2e] mt-1">
                            ₹{item.price.toLocaleString('en-IN')}
                            <span className="text-[11px] font-normal text-gray-400 ml-1">incl. taxes</span>
                        </p>
                    </div>

                    {/* Add to cart */}
                    <div className="px-3 pb-3">
                       
                        <button onClick={()=> cartHandle(item._id)} className="w-full bg-[#1a1a2e] text-[#ffd200] text-xs font-bold py-2 rounded-lg hover:bg-[#ffd200] hover:text-[#1a1a2e] transition-all duration-200 cursor-pointer">
                            Add to Cart
                        </button>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductCard