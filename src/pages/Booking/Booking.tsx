import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Station } from '../../interface/station.interface'
import type { ChargePoint } from '../../interface/chargePoint.interface'
import type { AddVehicle, Vehicle } from '../../interface/vehicle.interface'
import type { Reservation } from '../../interface/reservation'
import type { SelectedSlot } from '../../interface/selectedSlot.interface'
import type { BookingData } from '../../interface/bookingData.interface'
import ChargePointList from '../../components/ChargePoint/ChargePointList'
import Timetable from '../../components/Timetable/Timetable'
import VehicleCard from '../../components/Vehicle/VehicleCard'
import AddVehicleModal from '../../components/Modal/AddVehicleModal'
import mockWeeklyBookingDates from '../../data/mockWeeklyBookingDates'
import { fetchStationById } from '../../apis/stationApis'
import { fetchChargePointsByStationId } from '../../apis/chargePointApi'
import { fetchOwnVehicles } from '../../apis/vehicleApi'
import { LocationPin as LocationPinIcon } from '@mui/icons-material'
import { getReservation } from '../../apis/reservationApis'

// Mock data cho các booking đã có
const Booking = () => {
  const { stationId } = useParams<{ stationId: string }>()
  const navigate = useNavigate()

  const [station, setStation] = useState<Station | null>(null)
  const [chargePoints, setChargePoints] = useState<ChargePoint[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  // Form state
  const [selectedChargePoint, setSelectedChargePoint] = useState<ChargePoint | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([])
  const [selectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  // const [selectedTime] = useState<string>('')
  const [weeklyBookings, setWeeklyBookings] = useState<Reservation[]>([])

  // Modal state for adding new vehicle
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false)
  const [newVehicle, setNewVehicle] = useState<AddVehicle>({
    car_maker: '',
    models: '',
    license_plate: '',
    battery_capacity_kwh: 0,
    charging_power_kw: 0,
    connector_type: null,
    status: true
  } as AddVehicle)

  console.log('weeklyBookings', weeklyBookings)

  // Get week dates starting from selected date
  const getWeekDates = useMemo(() => {
    // if (!selectedDate) return []
    const now = new Date()
    const startDate = new Date(now)
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
  }, [])

  // Get bookings for selected charge point and week
  const getWeekBookings = useMemo(() => {
    if (!selectedChargePoint || getWeekDates.length === 0 || !weeklyBookings) return []
    console.log('weeklyBookings', weeklyBookings)
    console.log('selectedChargePoint', selectedChargePoint)
    return weeklyBookings.filter((booking) => booking.charge_point_id === selectedChargePoint.id)
  }, [selectedChargePoint, weeklyBookings, getWeekDates])

  // Fetch station data
  useEffect(() => {
    const fetchStation = async () => {
      try {
        if (stationId) {
          const response = await fetchStationById(stationId)
          console.log('fetchStation response', response)
          if (response.statusCode === 200) {
            setStation(response.data)
          }
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    fetchStation()
  }, [stationId])

  // Fetch charge points data
  useEffect(() => {
    const fetchChargePoints = async () => {
      try {
        if (stationId) {
          const response = await fetchChargePointsByStationId(stationId)
          console.log('fetchChargePoints response', response)
          if (response.statusCode === 200) {
            setChargePoints(response.data)
          }
        }
      } catch (error) {
        console.log('fetchChargePoints error', error)
      }
    }
    fetchChargePoints()
  }, [stationId])

  // Fetch vehicles data
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        if (stationId) {
          const response = await fetchOwnVehicles()
          console.log('fetchVehicles response', response)
          if (response.statusCode === 200) {
            setVehicles(response.data)
          }
        }
      } catch (error) {
        console.log('fetchVehicles error', error)
      }
    }
    fetchVehicles()
  }, [stationId])

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        if (selectedChargePoint) {
          console.log('selectedChargePoint', selectedChargePoint)
          const response = await getReservation(selectedChargePoint.id)
          console.log('fetchReservations response', response)
          if (response.length > 0) {
            console.log('response.data', response)
            setWeeklyBookings(() => response)
            console.log('weeklyBookings', weeklyBookings)
          }
        }
      } catch (error) {
        console.log('fetchReservations error', error)
      }
    }
    fetchReservations()
  }, [selectedChargePoint])

  const handleBooking = () => {
    if (!selectedChargePoint || !selectedVehicle || selectedSlots.length === 0) {
      alert('Vui lòng điền đầy đủ thông tin đặt lịch')
      return
    }

    const bookingData: BookingData = {
      station: station!,
      chargePoint: selectedChargePoint!,
      vehicle: selectedVehicle!,
      date: selectedDate,
      slots: selectedSlots,
      amount: calculateEstimatedCost()
    }

    console.log('bookingData', bookingData)

    // Navigate to payment page
    navigate('/payment', { state: bookingData })
  }

  const calculateEstimatedCost = () => {
    if (!selectedChargePoint) return 0
    return selectedChargePoint.pricePerKwh * selectedChargePoint.maxPowerKw * selectedSlots.length
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
        <h1 className='text-3xl font-bold text-gray-900 bold mb-2'>Đặt lịch sạc xe</h1>
        <div className='flex items-center text-gray-600'>
          <LocationPinIcon className='w-5 h-5 mr-2 text-black-500' />
          <div>
            <b className='text-lg font-bold'>{station.name}</b> <br />
            <b className='text-sm'>{station.address}</b>
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
            <h2 className='text-xl font-semibold m-0'>2. Chọn thời gian sạc</h2>
            {/* Weekly Timeline View - Show available/booked slots for 7 days */}
            {selectedChargePoint && (
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
                  weekBookings={getWeekBookings as Reservation[]}
                  selectedDate={selectedDate}
                  selectedSlots={selectedSlots}
                  setSelectedSlots={setSelectedSlots}
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
                  onClick={() => {
                    if (vehicle.status === true) {
                      setSelectedVehicle(vehicle)
                    }
                  }}
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
                  <b className='text-sm text-gray-600'>Cổng sạc: </b>
                  <span className='font-medium'>{selectedChargePoint.identifier}</span>
                </div>
              )}

              {selectedSlots.length > 0 && (
                <>
                  <div>
                    <b className='text-sm text-gray-600'>Ngày: </b>
                    <span className='font-medium'>{new Date(selectedSlots[0].date).toLocaleDateString('vi-VN')}</span>
                  </div>
                  <div>
                    <b className='text-sm text-gray-600'>Giờ: </b>
                    <span className='font-medium'>
                      {selectedSlots[0].start_time} - {selectedSlots[selectedSlots.length - 1].end_time}
                    </span>
                  </div>
                  <div>
                    <b className='text-sm text-gray-600'>Thời gian sạc: </b>
                    <span className='font-medium'>{selectedSlots.length} giờ</span>
                  </div>
                </>
              )}

              {selectedVehicle && (
                <div>
                  <p className='text-sm text-gray-600'>Xe</p>
                  <p className='font-medium'>
                    {selectedVehicle.car_maker} {selectedVehicle.license_plate}
                  </p>
                </div>
              )}

              <div className='border-t pt-4'>
                <p className='text-sm text-gray-600'>Ước tính chi phí</p>
                <p className='text-2xl font-bold text-blue-600'>{calculateEstimatedCost().toLocaleString()} VND</p>
                <p className='text-xs text-gray-500 mt-1'>* Dự kiến dựa trên công suất và thời gian sạc</p>
              </div>

              <button
                onClick={handleBooking}
                disabled={!selectedChargePoint || !selectedVehicle || selectedSlots.length === 0}
                className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed'
              >
                Tiếp tục đặt lịch
              </button>
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
          setNewVehicle={setNewVehicle}
          setShowAddVehicleModal={setShowAddVehicleModal}
        />
      )}
    </div>
  )
}

export default Booking
