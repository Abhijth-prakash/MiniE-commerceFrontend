import React from 'react'

const Noproductfound = () => {
  return (
    <div>
        <div className="flex flex-col items-center justify-center h-64 gap-3">
  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zM9 9l6 6" />
    </svg>
  </div>
  <p className="text-base font-medium text-gray-700">No products found</p>
  <p className="text-sm text-gray-400">Try a different search or filter</p>
</div>
      
    </div>
  )
}

export default Noproductfound
