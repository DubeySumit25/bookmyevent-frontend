import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi'

const EventCard = ({ event }) => {
  const navigate = useNavigate()

  const statusColor = {
    PUBLISHED: 'bg-green-500',
    DRAFT: 'bg-yellow-500',
    CANCELLED: 'bg-red-500',
    COMPLETED: 'bg-gray-500',
  }

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="bg-gray-800 border border-gray-700 hover:border-purple-500 rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-900/30 hover:-translate-y-1"
    >
      {/* Status badge */}
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs text-white px-2 py-1 rounded-full ${statusColor[event.status]}`}>
          {event.status}
        </span>
        <span className="text-purple-400 font-bold text-lg">
          ₹{event.ticketPrice}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-white font-bold text-xl mb-3 line-clamp-2">
        {event.title}
      </h3>

      {/* Details */}
      <div className="space-y-2 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <FiMapPin className="text-purple-400" />
          <span>{event.venue}, {event.city}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-purple-400" />
          <span>{format(new Date(event.eventDate), 'dd MMM yyyy, hh:mm a')}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiUsers className="text-purple-400" />
          <span>{event.availableSeats} seats left</span>
        </div>
      </div>

      {/* Seats bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all"
            style={{
              width: `${(event.availableSeats / event.totalSeats) * 100}%`
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {event.totalSeats - event.availableSeats}/{event.totalSeats} booked
        </p>
      </div>
    </div>
  )
}

export default EventCard