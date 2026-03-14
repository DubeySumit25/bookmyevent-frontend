import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import toast from 'react-hot-toast'
import { format } from 'date-fns'
import { FiPlus, FiEdit, FiCheckCircle, FiXCircle } from 'react-icons/fi'

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchMyEvents()
  }, [])

  const fetchMyEvents = async () => {
    try {
      const res = await api.get('/events/organizer/my-events')
      setEvents(res.data.data)
    } catch (err) {
      toast.error('Failed to load events!')
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async (id) => {
    try {
      await api.put(`/events/organizer/publish/${id}`)
      toast.success('Event published!')
      fetchMyEvents()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to publish!')
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this event?')) return
    try {
      await api.put(`/events/organizer/cancel/${id}`)
      toast.success('Event cancelled!')
      fetchMyEvents()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel!')
    }
  }

  const statusColor = {
    PUBLISHED: 'bg-green-500/20 text-green-400 border-green-500/30',
    DRAFT: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    CANCELLED: 'bg-red-500/20 text-red-400 border-red-500/30',
    COMPLETED: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Events 🎪</h1>
          <p className="text-gray-400">Manage your events</p>
        </div>
        <button
          onClick={() => navigate('/organizer/create')}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-3 rounded-lg transition font-semibold"
        >
          <FiPlus /> Create Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {['DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED'].map(status => (
          <div key={status} className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">
              {events.filter(e => e.status === status).length}
            </p>
            <p className="text-gray-400 text-sm">{status}</p>
          </div>
        ))}
      </div>

      {/* Events Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-purple-400 animate-pulse">Loading...</div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl mb-4">No events yet 😔</p>
          <button
            onClick={() => navigate('/organizer/create')}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg transition"
          >
            Create your first event!
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-gray-900 border border-gray-800 hover:border-purple-800 rounded-xl p-5 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                {/* Event Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-bold text-lg">{event.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border ${statusColor[event.status]}`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                    <span>📍 {event.venue}, {event.city}</span>
                    <span>📅 {format(new Date(event.eventDate), 'dd MMM yyyy')}</span>
                    <span>🎟️ {event.availableSeats}/{event.totalSeats} seats</span>
                    <span>💰 ₹{event.ticketPrice}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {event.status === 'DRAFT' && (
                    <button
                      onClick={() => handlePublish(event.id)}
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-lg text-sm transition"
                    >
                      <FiCheckCircle /> Publish
                    </button>
                  )}
                  {event.status !== 'CANCELLED' && event.status !== 'COMPLETED' && (
                    <button
                      onClick={() => handleCancel(event.id)}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-lg text-sm transition"
                    >
                      <FiXCircle /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrganizerDashboard