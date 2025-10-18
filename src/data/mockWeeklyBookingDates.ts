import type { WeeklyBookingDates } from '../interface/weeklyBookingDate.interface'

const mockWeeklyBookings: WeeklyBookingDates = {
  // Thứ Hai, 13/10/2025
  '2025-10-13': [
    {
      id: 101,
      chargePointId: 5,
      startTime: '09:00',
      endTime: '11:00',
      vehicleName: 'VinFast VF8'
    },
    {
      id: 102,
      chargePointId: 2,
      startTime: '14:00',
      endTime: '15:00',
      vehicleName: 'Tesla Model Y'
    },
    {
      id: 110,
      chargePointId: 8,
      startTime: '19:00',
      endTime: '20:00',
      vehicleName: 'Audi e-tron GT'
    }
  ],
  // Thứ Ba, 14/10/2025
  '2025-10-14': [
    {
      id: 111,
      chargePointId: 3,
      startTime: '07:00',
      endTime: '08:00',
      vehicleName: 'BMW iX3'
    },
    {
      id: 103,
      chargePointId: 9,
      startTime: '08:00',
      endTime: '12:00',
      vehicleName: 'Kia EV6'
    },
    {
      id: 112,
      chargePointId: 6,
      startTime: '17:00',
      endTime: '19:00',
      vehicleName: 'VinFast VF e34'
    }
  ],
  // Thứ Tư, 15/10/2025
  '2025-10-15': [
    {
      id: 113,
      chargePointId: 4,
      startTime: '06:00',
      endTime: '08:00',
      vehicleName: 'Peugeot e-2008'
    },
    {
      id: 114,
      chargePointId: 1,
      startTime: '10:00',
      endTime: '14:00',
      vehicleName: 'Ford Mustang Mach-E'
    }
  ],
  // Thứ Năm, 16/10/2025
  '2025-10-16': [
    {
      id: 104,
      chargePointId: 1,
      startTime: '13:00',
      endTime: '14:00',
      vehicleName: 'Hyundai Ioniq 5'
    },
    {
      id: 115,
      chargePointId: 2,
      startTime: '13:00',
      endTime: '15:00',
      vehicleName: 'Subaru Solterra'
    },
    {
      id: 105,
      chargePointId: 10,
      startTime: '18:00',
      endTime: '21:00',
      vehicleName: 'Porsche Taycan'
    }
  ],
  // Thứ Sáu, 17/10/2025
  '2025-10-17': [
    {
      id: 106,
      chargePointId: 7,
      startTime: '07:00',
      endTime: '08:00',
      vehicleName: 'Mercedes EQS'
    },
    {
      id: 116,
      chargePointId: 5,
      startTime: '15:00',
      endTime: '16:00',
      vehicleName: 'Toyota bZ4X'
    },
    {
      id: 117,
      chargePointId: 9,
      startTime: '18:00',
      endTime: '21:00',
      vehicleName: 'Lexus RZ 450e'
    }
  ],
  // Thứ Bảy, 18/10/2025
  '2025-10-18': [
    {
      id: 118,
      chargePointId: 8,
      startTime: '09:00',
      endTime: '12:00',
      vehicleName: 'MG ZS EV'
    },
    {
      id: 119,
      chargePointId: 1,
      startTime: '14:00',
      endTime: '16:00',
      vehicleName: 'Volvo C40 Recharge'
    },
    {
      id: 120,
      chargePointId: 6,
      startTime: '19:00',
      endTime: '20:00',
      vehicleName: 'Nissan Ariya'
    }
  ],
  // Chủ Nhật, 19/10/2025
  '2025-10-19': [
    {
      id: 121,
      chargePointId: 7,
      startTime: '11:00',
      endTime: '12:00',
      vehicleName: 'Genesis GV60'
    },
    {
      id: 122,
      chargePointId: 4,
      startTime: '17:00',
      endTime: '19:00',
      vehicleName: 'BYD Atto 3'
    }
  ]
}

export default mockWeeklyBookings
