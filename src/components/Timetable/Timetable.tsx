import type { ExistingBooking } from '../../types/station'

interface TimetableProps {
  getWeekDates: string[]
  weekBookings: { [key: string]: ExistingBooking[] }
  selectedDate: string
  selectedTime: string
  duration: number
  selectedDateBookings: ExistingBooking[]
}

const Timetable = ({
  getWeekDates,
  weekBookings,
  selectedDate,
  selectedTime,
  duration,
  selectedDateBookings
}: TimetableProps) => {
  return (
    <div className='bg-gray-50 rounded-lg p-0 overflow-x-auto'>
      <div className='flex items-center mb-3 text-xs text-gray-600'>
        <div className='flex items-center mr-4'>
          <div className='w-3 h-3 bg-green-500 rounded mr-1'></div>
          <span>Còn trống</span>
        </div>
        <div className='flex items-center mr-4'>
          <div className='w-3 h-3 bg-red-500 rounded mr-1'></div>
          <span>Đã đặt</span>
        </div>
        <div className='flex items-center'>
          <div className='w-3 h-3 bg-blue-500 rounded mr-1'></div>
          <span>Lịch của bạn</span>
        </div>
      </div>

      {/* Weekly Timeline grid - 6:00 to 22:00 */}
      <div className='min-w-[800px]'>
        {/* Week days header */}
        <div className='flex mb-2'>
          <div className='w-16 flex-shrink-0'></div>
          {getWeekDates.map((date) => {
            const dateObj = new Date(date)
            const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
            const dayName = dayNames[dateObj.getDay()]
            const isToday = date === new Date().toISOString().split('T')[0]
            const isSelectedDay = date === selectedDate

            return (
              <div key={date} className={`flex-1 text-center px-1 ${isSelectedDay ? 'font-bold' : ''}`}>
                <div className={`text-xs font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>{dayName}</div>
                <div className={`text-xs ${isToday ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                  {dateObj.getDate()}/{dateObj.getMonth() + 1}
                </div>
              </div>
            )
          })}
        </div>

        {/* Time slots */}
        <div className='space-y-1'>
          {Array.from({ length: 16 }, (_, i) => {
            const hour = i + 6
            const timeSlot = `${hour.toString().padStart(2, '0')}:00`

            return (
              <div key={timeSlot} className='flex items-stretch'>
                <span className='text-xs text-gray-600 w-16 flex-shrink-0 py-1'>{timeSlot}</span>
                {getWeekDates.map((date) => {
                  const dayBookings = weekBookings[date] || []

                  // Check if this hour has any bookings
                  const bookingsInSlot = dayBookings.filter((b) => timeSlot >= b.startTime && timeSlot < b.endTime)

                  // Check if this is the selected time slot on the selected date
                  const isSelectedSlot =
                    date === selectedDate &&
                    selectedTime &&
                    timeSlot >= selectedTime &&
                    (() => {
                      const [h, m] = selectedTime.split(':').map(Number)
                      const endDate = new Date()
                      endDate.setHours(h + duration, m, 0)
                      const endTime = endDate.toTimeString().slice(0, 5)
                      return timeSlot < endTime
                    })()

                  return (
                    <div key={`${date}-${timeSlot}`} className='flex-1 px-1'>
                      <div
                        className={`h-8 rounded flex items-center justify-center text-xs ${
                          isSelectedSlot
                            ? 'bg-blue-500 text-white font-medium'
                            : bookingsInSlot.length > 0
                              ? 'bg-red-400 text-white'
                              : 'bg-green-100 text-green-700'
                        }`}
                        title={
                          isSelectedSlot
                            ? 'Lịch của bạn'
                            : bookingsInSlot.length > 0
                              ? `Đã đặt - ${bookingsInSlot[0].vehicleName}`
                              : 'Còn trống'
                        }
                      >
                        {isSelectedSlot && '●'}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      {/* Existing bookings summary for selected date */}
      {selectedDateBookings.length > 0 && (
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <h4 className='text-xs font-semibold text-gray-700 mb-2'>
            Chi tiết lịch đặt - {new Date(selectedDate).toLocaleDateString('vi-VN')}:
          </h4>
          <div className='space-y-2'>
            {selectedDateBookings.map((booking) => (
              <div key={booking.id} className='flex items-center justify-between text-xs bg-white rounded p-2'>
                <div className='flex items-center'>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium mr-2 ${
                      booking.status === 'completed'
                        ? 'bg-gray-100 text-gray-700'
                        : booking.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {booking.status === 'completed'
                      ? 'Hoàn thành'
                      : booking.status === 'in-progress'
                        ? 'Đang sạc'
                        : 'Đã xác nhận'}
                  </span>
                  <span className='text-gray-700'>{booking.vehicleName}</span>
                </div>
                <span className='text-gray-600 font-medium'>
                  {booking.startTime} - {booking.endTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Timetable
