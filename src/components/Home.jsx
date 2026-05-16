import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../redux/slices/products'

const Home = () => {

    const {products, loading, error} = useSelector(state => state.Products)
    const dispatch = useDispatch()
    const [input,setInput] = useState("")
    const [sort, setSort] = useState("")
    const [filter, setFilter] = useState("")
    useEffect(() => {
        dispatch(getProducts())
    }, [])

    if(loading) return <div className="flex justify-center items-center min-h-screen text-xl">Loading...</div>


    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                    <Link to='/add' className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Add Product
                    </Link>
                </div>

                {/* //search bar */}
                <input type="text" placeholder='search' value={input} onChange={(e)=> setInput(e.target.value)} />
               <br/> <br />
             <select value={sort} onChange={(e) => setSort(e.target.value)}>
             <option value="">Sort</option>
             <option value="low">Price: Low to High</option>
             <option value="high">Price: High to Low</option>
            </select>
             <select value={filter} onChange={(e) => setFilter(e.target.value)}>
             <option value="">filter</option>
             <option value="electronics">Electronics</option>
             <option value="Clothing">Clothing</option>
             <option value="Shoes">Shoes</option>
             <option value="Books">Books</option>
             <option value="Furniture">Furniture</option>
             <option value="Toys">Toys</option>
            </select>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products
                      .filter(item => item.name.toLowerCase().includes(input.toLowerCase()))
                      .filter(item => filter ? item.category === filter : true)
                      .sort((a, b) => {
                      if (sort === "low") return a.price - b.price
                      if (sort === "high") return b.price - a.price
                      return 0
                     })
                    .map(item => (
                        <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                src={`http://localhost:8888/public/productImages/${item.image}`}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                                <p className="text-blue-500 font-bold mt-1">${item.price}</p>
                                <p className="text-gray-500 text-sm mt-1">{item.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home