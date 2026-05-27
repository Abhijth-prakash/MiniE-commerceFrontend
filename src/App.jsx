import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Registration from './pages/Regitser'
import NotFound404 from './pages/NotFound404'
import Login from './pages/Login'
import ProtectedRoutes from './utils/ProtectedRoutes'
import { lazy, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userProfile } from './redux/slices/userSlice'
import EditProduct from './pages/EditProduct'
import DeleteProduct from './pages/DeleteProduct'
import AdminRoutes from './utils/AdminRoutes'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ErrorBoundary from './ErrorBoundary/Errorboundary'
import { getCart } from './redux/slices/cartSlice'


function App() {

  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.cart)



  return (
    <ErrorBoundary>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Registration />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/product/cart' element={<Cart />} />
          <Route path='/product/cart/checkout' element={<Checkout />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminRoutes />}>
          <Route path='/product/add' element={<AddProduct />} />
          <Route path='/product/:id/edit' element={<EditProduct />} />
          <Route path='/product/:id/delete' element={<DeleteProduct />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App