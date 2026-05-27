import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoutes = () => {
    const { user, loading } = useSelector(state => state.Users)

    if (loading) return null
    if (!user) return <Navigate to="/" replace />
    return <Outlet />
}

export default ProtectedRoutes
