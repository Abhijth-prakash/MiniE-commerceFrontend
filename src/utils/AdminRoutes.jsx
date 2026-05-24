import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const {isAdmin,loading} = useSelector(state=>state.Users)
     if (loading) return null
      return isAdmin? <Outlet></Outlet> : <Navigate to={'/home'}></Navigate>
  
}

export default AdminRoutes
