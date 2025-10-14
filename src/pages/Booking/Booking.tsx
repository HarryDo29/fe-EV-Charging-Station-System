import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockStations } from '../../data/mockStations'
import type { Station, Vehicle, ChargePoint, BookingData, ExistingBooking } from '../../types/station'
import mockChargePoints from '../../data/mockChargePoints'
import mockVehicles from '../../data/mockVehicles'
import ChargePointList from '../../components/ChargePoint/ChargePointList'
import Timetable from '../../components/Timetable/Timetable'
import VehicleCard from '../../components/Vehicle/VehicleCard'
import AddVehicleModal from '../../components/Modal/AddVehicleModal'
// Mock data cho các booking đã có
const generateMockBookings = (): ExistingBooking[] => {
  const today = new Date()
  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  // Generate bookings for the next 7 days
  const bookings: ExistingBooking[] = []

  // Day 0 (Today)
  bookings.push(
    {
      id: 'b1',
      chargePointId: 1,
      date: formatDate(today),
      startTime: '08:00',
      endTime: '10:00',
      vehicleName: 'Tesla Model S',
      status: 'completed'
    },
    {
      id: 'b2',
      chargePointId: 1,
      date: formatDate(today),
      startTime: '14:00',
      endTime: '16:00',
      vehicleName: 'VinFast VF9',
      status: 'confirmed'
    },
    {
      id: 'b3',
      chargePointId: 2,
      date: formatDate(today),
      startTime: '09:00',
      endTime: '11:30',
      vehicleName: 'BMW i4',
      status: 'in-progress'
    }
  )

  // Day 1 (Tomorrow)
  const day1 = new Date(today)
  day1.setDate(day1.getDate() + 1)
  bookings.push(
    {
      id: 'b4',
      chargePointId: 1,
      date: formatDate(day1),
      startTime: '09:00',
      endTime: '11:00',
      vehicleName: 'Tesla Model Y',
      status: 'confirmed'
    },
    {
      id: 'b5',
      chargePointId: 2,
      date: formatDate(day1),
      startTime: '13:00',
      endTime: '15:00',
      vehicleName: 'Mercedes EQS',
      status: 'confirmed'
    }
  )

  // Day 2
  const day2 = new Date(today)
  day2.setDate(day2.getDate() + 2)
  bookings.push(
    {
      id: 'b6',
      chargePointId: 1,
      date: formatDate(day2),
      startTime: '10:00',
      endTime: '12:00',
      vehicleName: 'Audi e-tron',
      status: 'confirmed'
    },
    {
      id: 'b7',
      chargePointId: 3,
      date: formatDate(day2),
      startTime: '15:00',
      endTime: '17:00',
      vehicleName: 'Hyundai Ioniq 5',
      status: 'confirmed'
    }
  )

  // Day 3
  const day3 = new Date(today)
  day3.setDate(day3.getDate() + 3)
  bookings.push(
    {
      id: 'b8',
      chargePointId: 1,
      date: formatDate(day3),
      startTime: '07:00',
      endTime: '09:00',
      vehicleName: 'Porsche Taycan',
      status: 'confirmed'
    },
    {
      id: 'b9',
      chargePointId: 1,
      date: formatDate(day3),
      startTime: '16:00',
      endTime: '18:00',
      vehicleName: 'Kia EV6',
      status: 'confirmed'
    }
  )

  // Day 4
  const day4 = new Date(today)
  day4.setDate(day4.getDate() + 4)
  bookings.push(
    {
      id: 'b10',
      chargePointId: 1,
      date: formatDate(day4),
      startTime: '11:00',
      endTime: '13:00',
      vehicleName: 'Ford Mustang Mach-E',
      status: 'confirmed'
    },
    {
      id: 'b11',
      chargePointId: 2,
      date: formatDate(day4),
      startTime: '14:00',
      endTime: '16:00',
      vehicleName: 'Polestar 2',
      status: 'confirmed'
    }
  )

  // Day 5
  const day5 = new Date(today)
  day5.setDate(day5.getDate() + 5)
  bookings.push(
    {
      id: 'b12',
      chargePointId: 1,
      date: formatDate(day5),
      startTime: '08:00',
      endTime: '10:00',
      vehicleName: 'Nissan Ariya',
      status: 'confirmed'
    },
    {
      id: 'b13',
      chargePointId: 3,
      date: formatDate(day5),
      startTime: '12:00',
      endTime: '14:00',
      vehicleName: 'BMW iX',
      status: 'confirmed'
    }
  )

  // Day 6
  const day6 = new Date(today)
  day6.setDate(day6.getDate() + 6)
  bookings.push(
    {
      id: 'b14',
      chargePointId: 1,
      date: formatDate(day6),
      startTime: '10:00',
      endTime: '12:00',
      vehicleName: 'Volvo XC40 Recharge',
      status: 'confirmed'
    },
    {
      id: 'b15',
      chargePointId: 1,
      date: formatDate(day6),
      startTime: '17:00',
      endTime: '19:00',
      vehicleName: 'Tesla Model X',
      status: 'confirmed'
    }
  )

  return bookings
}

const mockExistingBookings = generateMockBookings()

const Booking = () => {
  const { stationId } = useParams<{ stationId: string }>()
  const navigate = useNavigate()

  const [station, setStation] = useState<Station | null>(null)
  const [chargePoints] = useState<ChargePoint[]>(mockChargePoints)
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)

  // Form state
  const [selectedChargePoint, setSelectedChargePoint] = useState<ChargePoint | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [duration, setDuration] = useState<number>(1)

  // Modal state for adding new vehicle
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)
  const [newVehicle, setNewVehicle] = useState({
    id: '',
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    batteryCapacity: 0,
    connectorType: ''
  })

  // Get week dates starting from selected date
  const getWeekDates = useMemo(() => {
    if (!selectedDate) return []
    const startDate = new Date(selectedDate)
    // Get the start of the week (Monday)
    const dayOfWeek = startDate.getDay()
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // If Sunday, go back 6 days, else go to Monday
    startDate.setDate(startDate.getDate() + diff)

    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate)
      date.setDate(date.getDate() + i)
      weekDates.push(date.toISOString().split('T')[0])
    }
    return weekDates
  }, [selectedDate])

  // Get bookings for selected charge point and week
  const weekBookings = useMemo(() => {
    if (!selectedChargePoint || getWeekDates.length === 0) return {}
    const bookingsByDate: { [key: string]: ExistingBooking[] } = {}

    getWeekDates.forEach((date) => {
      bookingsByDate[date] = mockExistingBookings.filter(
        (booking) => booking.chargePointId === selectedChargePoint.id && booking.date === date
      )
    })

    return bookingsByDate
  }, [selectedChargePoint, getWeekDates])

  // Get bookings for selected date only (for backward compatibility)
  const selectedDateBookings = useMemo(() => {
    if (!selectedChargePoint || !selectedDate) return []
    return mockExistingBookings.filter(
      (booking) => booking.chargePointId === selectedChargePoint.id && booking.date === selectedDate
    )
  }, [selectedChargePoint, selectedDate])

  // Check if selected time conflicts with existing bookings
  const hasTimeConflict = useMemo(() => {
    if (!selectedTime || !selectedDateBookings.length) return false

    const selectedStart = selectedTime
    const [hours, minutes] = selectedTime.split(':').map(Number)
    const selectedEndDate = new Date()
    selectedEndDate.setHours(hours + duration, minutes, 0)
    const selectedEnd = selectedEndDate.toTimeString().slice(0, 5)

    return selectedDateBookings.some((booking) => {
      // Check if time ranges overlap
      return (
        (selectedStart >= booking.startTime && selectedStart < booking.endTime) ||
        (selectedEnd > booking.startTime && selectedEnd <= booking.endTime) ||
        (selectedStart <= booking.startTime && selectedEnd >= booking.endTime)
      )
    })
  }, [selectedTime, duration, selectedDateBookings])

  useEffect(() => {
    if (stationId) {
      const foundStation = mockStations.find((s) => s.id === parseInt(stationId))
      if (foundStation) {
        setStation(foundStation)
      }
    }
  }, [stationId])

  // const handleAddVehicle = () => {
  //   if (newVehicle.name && newVehicle.brand && newVehicle.model && newVehicle.batteryCapacity > 0) {
  //     const vehicle: Vehicle = {
  //       id: Date.now().toString(),
  //       name: newVehicle.name,
  //       brand: newVehicle.brand,
  //       model: newVehicle.model,
  //       year: newVehicle.year,
  //       batteryCapacity: newVehicle.batteryCapacity,
  //       connectorType: newVehicle.connectorType
  //     }
  //     setVehicles([...vehicles, vehicle])
  //     setSelectedVehicle(vehicle)
  //     setShowAddVehicleModal(false)
  //     setNewVehicle({
  //       id: '',
  //       name: '',
  //       brand: '',
  //       model: '',
  //       year: new Date().getFullYear(),
  //       batteryCapacity: 0,
  //       connectorType: ''
  //     })
  //   }
  // }

  const handleBooking = () => {
    if (!selectedChargePoint || !selectedVehicle || !selectedDate || !selectedTime) {
      alert('Vui lòng điền đầy đủ thông tin đặt lịch')
      return
    }

    if (hasTimeConflict) {
      alert('Khung giờ bạn chọn đã có người đặt. Vui lòng chọn thời gian khác!')
      return
    }

    const bookingData: BookingData = {
      stationId: parseInt(stationId!),
      chargePointId: selectedChargePoint.id,
      vehicleId: selectedVehicle.id,
      startDate: new Date(selectedDate),
      startTime: selectedTime,
      duration: duration
    }

    // Store booking data in sessionStorage to pass to payment page
    sessionStorage.setItem('bookingData', JSON.stringify(bookingData))
    sessionStorage.setItem('selectedStation', JSON.stringify(station))
    sessionStorage.setItem('selectedChargePoint', JSON.stringify(selectedChargePoint))
    sessionStorage.setItem('selectedVehicle', JSON.stringify(selectedVehicle))

    // Navigate to payment page
    navigate('/payment')
  }

  const calculateEstimatedCost = () => {
    if (!selectedChargePoint) return 0
    return selectedChargePoint.price * selectedChargePoint.power * duration
  }

  if (!station) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <p className='text-center text-gray-600'>Đang tải thông tin trạm sạc...</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-6xl pt-16'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Đặt lịch sạc xe</h1>
        <div className='flex items-center text-gray-600'>
          <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
              clipRule='evenodd'
            />
          </svg>
          <div>
            <p className='font-semibold'>{station.name}</p>
            <p className='text-sm'>{station.address}</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
        {/* Left Column - Main Form */}
        <div className='lg:col-span-3 space-y-6 p-0'>
          {/* Charge Point Selection */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold mb-4'>1. Chọn cổng sạc</h2>
            <ChargePointList
              chargePoints={chargePoints}
              selectedChargePoint={selectedChargePoint}
              setSelectedChargePoint={setSelectedChargePoint}
            />
          </div>

          {/* Date & Time Selection */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold mb-4'>2. Chọn thời gian sạc</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Ngày sạc</label>
                <input
                  type='date'
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Giờ bắt đầu</label>
                <input
                  type='time'
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
              <div className='md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Thời gian sạc (giờ): {duration}h</label>
                <input
                  type='range'
                  min='1'
                  max='8'
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className='w-full'
                />
                <div className='flex justify-between text-xs text-gray-500 mt-1'>
                  <span>1h</span>
                  <span>2h</span>
                  <span>3h</span>
                  <span>4h</span>
                  <span>5h</span>
                  <span>6h</span>
                  <span>7h</span>
                  <span>8h</span>
                </div>
              </div>

              {/* Time conflict warning */}
              {hasTimeConflict && selectedTime && (
                <div className='md:col-span-2 mt-2'>
                  <div className='bg-red-50 border border-red-200 rounded-lg p-3 flex items-start'>
                    <svg
                      className='w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <div>
                      <p className='text-sm font-medium text-red-800'>Khung giờ đã được đặt</p>
                      <p className='text-xs text-red-700 mt-1'>
                        Thời gian bạn chọn trùng với lịch đặt chỗ hiện có. Vui lòng chọn thời gian khác.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Weekly Timeline View - Show available/booked slots for 7 days */}
            {selectedChargePoint && selectedDate && getWeekDates.length > 0 && (
              <div className='mt-6 pt-6 border-t'>
                <h3 className='text-sm font-semibold text-gray-700 mb-3 flex items-center'>
                  <svg className='w-5 h-5 mr-2 text-blue-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  Lịch đặt chỗ - Tuần {new Date(getWeekDates[0]).toLocaleDateString('vi-VN')} đến{' '}
                  {new Date(getWeekDates[6]).toLocaleDateString('vi-VN')}
                </h3>
                {/* Timetable */}
                <Timetable
                  getWeekDates={getWeekDates}
                  weekBookings={weekBookings}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  duration={duration}
                  selectedDateBookings={selectedDateBookings}
                />
              </div>
            )}
          </div>

          {/* Vehicle Selection */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h2 className='text-xl font-semibold mb-4'>3. Chọn xe</h2>
            <div className='space-y-3'>
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedVehicle?.id === vehicle.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <VehicleCard vehicle={vehicle} selectedVehicle={selectedVehicle} />
                </div>
              ))}

              <button
                onClick={() => setShowAddVehicleModal(true)}
                className='w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center'
              >
                <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                </svg>
                Thêm xe mới
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className='lg:col-span-1'>
          <div className='bg-white rounded-lg shadow-md p-6 sticky top-20'>
            <h2 className='text-xl font-semibold mb-4'>Tóm tắt đặt lịch</h2>
            <div className='space-y-4'>
              <div>
                <p className='text-sm text-gray-600'>Trạm sạc</p>
                <p className='font-medium'>{station.name}</p>
              </div>

              {selectedChargePoint && (
                <div>
                  <p className='text-sm text-gray-600'>Cổng sạc</p>
                  <p className='font-medium'>
                    {selectedChargePoint.name} ({selectedChargePoint.power} kW)
                  </p>
                </div>
              )}

              {selectedDate && (
                <div>
                  <p className='text-sm text-gray-600'>Ngày & Giờ</p>
                  <p className='font-medium'>
                    {new Date(selectedDate).toLocaleDateString('vi-VN')} - {selectedTime}
                  </p>
                </div>
              )}

              {duration && (
                <div>
                  <p className='text-sm text-gray-600'>Thời gian sạc</p>
                  <p className='font-medium'>{duration} giờ</p>
                </div>
              )}

              {selectedVehicle && (
                <div>
                  <p className='text-sm text-gray-600'>Xe</p>
                  <p className='font-medium'>{selectedVehicle.name}</p>
                </div>
              )}

              <div className='border-t pt-4'>
                <p className='text-sm text-gray-600'>Ước tính chi phí</p>
                <p className='text-2xl font-bold text-blue-600'>{calculateEstimatedCost().toLocaleString()} VND</p>
                <p className='text-xs text-gray-500 mt-1'>* Dự kiến dựa trên công suất và thời gian sạc</p>
              </div>

              <button
                onClick={handleBooking}
                disabled={!selectedChargePoint || !selectedVehicle || !selectedDate || !selectedTime || hasTimeConflict}
                className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed'
              >
                Tiếp tục thanh toán
              </button>
              {hasTimeConflict && (
                <p className='text-xs text-red-600 text-center mt-2'>⚠️ Vui lòng chọn thời gian khác</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddVehicleModal && (
        <AddVehicleModal
          vehicles={vehicles}
          newVehicle={newVehicle}
          setVehicles={setVehicles}
          setSelectedVehicle={setSelectedVehicle}
          setNewVehicle={setNewVehicle}
          setShowAddVehicleModal={setShowAddVehicleModal}
        />
      )}
    </div>
  )
}

export default Booking
