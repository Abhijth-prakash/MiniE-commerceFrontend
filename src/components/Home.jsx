import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts, setPage } from '../redux/slices/products'

const Home = () => {

    const {products, loading, error,page,pages} = useSelector(state => state.Products)
    const dispatch = useDispatch()
    const [input,setInput] = useState("")
    const [sort, setSort] = useState("")
    const [filter, setFilter] = useState("")
    
    useEffect(() => {
        dispatch(getProducts({ page, limit: 6 }))
    }, [page])

    if(loading) return <div className="flex justify-center items-center min-h-screen text-xl">Loading...</div>

return (
    <div className="min-h-screen bg-[#f7f5f2]">

        {/* Navbar */}
        <nav className="bg-[#1a1a2e] px-6 h-15 flex items-center gap-4 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-linear-to-br from-[#f7971e] to-[#ffd200] rounded-lg flex items-center justify-center">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
</div>
                <span className="text-white text-lg font-bold tracking-tight">Urban<span className="text-[#ffd200]">Nest</span></span>
            </div>

            <div className="flex flex-1 max-w-md bg-white/10 rounded-full overflow-hidden items-center px-4 gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
</svg>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none py-2 text-sm text-white placeholder-white/50"
                />
            </div>

            <Link
                to="/add"
                className="ml-auto bg-[#ffd200] text-[#1a1a2e] font-bold text-sm px-5 py-2 rounded-full hover:opacity-90 transition"
            >
                + Add Product
            </Link>
        </nav>

        {/* Filter chips + Sort */}
        <div className="bg-white px-6 py-3 flex items-center gap-2 border-b border-[#ede9e3] flex-wrap">
            {["", "Electronics", "Clothing", "Shoes", "Books", "Furniture", "Toys"].map(cat => (
                <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs border transition whitespace-nowrap font-medium
                        ${filter === cat
                            ? "bg-[#1a1a2e] text-[#ffd200] border-[#1a1a2e]"
                            : "bg-white text-gray-500 border-gray-200 hover:border-[#1a1a2e] hover:text-[#1a1a2e]"
                        }`}
                >
                    {cat || "All"}
                </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-gray-400">Sort</span>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border border-gray-200 rounded-full px-3 py-1.5 text-xs outline-none bg-white"
                >
                    <option value="">Relevance</option>
                    <option value="low">Price ↑</option>
                    <option value="high">Price ↓</option>
                </select>
            </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6">
            {products
                .filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
                .filter(item => filter ? item.category === filter : true)
                .sort((a, b) => {
                    if (sort === "low") return a.price - b.price
                    if (sort === "high") return b.price - a.price
                    return 0
                })
                .map(item => (
                    <div key={item._id} className="bg-white rounded-xl border border-[#ede9e3] overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                        <div className="h-48 bg-[#f7f5f2] flex items-center justify-center overflow-hidden relative p-4">
                            <img
                                src={`http://localhost:8888/public/productImages/${item.image}`}
                                alt={item.name}
                                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute top-2 left-2 bg-[#1a1a2e]/75 text-[#ffd200] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                {item.category}
                            </span>
                        </div>
                        <div className="p-3">
                            <p className="text-sm font-semibold text-[#1a1a2e] truncate">{item.name}</p>
                            <p className="text-base font-bold text-[#1a1a2e] mt-1">
                                ₹{item.price.toLocaleString('en-IN')}
                                <span className="text-[11px] font-normal text-gray-400 ml-1">incl. taxes</span>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
        <button disabled={page === 1} onClick={() => dispatch(setPage(page - 1))}>Prev</button>
        <span>{page} of {pages}</span>
        <button disabled={page === pages} onClick={() => dispatch(setPage(page + 1))}>Next</button>
    </div>
    
)
}

export default Home