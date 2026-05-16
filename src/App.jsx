import { Route, Routes } from 'react-router-dom'
import AddProduct from './components/AddProduct'
import Home from './components/Home'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/add' element={<AddProduct></AddProduct>}></Route>
    </Routes>
    </>
  )
}

export default App
