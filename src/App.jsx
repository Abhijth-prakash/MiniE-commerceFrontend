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


function App() {

  const dispatch = useDispatch()
 
    //getting user details on every mounting
useEffect(() => {
        dispatch(userProfile())
}, [])




  return (
    <>
    <Routes>
      <Route path='/' element={<Login></Login>}></Route>
      <Route path='/register' element={<Registration></Registration>}></Route>

    {/* Protected routes */}
      <Route element={<ProtectedRoutes />}>
      <Route path='/home' element={<Home />} />
      <Route path='/add' element={<AddProduct />} />
      <Route path='*' element={<NotFound404 />} />
      </Route>

    </Routes>
    </>
  )
}

export default App
