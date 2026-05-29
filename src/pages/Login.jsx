import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../schema/userSchema'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, userProfile } from '../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import EyeIcon from '../components/EyeIcon'
import { getCart } from '../redux/slices/cartSlice'

const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema)
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { errors } = formState
  const error = useSelector(state => state.Users.error)
  const [showPassword, setShowPassword] = useState(false)

  const datahandle = async (data) => {
    const result = await dispatch(loginUser(data))
    if (!result.error) {
      await dispatch(userProfile())
      await dispatch(getCart())
      navigate('/home', { replace: true })
    }
  }

  return (
    <div className="min-h-screen w-full flex font-['Syne',sans-serif] bg-[#0e0e10]">

      {/* ── Left panel ── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative overflow-hidden px-12 py-10">

        {/* Geometric background accent */}
        <div className="absolute inset-0 bg-[#0e0e10]">
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#c8f04b]/10 blur-[80px]" />
          <div className="absolute bottom-10 left-0 w-56 h-56 rounded-full bg-[#c8f04b]/5 blur-[60px]" />
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 bg-[#c8f04b] rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0e0e10" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span className="text-white text-xl font-bold tracking-tight">
            Urban<span className="text-[#c8f04b]">Nest</span>
          </span>
        </div>

        {/* Hero copy */}
        <div className="relative">
          <p className="text-[#c8f04b] text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            10,000+ happy shoppers
          </p>
          <h1 className="text-[2.8rem] font-extrabold text-white leading-[1.1] mb-5 tracking-tight">
            Shop smarter,<br />
            <span className="text-[#c8f04b]">live better.</span>
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs">
            Thousands of products across electronics, clothing, furniture and more — delivered to your door.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative flex flex-col gap-3">
          {[
            { d: 'M5 12h14M12 5l7 7-7 7', label: 'Free shipping on all orders' },
            { d: 'M9 11l3 3L22 4', label: 'Easy 30-day returns' },
            { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'Secure & encrypted checkout' },
          ].map(({ d, label }) => (
            <div key={label} className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#c8f04b]/10 group-hover:border-[#c8f04b]/30 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c8f04b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={d}/>
                </svg>
              </div>
              <span className="text-white/50 text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 flex items-center justify-center bg-[#f5f3ef] px-6 py-10 lg:px-14 rounded-l-4xl lg:rounded-l-[2.5rem]">
        <div className="w-full max-w-90">

          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-[#0e0e10] rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c8f04b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <span className="text-[#0e0e10] text-xl font-bold tracking-tight">
              Urban<span className="text-[#c8f04b]">Nest</span>
            </span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#0e0e10] tracking-tight mb-1">
              Welcome back
            </h2>
            <p className="text-sm text-[#0e0e10]/45">Sign in to continue shopping</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(datahandle)} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#0e0e10] uppercase tracking-[0.15em]">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className="
                  bg-white border border-[#e2ddd6] rounded-xl
                  px-4 py-3 text-sm text-[#0e0e10]
                  placeholder:text-[#0e0e10]/25
                  outline-none transition-all
                  focus:border-[#0e0e10] focus:ring-2 focus:ring-[#0e0e10]/8
                "
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-0.5">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#0e0e10] uppercase tracking-[0.15em]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="
                    w-full bg-white border border-[#e2ddd6] rounded-xl
                    px-4 py-3 pr-11 text-sm text-[#0e0e10]
                    placeholder:text-[#0e0e10]/25
                    outline-none transition-all
                    focus:border-[#0e0e10] focus:ring-2 focus:ring-[#0e0e10]/8
                  "
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0e0e10]/30 hover:text-[#0e0e10] transition-colors"
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-0.5">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                group relative w-full mt-1
                bg-[#0e0e10] text-white font-bold text-sm
                py-3.5 rounded-xl overflow-hidden
                hover:opacity-95 active:scale-[0.98] transition-all
              "
            >
              {/* Lime accent line on hover */}
              <span className="absolute left-0 top-0 h-full w-1 bg-[#c8f04b] translate-x-0 group-hover:w-full transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 rounded-xl" />
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#0e0e10] transition-colors duration-300">
                Sign in
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </button>

          </form>

          {/* API error */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#0e0e10]/10" />
            <span className="text-[#0e0e10]/30 text-xs">or</span>
            <div className="flex-1 h-px bg-[#0e0e10]/10" />
          </div>

          {/* Register CTA */}
          <p className="text-sm text-center text-[#0e0e10]/45">
            No account yet?{' '}
            <Link
              to="/register"
              className="text-[#0e0e10] font-bold underline underline-offset-2 hover:text-[#c8f04b] transition-colors"
            >
              Create one free →
            </Link>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Login