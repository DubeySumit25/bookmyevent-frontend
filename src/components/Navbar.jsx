import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiLogOut, FiCalendar, FiBookmark, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

const Navbar = () => {
  const { user, logout, isOrganizer, isBuyer } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out!')
    navigate('/')
    setMenuOpen(false)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="bg-gray-900 border-b border-purple-800 px-6 py-4 sticky top-0 z-50">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-purple-400 tracking-tight">
          🎟️ BookMyEvent
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
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

        {/* Hamburger Button - Mobile only */}
        <button
          className="md:hidden text-purple-400 text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 border-t border-purple-800 pt-4">
          <Link
            to="/events"
            onClick={closeMenu}
            className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2"
          >
            <FiCalendar /> Events
          </Link>

          {isBuyer() && (
            <Link
              to="/my-bookings"
              onClick={closeMenu}
              className="text-gray-300 hover:text-purple-400 transition flex items-center gap-2"
            >
              <FiBookmark /> My Bookings
            </Link>
          )}

          {isOrganizer() && (
            <Link
              to="/organizer/dashboard"
              onClick={closeMenu}
              className="text-gray-300 hover:text-purple-400 transition"
            >
              Dashboard
            </Link>
          )}

          {user ? (
            <div className="flex flex-col gap-3">
              <span className="text-purple-300 text-sm">Hi, {user.fullName}!</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition w-fit"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-gray-300 hover:text-purple-400 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition w-fit"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar