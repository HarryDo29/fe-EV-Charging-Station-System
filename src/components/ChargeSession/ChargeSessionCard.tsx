import type { ExistingBooking } from '../../types/station'

const ChargeSessionCard = ({ booking }: { booking: ExistingBooking }) => {
  return (
    <div
      key={booking.id}
      className='bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 transition-colors'
    >
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-lg font-semibold text-gray-900'>{booking.station}</h3>
        {booking.status === 'completed' ? (
          <span className='px-3 py-1 bg-green-50 text-green-600 text-sm font-medium rounded-md border border-green-200'>
            Hoàn thành
          </span>
        ) : (
          <span className='px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-md border border-blue-200'>
            Sắp tới
          </span>
        )}
      </div>

      <div className='flex items-center justify-between text-sm'>
        <div className='space-y-1 text-gray-600'>
          <div className='flex items-center gap-2'>
            <span>📅</span>
            <span>{booking.date}</span>
            <span className='text-gray-400'>•</span>
            <span>🕐</span>
            <span>{booking.startTime}</span>
            <span className='text-gray-400'>•</span>
            <span>🕐</span>
            <span>{booking.endTime}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span>⚡</span>
            <span>Công suất: {booking.power} kWh</span>
          </div>
        </div>

        <div className='text-right'>
          <p className='text-xs text-gray-500 mb-1'>Tổng tiền</p>
          <p className='text-xl font-bold text-blue-600'>{booking.price}</p>
        </div>
      </div>
    </div>
  )
}

export default ChargeSessionCard
