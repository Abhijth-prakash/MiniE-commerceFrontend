import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { addProducts } from '../redux/slices/products'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dataHandle = (data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('price', data.price)
        formData.append('category', data.category)
        formData.append('image', data.image[0])
        dispatch(addProducts(formData))
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Product</h2>

                <form onSubmit={handleSubmit(dataHandle)} className="flex flex-col gap-4">
                    <input
                        type="text"
                        {...register("name")}
                        placeholder="Product Name"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        {...register("price")}
                        placeholder="Price"
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        {...register("category")}
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                    >
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Books">Books</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Toys">Toys</option>
                    </select>
                    <input
                        type="file"
                        {...register("image")}
                        className="border border-gray-300 rounded-md px-4 py-2 text-gray-600"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 font-semibold"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct