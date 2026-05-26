import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../redux/slices/cartSlice'

const Cart = () => {
    const dispatch = useDispatch()
    const {cartItems} = useSelector(state=> state.cart)

    useEffect(()=>{
        dispatch(getCart())
    },[])
    const listItems = cartItems.map(items => <li key={items._id}>{items.product.name}</li>)
  return (
    <div>
      <h1>this is Cart</h1>
      <ol>{listItems}</ol>
    </div>
  )
}

export default Cart
