import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="Nota Logo"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            Welcome to Nota
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Your personal task management solution
          </p>
        </div>
      </div>

        
    </div>
  )
}
