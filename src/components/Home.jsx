import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../redux/slices/products'

const Home = () => {

    const {products,loading,error} = useSelector(state=> state.Products)
    const dispatch = useDispatch()

     useEffect(()=>{
        dispatch(getProducts())
    },[])


    const listItems = products.map(items=> <li key={items._id}> 
    <span>{items.name}</span> 
    <span>{items.price}</span> 
   <img src={`http://localhost:8888/public/productImages/${items.image}`} alt={items.name} />
    </li>)


  return (
    <div>
      <h1>this is home page</h1>
      <Link to='/add'>Add product</Link>
      <ol>{listItems}</ol>
    </div>
  )
}

export default Home
