import React, { lazy, Suspense, useEffect,useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, setFilter, setPage, setSort } from '../redux/slices/products'
import Navbar from '../components/Navbar'
import Pagination from '../components/Pagination'
const ProductCard = lazy(()=> import('../components/ProductCard'))
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import Noproductfound from '../components/Noproductfound'
const baseURL = import.meta.env.VITE_API_BASE

const Home = () => {

    const {products, loading, error, page, pages,search,sort,filter} = useSelector(state => state.Products)
    const dispatch = useDispatch()


    //getting products on the inital render and when page limit search filter sort change
useEffect(() => {
    const timer = setTimeout(() => {
        dispatch(
            getProducts({
                page,
                limit: 6,
                search,
                filter,
                sort
            })
        )

    }, 300)

    return () => clearTimeout(timer)

}, [page, search, filter, sort])


    return (
        <div className="min-h-screen bg-[#f7f5f2]">

         <Navbar></Navbar>

            {/* Filter chips + Sort — always mounted */}
            <div className="bg-white px-6 py-3 flex items-center gap-2 border-b border-[#ede9e3] flex-wrap">
                {["", "Electronics", "Clothing", "Shoes", "Books", "Furniture", "Toys"].map(cat => (
                    <button
                        key={cat}
                        onClick={() => dispatch(setFilter(cat))}
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
                        onChange={(e) => dispatch(setSort(e.target.value))}
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
    <>      <Suspense fallback={<Loading></Loading>}>
            <ProductCard></ProductCard>
            </Suspense>
            <Pagination></Pagination>
            <Link to={'/register'}>registration</Link>
    </>
)}
        </div>
    )
}

export default Home