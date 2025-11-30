import type { Reservation } from '../../interface/reservation.interface'
import { ReservationStatus } from '../../constants/reservationStatus'

const ChargeSessionCard = ({ reservation }: { reservation: Reservation }) => {
  return (
    <div
      key={reservation.id}
      className='bg-white rounded-lg p-5 border border-gray-200 hover:border-blue-300 transition-colors'
    >
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-lg font-semibold text-gray-900'>{reservation.charge_point.station.name}</h3>
        {reservation.status === ReservationStatus.COMPLETED ? (
          <span className='px-3 py-1 bg-green-50 text-green-600 text-sm font-medium rounded-md border border-green-200'>
            Hoàn thành
          </span>
        ) : reservation.status === ReservationStatus.PENDING ? (
          <span className='px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-md border border-blue-200'>
            Sắp tới
          </span>
        ) : (
          <span className='px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-md border border-red-200'>
            Đã hủy
          </span>
        )}
      </div>

      <div className='flex items-center justify-between text-sm'>
        <div className='space-y-1 text-gray-600'>
          <div className='flex items-center gap-2'>
            <span>📅</span>
            <span>{reservation.reservation_day}</span>
            <span className='text-gray-400'>•</span>
            <span>🕐</span>
            <span>{reservation.start_time}</span>
            <span className='text-gray-400'>•</span>
            <span>🕐</span>
            <span>{reservation.end_time}</span>
          </div>
          <div className='flex items-center gap-2'>
            <span>⚡</span>
            <span>Công suất: {reservation.charge_point.maxPowerKw} kW</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChargeSessionCard
