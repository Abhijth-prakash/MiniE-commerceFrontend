import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.error("Error caught:", error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[#f7f5f2]">
                    <div className="bg-white border border-[#ede9e3] rounded-2xl shadow-sm w-full max-w-sm p-8 text-center">
                        <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-[#1a1a2e] mb-1">Something went wrong</h2>
                        <p className="text-sm text-gray-400 mb-6">An unexpected error occurred. Please try again.</p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="w-full bg-[#1a1a2e] text-[#ffd200] font-bold text-sm py-2.5 rounded-full hover:opacity-90 transition"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary