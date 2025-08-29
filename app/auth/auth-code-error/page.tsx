import Link from 'next/link'

export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-red-800 mb-4">Authentication Error</h1>
        <p className="text-red-700 mb-6">
          Sorry, we couldn't complete your authentication. This might be due to:
        </p>
        <ul className="text-left text-red-600 mb-6 space-y-2">
          <li>• The authentication link has expired</li>
          <li>• There was an issue with Discord's servers</li>
          <li>• Your account may not have access</li>
        </ul>
        <div className="space-y-3">
          <Link 
            href="/departments" 
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Try Again
          </Link>
          <Link 
            href="/" 
            className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}
