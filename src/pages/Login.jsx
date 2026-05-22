import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../schema/userSchema'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema)
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { errors } = formState
  const error = useSelector(state => state.Users.error)
  
  const datahandle = async (data) => {
    const result = await  dispatch(loginUser(data))
            if(!result.error) {
            navigate('/home')
            }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(datahandle)} className="flex flex-col gap-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <input
            type="submit"
            value="Login"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg cursor-pointer transition-colors"
          />
        </form>

        {error && <p className="text-red-400 text-xs text-center mt-3">{error}</p>}

        <p className="text-sm text-center text-gray-500 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default Login