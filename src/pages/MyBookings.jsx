import { useState, useEffect } from 'react'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { FiCalendar, FiMapPin, FiHash } from 'react-icons/fi'

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/my-bookings')
      setBookings(res.data.data)
    } catch (err) {
      toast.error('Failed to load bookings!')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this booking?')) return
    try {
      await api.put(`/bookings/cancel/${id}`)
      toast.success('Booking cancelled!')
      fetchBookings()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel!')
    }
  }

  const statusColor = {
    CONFIRMED: 'bg-green-500/20 text-green-400 border-green-500/30',
    PENDING: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    CANCELLED: 'bg-red-500/20 text-red-400 border-red-500/30',
    REFUNDED: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-400 animate-pulse">Loading bookings...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">My Bookings 🎟️</h1>
        <p className="text-gray-400">All your event bookings in one place</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🎭</p>
          <p className="text-gray-400 text-xl mb-4">No bookings yet!</p>
          <a href="/events" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg transition inline-block">
            Browse Events
          </a>
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-gray-900 border border-gray-800 hover:border-purple-800 rounded-xl p-6 transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">{booking.eventTitle}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full border ${statusColor[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-purple-400 font-bold text-xl">₹{booking.totalAmount}</p>
                  <p className="text-gray-500 text-sm">{booking.numberOfTickets} ticket(s)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-400 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <FiMapPin className="text-purple-400" />
                  <span>{booking.eventVenue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-purple-400" />
                  <span>{format(new Date(booking.eventDate), 'dd MMM yyyy, hh:mm a')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiHash className="text-purple-400" />
                  <span>Ref: {booking.bookingReference}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-500 text-xs mb-2">TICKET NUMBERS</p>
                <div className="flex flex-wrap gap-2">
                  {booking.ticketNumbers.map(ticket => (
                    <span key={ticket} className="bg-purple-900/40 border border-purple-700 text-purple-300 text-xs px-3 py-1 rounded-full">
                      {ticket}
                    </span>
                  ))}
                </div>
              </div>

              {booking.status === 'CONFIRMED' && (
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="bg-red-600/20 hover:bg-red-600 border border-red-600/40 text-red-400 hover:text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings