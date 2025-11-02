import type { SelectedSlot } from '../../interface/selectedSlot.interface'
import type { Reservation } from '../../interface/reservation'

interface TimetableProps {
  getWeekDates: string[]
  weekBookings: Reservation[]
  selectedDate: string
  selectedSlots: SelectedSlot[]
  setSelectedSlots: (slots: SelectedSlot[]) => void
}

const Timetable = ({ getWeekDates, weekBookings, selectedDate, selectedSlots, setSelectedSlots }: TimetableProps) => {
  console.log('weekBookings', weekBookings)
  const handleSlotClick = (date: string, start_time: string, end_time: string) => {
    // check if (date)  is different from another selectedDates
    const isDifferSelectedDates = selectedSlots.some((slot) => slot.date !== date)
    if (isDifferSelectedDates) {
      alert('Bạn chỉ có thể chọn các slot trong cùng 1 ngày')
      return
    }

    // Check if the slot is already selected
    const isAlreadySelected = selectedSlots.some(
      (slot) => slot.date === date && slot.start_time === start_time && slot.end_time === end_time
    )

    //check if all selected slots are a period
    if (selectedSlots.length > 0 && !isAlreadySelected) {
      selectedSlots.sort((a, b) => a.start_time.localeCompare(b.start_time))
      if (start_time !== selectedSlots[selectedSlots.length - 1].end_time) {
        alert('Bạn chỉ có thể chọn các slot liên tục')
        return
      }
    }

    if (isAlreadySelected) {
      // Remove from selection
      setSelectedSlots(
        selectedSlots.filter(
          (slot) => !(slot.date === date && slot.start_time === start_time && slot.end_time === end_time)
        )
      )
    } else {
      // Add to selection
      setSelectedSlots([...selectedSlots, { date, start_time, end_time }])
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
                  {dateObj.getDate().toString().padStart(2, '0')}/{dateObj.getMonth().toString().padStart(2, '0')}
                </div>
              </div>
            )
          })}
        </div>

        {/* Time slots */}
        <div className='space-y-1'>
          {Array.from({ length: 16 }, (_, i) => {
            const hour = i + 6
            const start_time = `${hour.toString().padStart(2, '0')}:00`
            const end_time = `${(hour + 1).toString().padStart(2, '0')}:00`

            return (
              <div key={start_time} className='flex items-stretch'>
                <span className='flex items-center justify-center text-xs text-gray-600 w-12 flex-shrink-0 p-0'>
                  {start_time}
                </span>
                {getWeekDates.map((date) => {
                  console.log('date', date)
                  console.log('weekBookings', weekBookings)

                  // Check if this slot has any bookings
                  let booking: Reservation | undefined = undefined
                  if (weekBookings.length > 0) {
                    booking = weekBookings.find((booking: Reservation) => {
                      console.log('booking', booking)
                      if (
                        booking.reservation_day === date &&
                        booking.start_time === start_time &&
                        booking.end_time === end_time
                      ) {
                        return booking
                      }
                      return null
                    })
                  }

                  // Check if this slot is selected by user
                  const isUserSelected = selectedSlots.some(
                    (slot) => slot.date === date && slot.start_time === start_time && slot.end_time === end_time
                  )

                  // Check if the date and time slot has passed
                  const now = new Date()
                  const currentDateStr = now.toISOString().split('T')[0]
                  const currentHour = now.getHours()
                  const slotHour = parseInt(start_time.split(':')[0])
                  const isPastSlot = date < currentDateStr || (date === currentDateStr && slotHour <= currentHour)

                  return (
                    <div key={`${date}-${start_time}-${end_time}`} className='flex-1 px-1'>
                      <div
                        onClick={() => {
                          // Prevent selecting past slots or booked slots
                          if (isPastSlot) {
                            alert('Không thể chọn slot đã qua')
                            return
                          }
                          // Only allow selecting empty slots
                          if (!booking) {
                            handleSlotClick(date, start_time, end_time)
                            console.log('selectedSlots', selectedSlots)
                          }
                        }}
                        className={`h-8 rounded flex items-center justify-center text-xs transition-all ${
                          isPastSlot
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : booking
                              ? 'bg-red-400 text-white cursor-not-allowed'
                              : isUserSelected
                                ? 'bg-blue-200 text-blue-800 font-medium cursor-pointer hover:bg-blue-300 border border-blue-400'
                                : 'bg-green-100 text-green-700 cursor-pointer hover:bg-green-200 border border-green-300'
                        }`}
                        title={
                          isPastSlot
                            ? 'Slot đã qua'
                            : booking
                              ? `Đã đặt - ${booking.vehicle_id}`
                              : isUserSelected
                                ? 'Click để bỏ chọn'
                                : 'Click để chọn slot'
                        }
                      >
                        {isPastSlot && 'ⅹ'}
                        {!isPastSlot && booking && '●'}
                        {!isPastSlot && isUserSelected && !booking && '✔'}
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
