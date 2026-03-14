import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import { useAuth } from '../context/AuthContext.jsx'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { FiMapPin, FiCalendar, FiUsers, FiClock } from 'react-icons/fi'
import PaymentModal from '../components/PaymentModal.jsx'

const EventDetail = () => {
  const { id } = useParams()
  const { user, isBuyer } = useAuth()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tickets, setTickets] = useState(1)
  const [booking, setBooking] = useState(false)
  const [showPayment, setShowPayment] = useState(false)

  useEffect(() => {
    fetchEvent()
  }, [id])

  const fetchEvent = async () => {
    try {
      const res = await api.get(`/events/public/${id}`)
      setEvent(res.data.data)
    } catch (err) {
      toast.error('Event not found!')
      navigate('/events')
    } finally {
      setLoading(false)
    }
  }

  const handleBook = () => {
    if (!user) {
      toast.error('Please login to book tickets!')
      navigate('/login')
      return
    }
    if (!isBuyer()) {
      toast.error('Only buyers can book tickets!')
      return
    }
    setShowPayment(true)
  }

  const handlePaymentSuccess = async () => {
    setShowPayment(false)
    setBooking(true)
    try {
      await api.post('/bookings/book', {
        eventId: event.id,
        numberOfTickets: tickets
      })
      toast.success('Booking confirmed! Check your email 📧')
      navigate('/my-bookings')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed!')
    } finally {
      setBooking(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-purple-400 text-xl animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!event) return null

  const seatsPercent = (event.availableSeats / event.totalSeats) * 100

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      <button
        onClick={() => navigate('/events')}
        className="text-gray-400 hover:text-purple-400 mb-6 flex items-center gap-2 transition"
      >
        ← Back to Events
      </button>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">

        <div className="bg-gradient-to-r from-purple-900 to-gray-900 p-8">
          <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full mb-4 inline-block">
            {event.status}
          </span>
          <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
          <p className="text-gray-300">Organized by {event.organizerName}</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="space-y-5">
            <h2 className="text-white font-bold text-xl">Event Details</h2>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-start gap-3">
                <FiCalendar className="text-purple-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p>{format(new Date(event.eventDate), 'dd MMMM yyyy, hh:mm a')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="text-purple-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Venue</p>
                  <p>{event.venue}, {event.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiClock className="text-purple-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Booking Deadline</p>
                  <p>{format(new Date(event.bookingDeadline), 'dd MMMM yyyy, hh:mm a')}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiUsers className="text-purple-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Availability</p>
                  <p>{event.availableSeats} of {event.totalSeats} seats left</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${seatsPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {event.description && (
              <div>
                <h3 className="text-white font-semibold mb-2">About</h3>
                <p className="text-gray-400 leading-relaxed">{event.description}</p>
              </div>
            )}
          </div>

          <div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sticky top-24">
              <h2 className="text-white font-bold text-xl mb-4">Book Tickets</h2>

              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-1">Price per ticket</p>
                <p className="text-purple-400 text-3xl font-bold">₹{event.ticketPrice}</p>
              </div>

              <div className="mb-5">
                <p className="text-gray-300 text-sm mb-2">Number of tickets</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setTickets(Math.max(1, tickets - 1))}
                    className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-lg text-xl transition"
                  >
                    -
                  </button>
                  <span className="text-white text-xl font-bold w-8 text-center">
                    {tickets}
                  </span>
                  <button
                    onClick={() => setTickets(Math.min(10, tickets + 1))}
                    className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-lg text-xl transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4 mb-5">
                <div className="flex justify-between text-gray-300 mb-1">
                  <span>Subtotal</span>
                  <span>₹{event.ticketPrice * tickets}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span className="text-purple-400">₹{event.ticketPrice * tickets}</span>
                </div>
              </div>

              <button
                onClick={handleBook}
                disabled={booking || event.availableSeats === 0}
                className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
              >
                {booking ? 'Booking...' : event.availableSeats === 0 ? 'Sold Out' : 'Book Now 🎟️'}
              </button>

              {!user && (
                <p className="text-center text-gray-500 text-sm mt-3">
                  Please{' '}
                  <span
                    onClick={() => navigate('/login')}
                    className="text-purple-400 cursor-pointer hover:underline"
                  >
                    login
                  </span>{' '}
                  to book tickets
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          event={event}
          tickets={tickets}
          totalAmount={event.ticketPrice * tickets}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  )
}

export default EventDetail