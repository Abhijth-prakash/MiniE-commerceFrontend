import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../redux/slices/products'

const Pagination = () => {
    const dispatch = useDispatch()
    const {page,pages} = useSelector(state=>state.Products)
  return (
    <div className="flex items-center justify-center gap-4 py-8">
        <button
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition
                ${page === 1
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-[#ffd200] cursor-pointer"
                }`}
        >
            ← Prev
        </button>
        <span className="text-sm text-gray-400">
            <span className="text-[#1a1a2e] font-bold">{page}</span> of <span className="text-[#1a1a2e] font-bold">{pages}</span>
        </span>
        <button
            disabled={page === pages}
            onClick={() => dispatch(setPage(page + 1))}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition
                ${page === pages
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-[#ffd200] cursor-pointer"
                }`}
        >
            Next →
        </button>
    </div>
)
}

export default Pagination
