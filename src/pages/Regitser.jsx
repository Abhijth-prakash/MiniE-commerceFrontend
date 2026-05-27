import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../schema/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/slices/userSlice'
import EyeIcon from '../components/EyeIcon'

const Registration = () => {
    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(registerSchema)
    })
    const { errors } = formState
    const error = useSelector(state => state.Users.error)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const datahandle = async (data) => {
        const result = await dispatch(registerUser(data))
        if (!result.error) {
            navigate('/')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f7f5f2] px-4">
            <div className="bg-white border border-[#ede9e3] rounded-2xl shadow-sm w-full max-w-sm p-8">

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-9 h-9 bg-[#1a1a2e] rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffd200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </div>
                    <span className="text-[#1a1a2e] text-xl font-bold tracking-tight">
                        Urban<span className="text-[#ffd200]">Nest</span>
                    </span>
                </div>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#1a1a2e]">Create account</h2>
                    <p className="text-sm text-gray-400 mt-1">Sign up to get started</p>
                </div>

                <form onSubmit={handleSubmit(datahandle)} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-[#1a1a2e] uppercase tracking-wide">Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            {...register("name")}
                            className="border border-[#ede9e3] rounded-lg px-4 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#1a1a2e] transition placeholder-gray-300"
                        />
                        {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-[#1a1a2e] uppercase tracking-wide">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            {...register("email")}
                            className="border border-[#ede9e3] rounded-lg px-4 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#1a1a2e] transition placeholder-gray-300"
                        />
                        {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-[#1a1a2e] uppercase tracking-wide">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("password")}
                                className="w-full border border-[#ede9e3] rounded-lg px-4 py-2.5 pr-10 text-sm text-[#1a1a2e] outline-none focus:border-[#1a1a2e] transition placeholder-gray-300"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a2e] transition">
                                <EyeIcon open={showPassword} />
                            </button>
                        </div>
                        {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-[#1a1a2e] uppercase tracking-wide">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="••••••••"
                                {...register("confirmpassword")}
                                className="w-full border border-[#ede9e3] rounded-lg px-4 py-2.5 pr-10 text-sm text-[#1a1a2e] outline-none focus:border-[#1a1a2e] transition placeholder-gray-300"
                            />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a1a2e] transition">
                                <EyeIcon open={showConfirm} />
                            </button>
                        </div>
                        {errors.confirmpassword && <p className="text-red-400 text-xs">{errors.confirmpassword.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#1a1a2e] text-[#ffd200] font-bold text-sm py-2.5 rounded-full hover:opacity-90 transition mt-1"
                    >
                        Create account →
                    </button>
                </form>

                {error && <p className="text-red-400 text-xs text-center mt-3">{error}</p>}

                <p className="text-sm text-center text-gray-400 mt-5">
                    Already have an account?{' '}
                    <Link to="/" className="text-[#1a1a2e] font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Registration