import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { loginSchema } from '../schema/userSchema'


const Login = () => {
  const {register,handleSubmit,formState }=useForm({
    resolver:zodResolver(loginSchema)
  })
  const {errors} = formState
  return (
    <div>
      <form action="">
        <input type="email" placeholder='email' {...register("email")}/>
       {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
        <input type="password" placeholder='password' {...register("password")} />
        {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
        <input type="submit" />
      </form>
    </div>
  )
}

export default Login
