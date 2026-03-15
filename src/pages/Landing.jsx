import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { FiCalendar, FiUsers, FiMail } from 'react-icons/fi'

const Landing = () => {
  const navigate = useNavigate()
  const { user, isOrganizer } = useAuth()

  return (
    <div className="overflow-x-hidden">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-950 via-gray-900 to-gray-950 py-16 px-4 text-center overflow-hidden w-full">

        {/* Background circles */}
        <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block bg-purple-900/50 border border-purple-700 text-purple-300 text-xs sm:text-sm px-3 py-2 rounded-full mb-6">
            🎉 India's coolest event platform
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Book Amazing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {' '}Events
            </span>
          </h1>

          <p className="text-gray-400 text-base sm:text-xl mb-10 max-w-2xl mx-auto px-2">
            Discover concerts, shows, workshops and more.
            Book your tickets in seconds!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button
              onClick={() => navigate('/events')}
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-4 rounded-xl transition text-base sm:text-lg w-full sm:w-auto"
            >
              Browse Events 🎟️
            </button>
            {!user && (
              <button
                onClick={() => navigate('/register')}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition text-base sm:text-lg w-full sm:w-auto"
              >
                Get Started →
              </button>
            )}
            {user && isOrganizer() && (
              <button
                onClick={() => navigate('/organizer/dashboard')}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition text-base sm:text-lg w-full sm:w-auto"
              >
                My Dashboard →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">
          Why BookMyEvent?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-700 transition">
            <div className="bg-purple-900/50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="text-purple-400 text-2xl" />
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Easy Booking</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Book tickets in seconds. No hassle, no queues.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-700 transition">
            <div className="bg-purple-900/50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiUsers className="text-purple-400 text-2xl" />
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-2">For Organizers</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Create and manage events with powerful dashboard.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-700 transition">
            <div className="bg-purple-900/50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-purple-400 text-2xl" />
            </div>
            <h3 className="text-white font-bold text-lg sm:text-xl mb-2">Instant Confirmation</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Get email confirmation instantly after booking.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900 to-gray-900 py-12 sm:py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-gray-400 mb-8 text-sm sm:text-base">
          Join thousands of event lovers today!
        </p>
        <button
          onClick={() => navigate('/register')}
          className="bg-white text-purple-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition text-base sm:text-lg w-full sm:w-auto max-w-xs"
        >
          Create Free Account 🚀
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 px-4 text-center text-gray-500 text-sm">
        <p>🎟️ BookMyEvent © 2024 | Built with Spring Boot + React</p>
      </footer>
    </div>
  )
}

export default Landing