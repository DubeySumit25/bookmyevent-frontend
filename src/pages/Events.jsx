import { useState, useEffect } from 'react'
import api from '../api/axios.js'
import EventCard from '../components/EventCard.jsx'
import toast from 'react-hot-toast'
import { FiSearch } from 'react-icons/fi'

const Events = () => {
  const [events, setEvents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    let result = events
    if (search) {
      result = result.filter(e =>
        e.title.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (city) {
      result = result.filter(e =>
        e.city.toLowerCase().includes(city.toLowerCase())
      )
    }
    setFiltered(result)
  }, [search, city, events])

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events/public/all')
      setEvents(res.data.data)
      setFiltered(res.data.data)
    } catch (err) {
      toast.error('Failed to load events!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">🎭 Browse Events</h1>
        <p className="text-gray-400 text-sm sm:text-base">Discover amazing events near you</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 w-full">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white outline-none w-full placeholder-gray-500"
          />
        </div>
        <input
          type="text"
          placeholder="Filter by city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white outline-none placeholder-gray-500 w-full sm:w-48"
        />
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="text-center text-purple-400 text-lg sm:text-xl animate-pulse py-20">
          Loading events...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          <p className="text-5xl mb-4">🎪</p>
          <p className="text-lg sm:text-xl">No events found!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Events