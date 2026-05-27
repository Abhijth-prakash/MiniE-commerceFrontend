import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import AddProduct from './pages/AddProduct'
import Home from './pages/Home'
import Registration from './pages/Regitser'
import NotFound404 from './pages/NotFound404'
import Login from './pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'
import EditProduct from './pages/EditProduct'
import DeleteProduct from './pages/DeleteProduct'
import AdminRoutes from './utils/AdminRoutes'
import Checkout from './pages/Checkout'
import ErrorBoundary from './ErrorBoundary/Errorboundary'

import { userProfile } from './redux/slices/userSlice'
import { getProducts } from './redux/slices/products'

const Cart = lazy(() => import('./pages/Cart'))

function App() {
  const dispatch = useDispatch()

useEffect(() => {
  dispatch(userProfile())
}, [dispatch])
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/product/cart" element={<Cart />} />
            <Route path="/product/cart/checkout" element={<Checkout />} />
          </Route>

          <Route element={<AdminRoutes />}>
            <Route path="/product/add" element={<AddProduct />} />
            <Route path="/product/:id/edit" element={<EditProduct />} />
            <Route path="/product/:id/delete" element={<DeleteProduct />} />
          </Route>

          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App