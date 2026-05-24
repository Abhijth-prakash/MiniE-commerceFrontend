import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../redux/slices/products'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser, userProfile } from '../redux/slices/userSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const search = useSelector(state => state.Products.search)
    const [searchOpen, setSearchOpen] = useState(false)
    const { user, isAdmin } = useSelector(state => state.Users)
    const navigate = useNavigate()

    //handle searching
    const searchHandle = (e) => {
        dispatch(setSearch(e.target.value))
    }


    //logout user
    const logout = async () => {
        const result = await dispatch(logoutUser())
        if (!result.error) {
            navigate("/", { replace: true })
        }
    }

    return (
        <div>
            <nav className="bg-[#1a1a2e] px-4 md:px-6 h-14 flex items-center gap-3 sticky top-0 z-50">

                {/* Logo */}
                <div className="flex items-center gap-2 shrink-0">
                    <div className="w-8 h-8 bg-linear-to-br from-[#f7971e] to-[#ffd200] rounded-lg flex items-center justify-center">
                        <Link to='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a2e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                        </Link>
                    </div>
                    <span className="text-white text-lg font-bold tracking-tight hidden sm:block">
                        Urban<span className="text-[#ffd200]">Nest</span>
                    </span>
                </div>

                {/* Search — desktop only */}
                <div className="hidden md:flex flex-1 max-w-md bg-white/10 rounded-full items-center px-4 gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 shrink-0">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={searchHandle}
                        className="flex-1 bg-transparent outline-none py-2 text-sm text-white placeholder-white/50 min-w-0"
                    />
                </div>

                {/* Right side */}
                <div className="ml-auto flex items-center gap-3">

                    {/* Search icon — mobile only */}
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="md:hidden text-white/70 p-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                    </button>

                    {/* Greeting */}
                    <span className="text-white/70 text-sm hidden sm:block">
                        Hi, <span className="text-white font-medium">{user ? user.name : "Guest"}</span>
                    </span>

                    {/* Action button */}
                    {isAdmin ? (
                        <Link
                            to="/product/add"
                            className="bg-[#ffd200] text-[#1a1a2e] font-bold text-xs md:text-sm px-3 md:px-5 py-2 rounded-full hover:opacity-90 transition whitespace-nowrap"
                        >
                            <span className="hidden sm:inline">+ Add Product</span>
                            <span className="sm:hidden">+</span>
                        </Link>
                    ) : (
                        <Link
                            to="/cart"
                            className="flex items-center gap-2 bg-[#ffd200] text-[#1a1a2e] font-bold text-xs md:text-sm px-3 md:px-5 py-2 rounded-full hover:opacity-90 transition whitespace-nowrap"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            </svg>
                            <span className="hidden sm:inline">Cart</span>
                        </Link>
                    )}

                    {/* Logout button */}
                    {user && (
                        <button
                            onClick={logout}
                            className="flex items-center gap-1.5 border border-white/20 text-white/70 hover:text-white hover:border-white/50 text-xs md:text-sm px-3 md:px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                <polyline points="16 17 21 12 16 7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            <span className="hidden sm:inline">Logout</span>
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile search — shows below navbar */}
            {searchOpen && (
                <div className="md:hidden bg-[#1a1a2e] px-4 pb-3">
                    <div className="flex bg-white/10 rounded-full items-center px-4 gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 shrink-0">
                            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input
                            autoFocus
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={searchHandle}
                            className="flex-1 bg-transparent outline-none py-2 text-sm text-white placeholder-white/50"
                        />
                        <button onClick={() => setSearchOpen(false)} className="text-white/50">✕</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar