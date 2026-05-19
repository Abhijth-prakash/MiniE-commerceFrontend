import { useNavigate } from 'react-router-dom'

function NotFound404() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-[120px] font-medium text-gray-200 leading-none">404</p>
      <h1 className="text-2xl font-medium text-gray-800 mt-4 mb-2">Page not found</h1>
      <p className="text-gray-500 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
      >
        Go back home
      </button>
    </div>
  )
}

export default NotFound404