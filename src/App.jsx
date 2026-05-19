import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Registration from './pages/Registration'
import NotFound404 from './pages/NotFound404'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/add' element={<AddProduct></AddProduct>}></Route>
      <Route path='/registration' element={<Registration></Registration>}></Route>
      <Route path='*' element={<NotFound404></NotFound404>}></Route>
    </Routes>
    </>
  )
}

export default App
