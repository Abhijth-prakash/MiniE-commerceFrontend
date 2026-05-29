import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../redux/slices/products'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../redux/slices/userSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const search = useSelector(state => state.Products.search)
    const [searchOpen, setSearchOpen] = useState(false)
    const { user, isAdmin } = useSelector(state => state.Users)
    const navigate = useNavigate()
    const { cartItems } = useSelector(state => state.cart)

    const searchHandle = (e) => {
        dispatch(setSearch(e.target.value))
    }

    const logout = async () => {
        const result = await dispatch(logoutUser())
        if (!result.error) {
            navigate("/", { replace: true })
        }
    }

    return (
        <div>
            <nav className="sticky top-0 z-50 bg-[#0e0e10] border-b border-white/10 backdrop-blur-sm px-4 md:px-8 h-16 flex items-center gap-4">

                {/* Logo */}
                <Link to="/home" className="flex items-center gap-3 shrink-0">
                    <div className="w-9 h-9 bg-[#c8f04b] rounded-lg flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#0e0e10"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>

                    <span className="text-white text-xl font-bold tracking-tight hidden sm:block">
                        Urban<span className="text-[#c8f04b]">Nest</span>
                    </span>
                </Link>

                {/* Desktop Search */}
                <div className="hidden md:flex flex-1 max-w-xl">
                    <div className="w-full bg-white/5 border border-white/10 rounded-xl flex items-center px-4 gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white/40 shrink-0"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={searchHandle}
                            className="flex-1 bg-transparent py-3 text-sm text-white placeholder:text-white/30 outline-none"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="ml-auto flex items-center gap-3">

                    {/* Mobile Search */}
                    <button
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="md:hidden text-white/70 hover:text-[#c8f04b] transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                    </button>

                    {/* Greeting */}
                    <span className="hidden sm:block text-sm text-white/50">
                        Hi,{" "}
                        <span className="text-white font-medium">
                            {user ? user.name : "Guest"}
                        </span>
                    </span>

                    {/* Admin Button */}
                    {isAdmin ? (
                        <Link
                            to="/product/add"
                            className="
                                bg-[#c8f04b]
                                text-[#0e0e10]
                                font-bold
                                text-sm
                                px-5
                                py-3
                                rounded-xl
                                hover:opacity-90
                                transition-all
                            "
                        >
                            + Add Product
                        </Link>
                    ) : (
                        <Link
                            to="/product/cart"
                            className="
                                flex items-center gap-2
                                bg-white/5
                                border border-white/10
                                text-white
                                text-sm
                                font-semibold
                                px-4
                                py-2.5
                                rounded-xl
                                hover:border-[#c8f04b]/40
                                hover:bg-white/8
                                transition-all
                            "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>

                            Cart

                            <span className="
                                bg-[#c8f04b]
                                text-[#0e0e10]
                                text-xs
                                font-bold
                                min-w-5
                                h-5
                                rounded-full
                                flex
                                items-center
                                justify-center
                                px-1
                            ">
                                {cartItems.length}
                            </span>
                        </Link>
                    )}

                    {/* Logout */}
                    {user && (
                        <button
                            onClick={logout}
                            className="
                                flex items-center gap-2
                                border border-white/10
                                text-white/70
                                hover:text-white
                                hover:border-[#c8f04b]/40
                                px-4
                                py-2.5
                                rounded-xl
                                transition-all
                            "
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>

                            <span className="hidden sm:inline">
                                Logout
                            </span>
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile Search */}
            {searchOpen && (
                <div className="md:hidden bg-[#0e0e10] border-b border-white/10 px-4 pb-4">
                    <div className="bg-white/5 border border-white/10 rounded-xl flex items-center px-4 gap-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white/40"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>

                        <input
                            autoFocus
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={searchHandle}
                            className="flex-1 bg-transparent py-3 text-sm text-white placeholder:text-white/30 outline-none"
                        />

                        <button
                            onClick={() => setSearchOpen(false)}
                            className="text-white/40 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar