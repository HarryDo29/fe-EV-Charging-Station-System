/**
 * Mock Data for Staff Module
 * Contains sample data for chargers, sessions, tickets, and staff users
 */

import {
  Charger,
  ChargingSession,
  SupportTicket,
  StaffUser,
  ChargerLogEvent,
  QuickResponse
} from '../types/staff'

/**
 * Mock Chargers Data (8 chargers across different stations)
 */
export const mockChargers: Charger[] = [
  {
    id: 'CHG-001',
    stationId: 'STN-HN-01',
    stationName: 'Trạm Hà Nội',
    stationAddress: '123 Đường ABC, Hà Nội',
    connectorType: 'CCS2',
    maxKW: 50,
    status: 'online',
    lastHeartbeat: new Date().toISOString(),
    temperature: 35,
    uptime: 168,
    totalEnergyDelivered: 1250,
    region: 'Hà Nội'
  },
  {
    id: 'CHG-002',
    stationId: 'STN-HN-01',
    stationName: 'Trạm Hà Nội',
    stationAddress: '123 Đường ABC, Hà Nội',
    connectorType: 'Type2',
    maxKW: 22,
    status: 'in-use',
    lastHeartbeat: new Date().toISOString(),
    currentSessionId: 'SES-001',
    temperature: 42,
    uptime: 168,
    totalEnergyDelivered: 890,
    region: 'Hà Nội'
  },
  {
    id: 'CHG-003',
    stationId: 'STN-HCM-01',
    stationName: 'Trạm TP.HCM',
    stationAddress: '456 Đường XYZ, TP.HCM',
    connectorType: 'CCS2',
    maxKW: 150,
    status: 'online',
    lastHeartbeat: new Date().toISOString(),
    temperature: 38,
    uptime: 240,
    totalEnergyDelivered: 3450,
    region: 'TP.HCM'
  },
  {
    id: 'CHG-004',
    stationId: 'STN-HCM-01',
    stationName: 'Trạm TP.HCM',
    stationAddress: '456 Đường XYZ, TP.HCM',
    connectorType: 'Tesla',
    maxKW: 120,
    status: 'in-use',
    lastHeartbeat: new Date().toISOString(),
    currentSessionId: 'SES-002',
    temperature: 45,
    uptime: 240,
    totalEnergyDelivered: 2890,
    region: 'TP.HCM'
  },
  {
    id: 'CHG-005',
    stationId: 'STN-DN-01',
    stationName: 'Trạm Đà Nẵng',
    stationAddress: '789 Đường DEF, Đà Nẵng',
    connectorType: 'CHAdeMO',
    maxKW: 50,
    status: 'maintenance',
    lastHeartbeat: new Date(Date.now() - 3600000).toISOString(),
    temperature: 30,
    uptime: 156,
    totalEnergyDelivered: 1120,
    region: 'Đà Nẵng'
  },
  {
    id: 'CHG-006',
    stationId: 'STN-DN-01',
    stationName: 'Trạm Đà Nẵng',
    stationAddress: '789 Đường DEF, Đà Nẵng',
    connectorType: 'Type2',
    maxKW: 22,
    status: 'online',
    lastHeartbeat: new Date().toISOString(),
    temperature: 36,
    uptime: 156,
    totalEnergyDelivered: 780,
    region: 'Đà Nẵng'
  },
  {
    id: 'CHG-007',
    stationId: 'STN-CT-01',
    stationName: 'Trạm Cần Thơ',
    stationAddress: '321 Đường GHI, Cần Thơ',
    connectorType: 'CCS2',
    maxKW: 50,
    status: 'offline',
    lastHeartbeat: new Date(Date.now() - 7200000).toISOString(),
    temperature: 28,
    uptime: 120,
    totalEnergyDelivered: 650,
    region: 'Cần Thơ'
  },
  {
    id: 'CHG-008',
    stationId: 'STN-CT-01',
    stationName: 'Trạm Cần Thơ',
    stationAddress: '321 Đường GHI, Cần Thơ',
    connectorType: 'Type2',
    maxKW: 11,
    status: 'online',
    lastHeartbeat: new Date().toISOString(),
    temperature: 32,
    uptime: 120,
    totalEnergyDelivered: 420,
    region: 'Cần Thơ'
  }
]

/**
 * Mock Charging Sessions Data
 */
export const mockSessions: ChargingSession[] = [
  {
    id: 'SES-001',
    chargerId: 'CHG-002',
    chargerName: 'CHG-002 - Type2 22kW',
    driverName: 'Nguyễn Văn A',
    phone: '0901234567',
    email: 'nguyenvana@email.com',
    vehicle: 'VinFast VF8',
    plate: '30A-12345',
    status: 'active',
    type: 'immediate',
    startTime: new Date(Date.now() - 1800000).toISOString(),
    estimatedKWh: 45,
    estimatedDuration: 120,
    actualKWh: 15,
    cost: 150000,
    progress: 33,
    createdBy: 'STAFF-001',
    createdAt: new Date(Date.now() - 1900000).toISOString()
  },
  {
    id: 'SES-002',
    chargerId: 'CHG-004',
    chargerName: 'CHG-004 - Tesla 120kW',
    driverName: 'Trần Thị B',
    phone: '0912345678',
    email: 'tranthib@email.com',
    vehicle: 'Tesla Model 3',
    plate: '30B-67890',
    status: 'active',
    type: 'immediate',
    startTime: new Date(Date.now() - 900000).toISOString(),
    estimatedKWh: 60,
    estimatedDuration: 45,
    actualKWh: 20,
    cost: 300000,
    progress: 45,
    createdBy: 'STAFF-002',
    createdAt: new Date(Date.now() - 1000000).toISOString()
  },
  {
    id: 'SES-003',
    chargerId: 'CHG-001',
    chargerName: 'CHG-001 - CCS2 50kW',
    driverName: 'Lê Văn C',
    phone: '0923456789',
    email: 'levanc@email.com',
    vehicle: 'Hyundai Ioniq 5',
    plate: '30C-11111',
    status: 'scheduled',
    type: 'scheduled',
    scheduledAt: new Date(Date.now() + 3600000).toISOString(),
    estimatedKWh: 50,
    estimatedDuration: 60,
    notes: 'Khách hàng yêu cầu sạc vào 14:00',
    createdBy: 'STAFF-001',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'SES-004',
    chargerId: 'CHG-003',
    chargerName: 'CHG-003 - CCS2 150kW',
    driverName: 'Phạm Thị D',
    phone: '0934567890',
    email: 'phamthid@email.com',
    vehicle: 'BMW i4',
    plate: '30D-22222',
    status: 'draft',
    type: 'draft',
    estimatedKWh: 70,
    estimatedDuration: 30,
    notes: 'Chờ khách hàng xác nhận thời gian',
    createdBy: 'STAFF-002',
    createdAt: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'SES-005',
    chargerId: 'CHG-006',
    chargerName: 'CHG-006 - Type2 22kW',
    driverName: 'Hoàng Văn E',
    phone: '0945678901',
    email: 'hoangvane@email.com',
    vehicle: 'Kia EV6',
    plate: '30E-33333',
    status: 'completed',
    type: 'immediate',
    startTime: new Date(Date.now() - 10800000).toISOString(),
    endTime: new Date(Date.now() - 7200000).toISOString(),
    estimatedKWh: 40,
    estimatedDuration: 90,
    actualKWh: 38,
    cost: 380000,
    progress: 100,
    createdBy: 'STAFF-001',
    createdAt: new Date(Date.now() - 11000000).toISOString()
  }
]

/**
 * Mock Support Tickets Data
 */
