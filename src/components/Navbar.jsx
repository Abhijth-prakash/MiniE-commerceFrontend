import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../redux/slices/products'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const inputref = useRef(null)
    const dispatch = useDispatch()
    const search = useSelector(state => state.Products.search)

    const searchHandle =(e)=>{
        dispatch(setSearch(e.target.value))
        inputref.current.focus()
    }   
  return (
    <div>
            
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
                        ref={inputref}
                        placeholder="Search products..."
                         value={search}
                       onChange={searchHandle}
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
      
    </div>
  )
}

export default Navbar
