import { useState } from 'react'
import { FiX, FiCreditCard, FiSmartphone, FiGlobe } from 'react-icons/fi'

const PaymentModal = ({ event, tickets, totalAmount, onSuccess, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [loading, setLoading] = useState(false)
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })
  const [upiId, setUpiId] = useState('')

  const handlePayment = async () => {
    setLoading(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div>
            <h2 className="text-white font-bold text-xl">Complete Payment</h2>
            <p className="text-gray-400 text-sm">{event.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Order Summary */}
        <div className="p-5 border-b border-gray-800">
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex justify-between text-gray-300 mb-2">
              <span>Tickets</span>
              <span>{tickets} × ₹{event.ticketPrice}</span>
            </div>
            <div className="flex justify-between text-gray-300 mb-2">
              <span>Convenience fee</span>
              <span className="text-green-400">FREE</span>
            </div>
            <div className="border-t border-gray-700 pt-2 mt-2 flex justify-between text-white font-bold text-lg">
              <span>Total</span>
              <span className="text-purple-400">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-5">
          <p className="text-gray-400 text-sm mb-3">Select Payment Method</p>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {/* Card */}
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition ${
                paymentMethod === 'card'
                  ? 'border-purple-500 bg-purple-900/30'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <FiCreditCard className={paymentMethod === 'card' ? 'text-purple-400' : 'text-gray-400'} size={20} />
              <span className={`text-xs ${paymentMethod === 'card' ? 'text-purple-300' : 'text-gray-400'}`}>Card</span>
            </button>

            {/* UPI */}
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition ${
                paymentMethod === 'upi'
                  ? 'border-purple-500 bg-purple-900/30'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <FiSmartphone className={paymentMethod === 'upi' ? 'text-purple-400' : 'text-gray-400'} size={20} />
              <span className={`text-xs ${paymentMethod === 'upi' ? 'text-purple-300' : 'text-gray-400'}`}>UPI</span>
            </button>

            {/* Net Banking */}
            <button
              onClick={() => setPaymentMethod('netbanking')}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition ${
                paymentMethod === 'netbanking'
                  ? 'border-purple-500 bg-purple-900/30'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <FiGlobe className={paymentMethod === 'netbanking' ? 'text-purple-400' : 'text-gray-400'} size={20} />
              <span className={`text-xs ${paymentMethod === 'netbanking' ? 'text-purple-300' : 'text-gray-400'}`}>Net Banking</span>
            </button>
          </div>

          {/* Card Form */}
          {paymentMethod === 'card' && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Card Number"
                maxLength={19}
                value={cardData.number}
                onChange={(e) => {
                  let val = e.target.value.replace(/\D/g, '')
                  val = val.replace(/(.{4})/g, '$1 ').trim()
                  setCardData({ ...cardData, number: val })
                }}
                className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
              />
              <input
                type="text"
                placeholder="Cardholder Name"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={cardData.expiry}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '')
                    if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2)
                    setCardData({ ...cardData, expiry: val })
                  }}
                  className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  maxLength={3}
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
                />
              </div>
            </div>
          )}

          {/* UPI Form */}
          {paymentMethod === 'upi' && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Enter UPI ID (e.g. sumit@upi)"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition"
              />
              <div className="grid grid-cols-4 gap-2">
                {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                  <button
                    key={app}
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-xs py-2 px-1 rounded-lg transition"
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Net Banking */}
          {paymentMethod === 'netbanking' && (
            <div className="space-y-3">
              <select className="w-full bg-gray-800 border border-gray-700 focus:border-purple-500 text-white rounded-lg px-4 py-3 outline-none transition">
                <option value="">Select Bank</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Kotak Mahindra Bank</option>
                <option>Punjab National Bank</option>
                <option>Bank of Baroda</option>
              </select>
            </div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full mt-5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition text-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Processing Payment...
              </span>
            ) : (
              `Pay ₹${totalAmount} 🔒`
            )}
          </button>

          <p className="text-center text-gray-500 text-xs mt-3">
            🔒 100% Secure Payment
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal