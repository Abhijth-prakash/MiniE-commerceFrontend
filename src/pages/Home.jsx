import React, { useEffect,useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, setPage } from '../redux/slices/products'
import Navbar from '../components/Navbar'
import Pagination from '../components/Pagination'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import Noproductfound from '../components/Noproductfound'
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
        <>
        <Loading></Loading>
        </>
) : products.length === 0 ? (
        <>
        <Noproductfound></Noproductfound>
        </>
) : (
    <>
            <ProductCard></ProductCard>
            <Pagination></Pagination>
            <Link to={'/register'}>registration</Link>
    </>
)}
        </div>
    )
}

export default Home