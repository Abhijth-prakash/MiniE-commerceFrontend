import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoutes = () => {
  const { user, loading } = useSelector(state => state.Users)

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (!user) {
      return <h1>No User</h1>
  }

  return <Outlet />
}

export default ProtectedRoutes
