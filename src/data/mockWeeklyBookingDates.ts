import { ReservationStatus } from '../constants/reservationStatus'
import type { WeeklyBookingDate } from '../interface/reservation'

const mockWeeklyBookings: WeeklyBookingDate[] = [
  // Thứ Hai, 13/10/2025
  {
    id: '1',
    reservation_day: '2025-10-13', // format: YYYY-MM-DD
    start_time: '19:00',
    end_time: '20:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '1',
    vehicle_id: '1'
  },
  {
    id: '2',
    reservation_day: '2025-10-14', // format: YYYY-MM-DD
    start_time: '07:00',
    end_time: '08:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '2',
    vehicle_id: '2'
  },
  {
    id: '3',
    reservation_day: '2025-10-15', // format: YYYY-MM-DD
    start_time: '08:00',
    end_time: '12:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '3',
    vehicle_id: '3'
  },
  {
    id: '4',
    reservation_day: '2025-10-16', // format: YYYY-MM-DD
    start_time: '13:00',
    end_time: '14:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '4',
    vehicle_id: '4'
  },
  {
    id: '5',
    reservation_day: '2025-10-17', // format: YYYY-MM-DD
    start_time: '13:00',
    end_time: '14:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '5',
    vehicle_id: '5'
  },
  {
    id: '6',
    reservation_day: '2025-10-18', // format: YYYY-MM-DD
    start_time: '13:00',
    end_time: '15:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '1',
    vehicle_id: '6'
  },
  {
    id: '7',
    reservation_day: '2025-10-19', // format: YYYY-MM-DD
    start_time: '13:00',
    end_time: '15:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '2',
    vehicle_id: '7'
  },
  {
    id: '8',
    reservation_day: '2025-10-19', // format: YYYY-MM-DD
    start_time: '18:00',
    end_time: '21:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '3',
    vehicle_id: '9'
  },
  {
    id: '9',
    reservation_day: '2025-10-19', // format: YYYY-MM-DD
    start_time: '14:00',
    end_time: '16:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '4',
    vehicle_id: '10'
  },
  {
    id: '10',
    reservation_day: '2025-10-19', // format: YYYY-MM-DD
    start_time: '11:00',
    end_time: '12:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '5',
    vehicle_id: '11'
  },
  {
    id: '11',
    reservation_day: '2025-10-19', // format: YYYY-MM-DD
    start_time: '13:00',
    end_time: '15:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '1',
    vehicle_id: '12'
  },
  {
    id: '12',
    reservation_day: '2025-10-19', // format: YYYY-MM-DD
    start_time: '13:00',
    end_time: '15:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '2',
    vehicle_id: '13'
  },
  {
    id: '13',
    reservation_day: '2025-10-19', // format: YYYY-MM-DD
    start_time: '13:00',
    end_time: '15:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '3',
    vehicle_id: '15'
  },
  {
    id: '14',
    reservation_day: '2025-10-19', // format: YYYY-MM-DD
    start_time: '13:00',
    end_time: '15:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '4',
    vehicle_id: '16'
  },
  {
    id: '15',
    reservation_day: '2025-10-19', // format: YYYY-MM-DD
    start_time: '13:00',
    end_time: '15:00',
    status: ReservationStatus.PENDING,
    chargePoint_id: '5',
    vehicle_id: '17'
  }
]
export default mockWeeklyBookings
