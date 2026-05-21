import React from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../schema/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'

const Registration = () => {
    const {register,handleSubmit,formState} = useForm({
        resolver:zodResolver(registerSchema)
    })
    const {errors} = formState
    const datahandle =(data)=>{
        console.log(data)
    }


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-8 w-full max-w-sm">
        <h2 className="text-lg font-medium text-gray-800 mb-6">Create account</h2>
        <form onSubmit={handleSubmit(datahandle)} className="flex flex-col gap-3">
          <input type="text"     placeholder="Name"    {...register("name")}         className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
           {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
          <input type="email"    placeholder="Email"  {...register("email")}          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
          <input type="password" placeholder="Password"  {...register("password")}       className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
          <input type="password" placeholder="Confirm password" {...register("confirmpassword")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
          {errors.confirmpassword && <p className="text-red-400 text-xs">{errors.confirmpassword.message}</p>}
          <button className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition mt-1">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Registration