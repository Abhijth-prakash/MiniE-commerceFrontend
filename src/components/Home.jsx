import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../redux/slices/products'

const Home = () => {

    const {products, loading, error} = useSelector(state => state.Products)
    const dispatch = useDispatch()

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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(item => (
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