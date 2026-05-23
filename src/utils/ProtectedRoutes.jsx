import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoutes = () => {
    const {user,loading} = useSelector(state=>state.Users)

    if (loading) return null
  return user? <Outlet></Outlet> : <Navigate to={'/'}></Navigate>
}

export default ProtectedRoutes
