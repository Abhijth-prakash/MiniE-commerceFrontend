import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts } from '../redux/slices/products'
import { useNavigate } from 'react-router-dom'
import {schema} from '../schema/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Navbar from '../components/Navbar'
import toast, { Toaster } from 'react-hot-toast'

const AddProduct = () => {
    const {register, handleSubmit, formState, watch} = useForm({
        resolver: zodResolver(schema)
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {errors} = formState
    const { error } = useSelector(state => state.Products)
    const imageFile = watch("image")
    const previewImage =
    imageFile && imageFile.length > 0
    ? URL.createObjectURL(imageFile[0])
    : null

const dataHandle = async (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('description', data.description)
    formData.append('rating', data.rating)
    formData.append('image', data.image[0])

    const result = await dispatch(addProducts(formData))
    if (!result.error) {
        toast.success('Product added successfully!')
        setTimeout(() => navigate('/home'), 1500) 
    } else {
        toast.error(result.payload || 'Failed to add product.')
    }
}

    return (
        <div className="min-h-screen bg-[#f7f5f2]">
            <Toaster position="top-right" />
            <Navbar />

            <div className="flex items-center justify-center py-12 px-4">
                <div className="bg-white rounded-xl border border-[#ede9e3] shadow-sm w-full max-w-md p-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#1a1a2e]">Add Product</h2>
                        <p className="text-sm text-gray-400 mt-1">Fill in the details to list a new product</p>
                    </div>

                    <form onSubmit={handleSubmit(dataHandle)} className="flex flex-col gap-5">

                        {/* Name */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-[#1a1a2e] uppercase tracking-wide">Product Name</label>
                            <input
                                type="text"
                                {...register("name")}
                                placeholder="e.g. Wireless Headphones"
                                className="border border-[#ede9e3] rounded-lg px-4 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#1a1a2e] transition placeholder-gray-300"
                            />
                            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-[#1a1a2e] uppercase tracking-wide">Price (₹)</label>
                            <input
                                type="text"
                                {...register("price")}
                                placeholder="e.g. 1299"
                                className="border border-[#ede9e3] rounded-lg px-4 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#1a1a2e] transition placeholder-gray-300"
                            />
                            {errors.price && <p className="text-red-400 text-xs">{errors.price.message}</p>}
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-[#1a1a2e] uppercase tracking-wide">Category</label>
                            <select
                                {...register("category")}
                                className="border border-[#ede9e3] rounded-lg px-4 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#1a1a2e] transition bg-white"
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Books">Books</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Toys">Toys</option>
                            </select>
                            {errors.category && <p className="text-red-400 text-xs">{errors.category.message}</p>}
                        </div>
                        

                       {/* description */}
<div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-[#1a1a2e] uppercase tracking-wide">
        Description
    </label>

    <textarea
        {...register("description")}
        rows={4}
        placeholder="Enter product description..."
        className="border border-[#ede9e3] rounded-lg px-4 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#1a1a2e] transition placeholder-gray-300 resize-none"
    />

    {errors.description && (
        <p className="text-red-400 text-xs">
            {errors.description.message}
        </p>
    )}
</div>


                       {/* rating */}
<div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-[#1a1a2e] uppercase tracking-wide">
        Rating
    </label>

    <input
        type="number"
        step="0.1"
        min="1"
        max="5"
        {...register("rating")}
        placeholder="e.g. 4.5"
        className="border border-[#ede9e3] rounded-lg px-4 py-2.5 text-sm text-[#1a1a2e] outline-none focus:border-[#1a1a2e] transition placeholder-gray-300"
    />

    {errors.rating && (
        <p className="text-red-400 text-xs">
            {errors.rating.message}
        </p>
    )}
</div>



                        {/* Image */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-medium text-[#1a1a2e] uppercase tracking-wide">Product Image</label>

                            <div className="flex items-center gap-4">

                                {/* Preview */}
                                <div className="w-20 h-20 rounded-xl border border-[#ede9e3] bg-[#f7f5f2] flex items-center justify-center overflow-hidden shrink-0">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="preview"
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                                            <polyline points="21 15 16 10 5 21"/>
                                        </svg>
                                    )}
                                </div>

                                {/* File input */}
                                <input
                                    type="file"
                                    {...register("image")}
                                    className="flex-1 border border-[#ede9e3] rounded-lg px-4 py-2.5 text-sm text-gray-400 outline-none focus:border-[#1a1a2e] transition file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-[#1a1a2e] file:text-[#ffd200] cursor-pointer"
                                />
                            </div>

                            {errors.image && <p className="text-red-400 text-xs">{errors.image.message}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/home')}
                                className="flex-1 py-2.5 rounded-full text-sm font-medium border border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-[#ffd200] transition"
                            >
                                ← Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-2.5 rounded-full text-sm font-bold bg-[#1a1a2e] text-[#ffd200] hover:opacity-90 transition"
                            >
                                Add Product
                            </button>
                        </div>
                        {error && <p className="text-red-400 text-xs text-center mt-2">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProduct