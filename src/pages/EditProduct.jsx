import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { editSchema, schema } from '../schema/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Navbar from '../components/Navbar'
import { getProduct, getProducts, updateProducts } from '../redux/slices/products'
const baseURL = import.meta.env.VITE_API_BASE

const EditProduct = () => {

    const navigate = useNavigate()
    const { product, error } = useSelector(state => state.Products)
    const { id } = useParams()
    const dispatch = useDispatch()

useEffect(() => {
    dispatch(getProduct(id))
}, [dispatch, id])

    const { register, handleSubmit, formState, watch,reset } = useForm({
        resolver: zodResolver(editSchema),
        defaultValues: {
        name: "",
        price: "",
        category: "",
        description: "",
        rating:""
}
    })

useEffect(() => {
    if (product) {
        reset({
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description?product.description:"",
            rating: product.rating ?? "",
            image: undefined
        })
    }
}, [product, reset])

    const { errors } = formState

    const imageurl = watch("image")
    const previewImage =
    imageurl instanceof FileList && imageurl.length > 0
        ? URL.createObjectURL(imageurl[0])
        : `${baseURL}/public/productImages/${product?.image}`

const dataHandle = async (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('description', data.description)
    formData.append('rating', data.rating)
    if (data.image && data.image[0]) {
        formData.append('image', data.image[0])
    }

    const result = await dispatch(updateProducts({ ProductData: formData, id }))
    if (!result.error) {
        navigate('/home')
    }
}

    return (
        <div className="min-h-screen bg-[#f7f5f2]">
            <Navbar />

            <div className="flex items-center justify-center py-12 px-4">
                <div className="bg-white rounded-xl border border-[#ede9e3] shadow-sm w-full max-w-md p-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#1a1a2e]">Update Product</h2>
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
                                    <img
                                        src={previewImage}
                                        alt="preview"
                                        className="w-full h-full object-contain"
                                    />
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
                                Update Product
                            </button>
                        </div>
                        {error && <p className="text-red-400 text-xs text-center mt-2">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct