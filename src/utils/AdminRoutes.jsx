import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const {isAdmin,loading} = useSelector(state=>state.Users)
     if (loading) return null
      if (!isAdmin) return <Navigate to="/" replace />  
        return <Outlet />
  
}

export default AdminRoutes