export const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    customerId: 'CUST-001',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0901234567',
    customerEmail: 'nguyenvana@email.com',
    subject: 'Không thể khởi động phiên sạc',
    messages: [
      {
        id: 'MSG-001',
        from: 'customer',
        senderName: 'Nguyễn Văn A',
        text: 'Xin chào, tôi đang ở trụ CHG-002 nhưng không thể khởi động phiên sạc. Màn hình hiển thị lỗi E01.',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'MSG-002',
        from: 'staff',
        senderName: 'Staff Support',
        text: 'Xin chào anh A, cho tôi kiểm tra lại trạng thái trụ sạc. Vui lòng đợi trong giây lát.',
        timestamp: new Date(Date.now() - 1500000).toISOString()
      },
      {
        id: 'MSG-003',
        from: 'staff',
        senderName: 'Staff Support',
        text: 'Tôi đã reset lại trụ sạc. Anh vui lòng thử lại và cho tôi biết kết quả nhé.',
        timestamp: new Date(Date.now() - 1200000).toISOString()
      },
      {
        id: 'MSG-004',
        from: 'customer',
        senderName: 'Nguyễn Văn A',
        text: 'Đã được rồi ạ! Cảm ơn bạn rất nhiều.',
        timestamp: new Date(Date.now() - 900000).toISOString()
      }
    ],
    status: 'resolved',
    priority: 'high',
    assignedTo: 'STAFF-001',
    assignedToName: 'Trần Văn Staff',
    linkedChargerId: 'CHG-002',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 900000).toISOString(),
    resolvedAt: new Date(Date.now() - 900000).toISOString()
  },
  {
    id: 'TKT-002',
    customerId: 'CUST-002',
    customerName: 'Trần Thị B',
    customerPhone: '0912345678',
    customerEmail: 'tranthib@email.com',
    subject: 'Thanh toán chưa được xử lý',
    messages: [
      {
        id: 'MSG-005',
        from: 'customer',
        senderName: 'Trần Thị B',
        text: 'Tôi đã thanh toán 300k cho phiên sạc SES-002 nhưng hệ thống vẫn hiện chưa thanh toán.',
        timestamp: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'MSG-006',
        from: 'staff',
        senderName: 'Nguyễn Thị Staff',
        text: 'Xin chào chị B, cho em kiểm tra lại giao dịch. Chị có thể cung cấp mã giao dịch được không ạ?',
        timestamp: new Date(Date.now() - 3000000).toISOString()
      },
      {
        id: 'MSG-007',
        from: 'customer',
        senderName: 'Trần Thị B',
        text: 'Mã giao dịch là TXN-12345',
        timestamp: new Date(Date.now() - 2400000).toISOString()
      }
    ],
    status: 'in-progress',
    priority: 'normal',
    assignedTo: 'STAFF-002',
    assignedToName: 'Nguyễn Thị Staff',
    linkedBookingId: 'BKG-002',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 2400000).toISOString()
  },
  {
    id: 'TKT-003',
    customerId: 'CUST-003',
    customerName: 'Lê Văn C',
    customerPhone: '0923456789',
    customerEmail: 'levanc@email.com',
    subject: 'Đổi lịch phiên sạc đã đặt',
    messages: [
      {
        id: 'MSG-008',
        from: 'customer',
        senderName: 'Lê Văn C',
        text: 'Tôi có thể đổi lịch phiên sạc SES-003 từ 14:00 sang 16:00 được không?',
        timestamp: new Date(Date.now() - 7200000).toISOString()
      }
    ],
    status: 'open',
    priority: 'low',
    linkedBookingId: 'BKG-003',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: 'TKT-004',
    customerId: 'CUST-004',
    customerName: 'Phạm Thị D',
    customerPhone: '0934567890',
    customerEmail: 'phamthid@email.com',
    subject: 'Trụ sạc bị lỗi giữa chừng',
    messages: [
      {
        id: 'MSG-009',
        from: 'customer',
        senderName: 'Phạm Thị D',
        text: 'Trụ CHG-005 đột ngột dừng sạc khi đang ở 50%. Màn hình hiển thị lỗi E03.',
        timestamp: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'MSG-010',
        from: 'system',
        senderName: 'System',
        text: 'Ticket đã được tự động chuyển sang mức độ ưu tiên URGENT do liên quan đến lỗi trụ sạc.',
        timestamp: new Date(Date.now() - 1790000).toISOString()
      }
    ],
    status: 'open',
    priority: 'urgent',
    linkedChargerId: 'CHG-005',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 1790000).toISOString()
  }
]

/**
 * Mock Staff Users Data
 */
export const mockStaffUsers: StaffUser[] = [
  {
    id: 'STAFF-001',
    name: 'Trần Văn Staff',
    email: 'tranvanstaff@evcharge.com',
    role: 'staff',
    assignedStations: ['STN-HN-01', 'STN-DN-01'],
    phone: '0911111111',
    isOnline: true
  },
  {
    id: 'STAFF-002',
    name: 'Nguyễn Thị Staff',
    email: 'nguyenthistaff@evcharge.com',
    role: 'staff',
    assignedStations: ['STN-HCM-01', 'STN-CT-01'],
    phone: '0922222222',
    isOnline: true
  },
  {
    id: 'STAFF-003',
    name: 'Lê Văn Admin',
    email: 'levanadmin@evcharge.com',
    role: 'admin',
    assignedStations: ['STN-HN-01', 'STN-HCM-01', 'STN-DN-01', 'STN-CT-01'],
    phone: '0933333333',
    isOnline: false
  }
]

/**
 * Mock Charger Log Events
 */
export const mockChargerLogs: ChargerLogEvent[] = [
  {
    id: 'LOG-001',
    chargerId: 'CHG-002',
    timestamp: new Date().toISOString(),
    eventType: 'heartbeat',
    message: 'Heartbeat received - Status: Online',
    severity: 'info'
  },
  {
    id: 'LOG-002',
    chargerId: 'CHG-002',
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    eventType: 'session_start',
    message: 'Session SES-001 started for driver Nguyễn Văn A',
    severity: 'info'
  },
  {
    id: 'LOG-003',
    chargerId: 'CHG-005',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    eventType: 'error',
    message: 'Communication error - Lost connection',
    severity: 'error'
  },
  {
    id: 'LOG-004',
    chargerId: 'CHG-005',
    timestamp: new Date(Date.now() - 3500000).toISOString(),
    eventType: 'maintenance',
    message: 'Charger put into maintenance mode by STAFF-001',
    severity: 'warning'
  },
  {
    id: 'LOG-005',
    chargerId: 'CHG-007',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    eventType: 'heartbeat',
    message: 'Heartbeat timeout - Status: Offline',
    severity: 'error'
  }
]

/**
 * Mock Quick Response Templates
 */
export const mockQuickResponses: QuickResponse[] = [
  {
    id: 'QR-001',
    title: 'Hướng dẫn khởi động phiên sạc',
    content:
      'Để khởi động phiên sạc, vui lòng làm theo các bước sau:\n1. Cắm cáp sạc vào xe\n2. Quét mã QR trên trụ sạc\n3. Chọn phương thức thanh toán\n4. Nhấn "Bắt đầu sạc"\n\nNếu gặp khó khăn, vui lòng liên hệ hotline: 1900-xxxx',
    category: 'technical'
  },
  {
    id: 'QR-002',
    title: 'Hướng dẫn thanh toán',
    content:
      'Chúng tôi chấp nhận các phương thức thanh toán sau:\n- Thẻ tín dụng/ghi nợ\n- Ví điện tử (Momo, ZaloPay, VNPay)\n- Chuyển khoản ngân hàng\n\nSau khi thanh toán, hệ thống sẽ tự động cập nhật và gửi hóa đơn qua email.',
    category: 'billing'
  },
  {
    id: 'QR-003',
    title: 'Đổi lịch phiên sạc',
    content:
      'Để đổi lịch phiên sạc đã đặt:\n1. Truy cập mục "Đặt chỗ của tôi"\n2. Chọn phiên cần đổi\n3. Nhấn "Đổi lịch"\n4. Chọn thời gian mới\n\nLưu ý: Chỉ có thể đổi lịch trước 2 giờ so với giờ đặt ban đầu.',
    category: 'booking'
  },
  {
    id: 'QR-004',
    title: 'Xử lý lỗi trụ sạc',
    content:
      'Trụ sạc đang gặp sự cố kỹ thuật. Chúng tôi đã:\n- Ghi nhận vấn đề\n- Thông báo đội kỹ thuật\n- Ước tính thời gian khắc phục: 30 phút\n\nQuý khách có thể sử dụng trụ sạc khác tại trạm hoặc chúng tôi sẽ hỗ trợ đổi lịch miễn phí.',
    category: 'technical'
  },
  {
    id: 'QR-005',
    title: 'Giải đáp chung',
    content:
      'Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi đã tiếp nhận yêu cầu và sẽ phản hồi trong thời gian sớm nhất.\n\nNếu cần hỗ trợ khẩn cấp, vui lòng gọi hotline: 1900-xxxx (24/7)',
    category: 'general'
  }
]

/**
 * Helper function to get charger by ID
 */
export const getChargerById = (id: string): Charger | undefined => {
  return mockChargers.find((charger) => charger.id === id)
}

/**
 * Helper function to get session by ID
 */
export const getSessionById = (id: string): ChargingSession | undefined => {
  return mockSessions.find((session) => session.id === id)
}

/**
 * Helper function to get ticket by ID
 */
export const getTicketById = (id: string): SupportTicket | undefined => {
  return mockTickets.find((ticket) => ticket.id === id)
}

/**
 * Helper function to get staff by ID
 */
export const getStaffById = (id: string): StaffUser | undefined => {
  return mockStaffUsers.find((staff) => staff.id === id)
}

