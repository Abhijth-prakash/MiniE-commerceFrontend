import React from 'react'

const Loading = () => {
  return (
    <div>
        <div className="flex flex-col justify-center items-center h-96 gap-4">
  <div className="w-9 h-9 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
  <p className="text-sm text-gray-400">Loading...</p>
</div>
      
    </div>
  )
}

export default Loading
