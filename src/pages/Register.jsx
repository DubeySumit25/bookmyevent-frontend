import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../api/axios.js'
import toast from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'ROLE_BUYER'
  })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/auth/register', formData)
      login(res.data.data)
      toast.success('Account created!')
      if (res.data.data.role === 'ROLE_ORGANIZER') {
        navigate('/organizer/dashboard')
      } else {
        navigate('/events')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account 🎉</h1>
          <p className="text-gray-400">Join BookMyEvent today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Sumit Dubey"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">I want to</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'ROLE_BUYER' })}
                className={`py-3 rounded-lg border-2 transition font-semibold ${
                  formData.role === 'ROLE_BUYER'
                    ? 'border-purple-500 bg-purple-900 text-purple-300'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                🎟️ Buy Tickets
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'ROLE_ORGANIZER' })}
                className={`py-3 rounded-lg border-2 transition font-semibold ${
                  formData.role === 'ROLE_ORGANIZER'
                    ? 'border-purple-500 bg-purple-900 text-purple-300'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                🎪 Organize
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register