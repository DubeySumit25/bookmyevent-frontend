import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiLogOut, FiCalendar, FiBookmark } from 'react-icons/fi'

const Navbar = () => {
  const { user, logout, isOrganizer, isBuyer } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/')
  }

  return (
    <nav className="bg-gray-900 border-b border-purple-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-purple-400 tracking-tight">
        🎟️ BookMyEvent
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/events"
          className="text-gray-300 hover:text-purple-400 transition flex items-center gap-1"
        >
          <FiCalendar /> Events
        </Link>

        {isBuyer() && (
          <Link
            to="/my-bookings"
            className="text-gray-300 hover:text-purple-400 transition flex items-center gap-1"
          >
            <FiBookmark /> My Bookings
          </Link>
        )}

        {isOrganizer() && (
          <Link
            to="/organizer/dashboard"
            className="text-gray-300 hover:text-purple-400 transition"
          >
            Dashboard
          </Link>
        )}

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-purple-300 text-sm">Hi, {user.fullName}!</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-gray-300 hover:text-purple-400 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar