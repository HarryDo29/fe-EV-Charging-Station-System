import type { SelectedSlot, WeeklyBookingDates } from '../../types/station'

interface TimetableProps {
  getWeekDates: string[]
  weekBookings: WeeklyBookingDates
  selectedDate: string
  selectedSlots: SelectedSlot[]
  setSelectedSlots: (slots: SelectedSlot[]) => void
}

const Timetable = ({ getWeekDates, weekBookings, selectedDate, selectedSlots, setSelectedSlots }: TimetableProps) => {
  const handleSlotClick = (date: string, timeSlot: string) => {
    // check if (date)  is different from another selectedDates
    const isDifferSelectedDates = selectedSlots.some((slot) => slot.date !== date)
    if (isDifferSelectedDates) {
      alert('Bạn chỉ có thể chọn các slot trong cùng 1 ngày')
      return
    }
    // Check if the slot is already selected
    const isAlreadySelected = selectedSlots.some((slot) => slot.date === date && slot.time === timeSlot)

    if (isAlreadySelected) {
      // Remove from selection
      setSelectedSlots(selectedSlots.filter((slot) => !(slot.date === date && slot.time === timeSlot)))
    } else {
      // Add to selection
      setSelectedSlots([...selectedSlots, { date, time: timeSlot }])
    }
  }

  return (
    <div className='bg-gray-50 rounded-lg p-0 overflow-x-auto'>
      <div className='flex items-center mb-3 text-xs text-gray-600'>
        <div className='flex items-center mr-4'>
          <div className='w-3 h-3 bg-green-100 rounded mr-1 border border-green-300'></div>
          <span>Còn trống</span>
        </div>
        <div className='flex items-center mr-4'>
          <div className='w-3 h-3 bg-red-400 rounded mr-1'></div>
          <span>Đã đặt</span>
        </div>
        <div className='flex items-center'>
          <div className='w-3 h-3 bg-blue-200 rounded mr-1 border border-blue-400'></div>
          <span>Đã chọn</span>
        </div>
      </div>

      {/* Weekly Timeline grid - 6:00 to 22:00 */}
      <div className='w-full'>
        {/* Week days header */}
        <div className='flex mb-2 w-full'>
          <div className='w-12 flex-shrink-0'></div>
          {getWeekDates.map((date) => {
            const dateObj = new Date(date)
            const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']
            const dayName = dayNames[dateObj.getDay()]
            const isToday = date === new Date().toISOString().split('T')[0]
            const isSelectedDay = date === selectedDate

            return (
              <div key={date} className={`flex-1 text-center w-14 px-1 ${isSelectedDay ? 'font-bold' : ''}`}>
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
                <span className='flex items-center justify-center text-xs text-gray-600 w-12 flex-shrink-0 p-0'>
                  {timeSlot}
                </span>
                {getWeekDates.map((date) => {
                  // Check if this slot has any bookings
                  const bookingsInSlot =
                    weekBookings[date]?.filter((booking) => {
                      return booking.startTime === timeSlot
                    }) || []

                  const hasBooking = bookingsInSlot.length > 0

                  // Check if this slot is selected by user
                  const isUserSelected = selectedSlots.some((slot) => slot.date === date && slot.time === timeSlot)

                  return (
                    <div key={`${date}-${timeSlot}`} className='flex-1 px-1'>
                      <div
                        onClick={() => {
                          // Only allow selecting empty slots
                          if (!hasBooking) {
                            handleSlotClick(date, timeSlot)
                            console.log('selectedSlots', selectedSlots)
                          }
                        }}
                        className={`h-8 rounded flex items-center justify-center text-xs transition-all ${
                          hasBooking
                            ? 'bg-red-400 text-white cursor-not-allowed'
                            : isUserSelected
                              ? 'bg-blue-200 text-blue-800 font-medium cursor-pointer hover:bg-blue-300 border border-blue-400'
                              : 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200 border border-green-300'
                        }`}
                        title={
                          hasBooking
                            ? `Đã đặt - ${bookingsInSlot[0].vehicleName}`
                            : isUserSelected
                              ? 'Click để bỏ chọn'
                              : 'Click để chọn slot'
                        }
                      >
                        {hasBooking && '●'}
                        {isUserSelected && !hasBooking && '✓'}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Timetable
