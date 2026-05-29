import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, setFilter, setPage, setSort } from '../redux/slices/products'
import Navbar from '../components/Navbar'
import Pagination from '../components/Pagination'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import Noproductfound from '../components/Noproductfound'
import { Toaster } from 'react-hot-toast'
const ProductCard = lazy(() => import('../components/ProductCard'))
const baseURL = import.meta.env.VITE_API_BASE

const Home = () => {

    const {products, loading, error, page, pages, search, sort, filter} = useSelector(state => state.Products)
    const dispatch = useDispatch()

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
        <div className="min-h-screen bg-[#f5f3ef] font-['Syne',sans-serif]">
            <Toaster position="top-right" />
            <Navbar />

            {/* Filter chips + Sort bar */}
            <div className="bg-[#0e0e10] px-6 py-3 flex items-center gap-2 flex-wrap">
                {["", "Electronics", "Clothing", "Shoes", "Books", "Furniture", "Toys"].map(cat => (
                    <button
                        key={cat}
                        onClick={() => dispatch(setFilter(cat))}
                        className={`px-4 py-1.5 rounded-xl text-xs border transition-all whitespace-nowrap font-bold tracking-wide
                            ${filter === cat
                                ? "bg-[#c8f04b] text-[#0e0e10] border-[#c8f04b]"
                                : "bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                            }`}
                    >
                        {cat || "All"}
                    </button>
                ))}

                <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs text-white/30 font-medium">Sort by</span>
                    <select
                        value={sort}
                        onChange={(e) => dispatch(setSort(e.target.value))}
                        className="bg-white/5 border border-white/10 text-white/60 rounded-xl px-3 py-1.5 text-xs outline-none hover:border-[#c8f04b]/40 hover:text-white transition-all cursor-pointer"
                    >
                        <option value="">Relevance</option>
                        <option value="low">Price ↑</option>
                        <option value="high">Price ↓</option>
                    </select>
                </div>
            </div>

            {/* Loading / Grid / Empty */}
            {loading ? (
                <Loading />
            ) : products.length === 0 ? (
                <Noproductfound />
            ) : (
                <>
                    <Suspense fallback={<Loading />}>
                        <ProductCard />
                    </Suspense>
                    <Pagination />
                </>
            )}
        </div>
    )
}

export default Home