import { authClient } from '@/lib/auth-client'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/register')({
  component: Register,
})

function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit =  async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Collected Data:', formData)

    // Example: validate before sending
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

     await authClient.signUp.email({
        email:formData.email, // user email address
        password:formData.password, // user password -> min 8 characters by default
        name: formData.fullName, // user display name
        // image, // User image URL (optional)
        callbackURL: "/tasks" // A URL to redirect to after the user verifies their email (optional)
    }, {
        onRequest: () => {
            //show loading
            
        },
        onSuccess: () => {
            //redirect to the dashboard or sign in page
            router.navigate({ to: '/tasks' })
            //show success message
            alert('Registration successful! Please check your email to verify your account.')
            //clear the form
            setFormData({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
            })
            //clear the error message
            // setError('')
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        },
  });

    // TODO: Send formData to backend API
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{' '}
          <a
            href="/"
            className="text-blue-500 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
