import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DeleteProduct from '../pages/DeleteProduct'
import { addtocart, getCart } from '../redux/slices/cartSlice'
import toast from 'react-hot-toast'

const baseURL = import.meta.env.VITE_API_BASE

const StarRating = ({ rating }) => {
    const full = Math.floor(rating)
    const half = rating - full >= 0.4 && rating - full < 0.9
    const empty = 5 - full - (half ? 1 : 0)

    const FilledStar = () => (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )

    const HalfStar = () => (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="url(#halfGrad)" stroke="none">
            <defs>
                <linearGradient id="halfGrad">
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="50%" stopColor="#e5e7eb" />
                </linearGradient>
            </defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )

    const EmptyStar = () => (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#e5e7eb" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    )

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(full)].map((_, i) => <FilledStar key={`f${i}`} />)}
            {half && <HalfStar />}
            {[...Array(empty)].map((_, i) => <EmptyStar key={`e${i}`} />)}
        </div>
    )
}

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
        const result = await dispatch(addtocart({ productId, quantity }))

        if (!result.error) {
            toast.success('Added to cart!')
            await dispatch(getCart())
        } else {
            toast.error('Failed to add to cart.')
        }
    }

    // ───────────────── ADMIN VIEW ─────────────────
    if (isAdmin) {
        return (
            <div className="min-h-screen bg-[#f5f3ef] p-6 md:p-8">
                {remove && (
                    <DeleteProduct
                        id={id}
                        remove={remove}
                        setRemove={setRemove}
                    />
                )}

                <div className="mb-6">
                    <p className="text-xs font-bold text-[#0e0e10]/40 uppercase tracking-[0.2em]">
                        {filtered.length} product{filtered.length !== 1 ? 's' : ''}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {filtered.map((item, i) => (
                        <div
                            key={item._id}
                            style={{ animationDelay: `${i * 40}ms` }}
                            className="group flex items-center gap-4 bg-white border border-[#e2ddd6] rounded-2xl px-5 py-4 hover:shadow-lg hover:border-[#c8f04b]/40 transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="w-14 h-14 rounded-xl bg-[#f5f3ef] overflow-hidden flex items-center justify-center shrink-0">
                                <img
                                    src={`${baseURL}/public/productImages/${item.image}`}
                                    alt={item.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-[#0e0e10] truncate tracking-tight">
                                    {item.name}
                                </p>

                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[10px] font-bold bg-[#c8f04b]/15 text-[#0e0e10]/70 px-2 py-1 rounded-lg uppercase tracking-wide">
                                        {item.category?.trim() || 'Uncategorised'}
                                    </span>
                                    <span className="text-sm font-bold text-[#0e0e10]">
                                        ₹{item.price.toLocaleString('en-IN')}
                                    </span>
                                </div>

                                {/* Rating row for admin */}
                                <div className="flex items-center gap-1.5 mt-1">
                                    {item.rating != null ? (
                                        <>
                                            <StarRating rating={item.rating} />
                                            <span className="text-xs font-semibold text-[#0e0e10]/50">
                                                {item.rating.toFixed(1)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-xs text-[#0e0e10]/30 italic">
                                            No ratings yet
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 shrink-0">
                                <Link to={`/product/${item._id}/edit`}>
                                    <button className="flex items-center gap-1.5 text-xs font-semibold text-[#0e0e10]/70 border border-[#e2ddd6] hover:border-[#c8f04b]/50 px-4 py-2 rounded-xl transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    onClick={() => deleteModal(item._id)}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-red-500 border border-red-200 hover:bg-red-500 hover:text-white hover:border-red-500 px-4 py-2 rounded-xl transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6M14 11v6" />
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
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

    // ───────────────── USER VIEW ─────────────────
    return (
        <div className="min-h-screen bg-[#f5f3ef] p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {filtered.map((item, i) => (
                    <div
                        key={item._id}
                        style={{ animationDelay: `${i * 40}ms` }}
                        className="bg-white border border-[#e2ddd6] rounded-2xl overflow-hidden group hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="h-52 bg-[#f5f3ef] flex items-center justify-center overflow-hidden relative p-5">
                            <img
                                src={`${baseURL}/public/productImages/${item.image}`}
                                alt={item.name}
                                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute top-3 left-3 bg-[#0e0e10] text-[#c8f04b] text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">
                                {item.category?.trim() || 'Uncategorised'}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="p-4 pb-2">
                            <p className="text-sm font-bold text-[#0e0e10] truncate tracking-tight">
                                {item.name}
                            </p>
                            <p className="text-lg font-extrabold text-[#0e0e10] mt-2">
                                ₹{item.price.toLocaleString('en-IN')}
                            </p>
                            <span className="text-xs text-[#0e0e10]/40">
                                incl. taxes
                            </span>
                        </div>

                        {/* Description */}
                        {item.description?.trim()
                            ? <p className="text-xs text-[#0e0e10]/60 leading-relaxed px-4 pt-1 line-clamp-2 min-h-10">
                                {item.description}
                              </p>
                            : <p className="text-xs text-[#0e0e10]/30 italic px-4 pt-1 min-h-10">
                                No description available
                              </p>
                        }

                        {/* Rating */}
                        {item.rating != null
                            ? <div className="flex items-center gap-1.5 px-4 py-2">
                                <StarRating rating={item.rating} />
                                <span className="text-xs font-semibold text-[#0e0e10]/60">
                                    {item.rating.toFixed(1)}
                                </span>
                              </div>
                            : <p className="text-xs text-[#0e0e10]/30 italic px-4 py-2">
                                No ratings yet
                              </p>
                        }

                        {/* Button */}
                        <div className="px-4 pb-4">
                            <button
                                onClick={() => cartHandle(item._id)}
                                className="w-full bg-[#0e0e10] text-white font-bold text-sm py-3 rounded-xl hover:bg-[#c8f04b] hover:text-[#0e0e10] transition-all duration-300 cursor-pointer"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductCard