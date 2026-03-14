import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.js'
import toast from 'react-hot-toast'

const CreateEvent = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    venue: '',
    city: '',
    eventDate: '',
    bookingDeadline: '',
    totalSeats: '',
    ticketPrice: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/events/organizer/create', {
        ...formData,
        totalSeats: parseInt(formData.totalSeats),
        ticketPrice: parseFloat(formData.ticketPrice),
      })
      toast.success('Event created successfully!')
      navigate('/organizer/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create event!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/organizer/dashboard')}
          className="text-gray-400 hover:text-purple-400 mb-4 flex items-center gap-2 transition"
        >
          ← Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-white">Create New Event 🎪</h1>
        <p className="text-gray-400 mt-1">Fill in the details for your event</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-5">

        {/* Title */}
        <div>
          <label className="text-gray-300 text-sm mb-1 block">Event Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Coldplay Concert Mumbai"
            required
            className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-gray-300 text-sm mb-1 block">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell people about your event..."
            rows={3}
            className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition resize-none"
          />
        </div>

        {/* Venue + City */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Venue *</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="DY Patil Stadium"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm mb-1 block">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Mumbai"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
            />
          </div>
        </div>

        {/* Event Date + Booking Deadline */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Event Date *</label>
            <input
              type="datetime-local"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Booking Deadline *</label>
            <input
              type="datetime-local"
              name="bookingDeadline"
              value={formData.bookingDeadline}
              onChange={handleChange}
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
            />
          </div>
        </div>

        {/* Seats + Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Total Seats *</label>
            <input
              type="number"
              name="totalSeats"
              value={formData.totalSeats}
              onChange={handleChange}
              placeholder="100"
              min="1"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
            />
          </div>
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Ticket Price (₹) *</label>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              placeholder="2500"
              min="0"
              required
              className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate('/organizer/dashboard')}
            className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? 'Creating...' : 'Create Event 🎪'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateEvent