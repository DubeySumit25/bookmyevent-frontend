import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { FiCalendar, FiUsers, FiMail } from 'react-icons/fi'

const Landing = () => {
  const navigate = useNavigate()
  const { user, isOrganizer } = useAuth()

  return (
    <div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-950 via-gray-900 to-gray-950 py-24 px-6 text-center overflow-hidden">

        {/* Background circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block bg-purple-900/50 border border-purple-700 text-purple-300 text-sm px-4 py-2 rounded-full mb-6">
            🎉 India's coolest event platform
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold text-white mb-6 leading-tight">
            Book Amazing
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {' '}Events
            </span>
          </h1>

          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Discover concerts, shows, workshops and more.
            Book your tickets in seconds!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/events')}
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-4 rounded-xl transition text-lg"
            >
              Browse Events 🎟️
            </button>
            {!user && (
              <button
                onClick={() => navigate('/register')}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition text-lg"
              >
                Get Started →
              </button>
            )}
            {user && isOrganizer() && (
              <button
                onClick={() => navigate('/organizer/dashboard')}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition text-lg"
              >
                My Dashboard →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Why BookMyEvent?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-700 transition">
            <div className="bg-purple-900/50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="text-purple-400 text-2xl" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Easy Booking</h3>
            <p className="text-gray-400">
              Book tickets in seconds. No hassle, no queues.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-700 transition">
            <div className="bg-purple-900/50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiUsers className="text-purple-400 text-2xl" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">For Organizers</h3>
            <p className="text-gray-400">
              Create and manage events with powerful dashboard.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center hover:border-purple-700 transition">
            <div className="bg-purple-900/50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-purple-400 text-2xl" />
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Instant Confirmation</h3>
            <p className="text-gray-400">
              Get email confirmation instantly after booking.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900 to-gray-900 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-gray-400 mb-8">
          Join thousands of event lovers today!
        </p>
        <button
          onClick={() => navigate('/register')}
          className="bg-white text-purple-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition text-lg"
        >
          Create Free Account 🚀
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 px-6 text-center text-gray-500">
        <p>🎟️ BookMyEvent © 2024 | Built with Spring Boot + React</p>
      </footer>
    </div>
  )
}

export default Landing