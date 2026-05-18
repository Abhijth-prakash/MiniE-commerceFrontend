import React from 'react'
import { useSelector } from 'react-redux'
const baseURL = import.meta.env.VITE_API_BASE

const ProductCard = () => {

    const {products, loading, error, page, pages,search} = useSelector(state => state.Products)
    const searchText = search.toLowerCase()
  return (
    <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-6">
            {products
                .filter(item => item.name.toLowerCase().includes(searchText))
                .map(item => (
                    <div key={item._id} className="bg-white rounded-xl border border-[#ede9e3] overflow-hidden cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-200">
                        <div className="h-48 bg-[#f7f5f2] flex items-center justify-center overflow-hidden relative p-4">
                            <img
                                src={`${baseURL}/public/productImages/${item.image}`}
                                alt={item.name}
                                className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            <span className="absolute top-2 left-2 bg-[#1a1a2e]/75 text-[#ffd200] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                                {item.category}
                            </span>
                        </div>
                        <div className="p-3">
                            <p className="text-sm font-semibold text-[#1a1a2e] truncate">{item.name}</p>
                            <p className="text-base font-bold text-[#1a1a2e] mt-1">
                                ₹{item.price.toLocaleString('en-IN')}
                                <span className="text-[11px] font-normal text-gray-400 ml-1">incl. taxes</span>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
      
    </div>
  )
}

export default ProductCard
