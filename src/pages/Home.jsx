import React, { useEffect,useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts, setPage } from '../redux/slices/products'
import Navbar from '../components/Navbar'
const baseURL = import.meta.env.VITE_API_BASE

const Home = () => {

    const {products, loading, error, page, pages,search} = useSelector(state => state.Products)
    const dispatch = useDispatch()
    
    const [sort, setSort] = useState("")
    const [filter, setFilter] = useState("")
    const isFirstRender = useRef(true)
    

    //getting product data on inital rendering and when users clicks next or prev page
    useEffect(() => {
        dispatch(getProducts({ page, limit: 6,filter }))
    }, [page])

    // useEffect 2 — search and filter with debounce
    useEffect(() => {
    if(isFirstRender.current) {
        isFirstRender.current = false
        return
    }
    const timer = setTimeout(() => {
        dispatch(getProducts({ page: 1, limit: 6, search, filter,sort }))
    }, 300)
    return () => clearTimeout(timer)
   }, [search, filter,sort])
   

    return (
        <div className="min-h-screen bg-[#f7f5f2]">

         <Navbar></Navbar>

            {/* Filter chips + Sort — always mounted */}
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

            {/* Loading / Grid */}
       {loading ? (
    <div className="flex justify-center items-center h-96 text-xl text-[#1a1a2e]">
        Loading...
    </div>
) : products.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm mt-1">Try a different search or filter</p>
    </div>
) : (
    <>
        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6">
            {products
                .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                .map(item => (
                    <div key={item._id} className="bg-white rounded-xl border border-[#ede9e3] overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
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

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4 py-8">
            <button
                disabled={page === 1}
                onClick={() => dispatch(setPage(page - 1))}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition
                    ${page === 1
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-[#ffd200] cursor-pointer"
                    }`}
            >
                ← Prev
            </button>
            <span className="text-sm text-gray-400">
                <span className="text-[#1a1a2e] font-bold">{page}</span> of <span className="text-[#1a1a2e] font-bold">{pages}</span>
            </span>
            <button
                disabled={page === pages}
                onClick={() => dispatch(setPage(page + 1))}
                className={`px-5 py-2 rounded-full text-sm font-medium border transition
                    ${page === pages
                        ? "border-gray-200 text-gray-300 cursor-not-allowed"
                        : "border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-[#ffd200] cursor-pointer"
                    }`}
            >
                Next →
            </button>
        </div>
    </>
)}
        </div>
    )
}

export default Home