import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a110d] text-[#f4ebd0] text-center px-6">
                    <p className="font-bold text-2xl mb-2">Something went wrong.</p>
                    <p className="text-sm opacity-60 mb-6">The clinic is temporarily closed. Please try again.</p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="px-6 py-2 bg-[#c05621] text-[#f4ebd0] rounded-lg font-semibold hover:opacity-80 transition"
                    >
                        Try Again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
