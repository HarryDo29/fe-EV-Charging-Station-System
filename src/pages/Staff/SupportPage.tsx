/**
 * SupportPage - Customer Support / Helpdesk
 * Ticket list + conversation view for staff to support customers
 */

import React, { useState } from 'react'
import DashboardLayout from '../../components/Dashboard/DashboardLayout'
import Sidebar from '../../components/Dashboard/Sidebar'
import TicketList from '../../components/staff/TicketList'
import TicketConversation from '../../components/staff/TicketConversation'
import { mockTickets, mockStaffUsers, getStaffById } from '../../mocks/staffMocks'
import { SupportTicket, TicketMessage } from '../../types/staff'
import { Box, Paper, Snackbar, Alert } from '@mui/material'

const staffSidebarItems = [
  { label: 'Dashboard', icon: <span>📊</span>, path: '/staff' },
  { label: 'Quản lý Trụ sạc', icon: <span>⚡</span>, path: '/staff/chargers' },
  { label: 'Phiên sạc', icon: <span>🔋</span>, path: '/staff/sessions' },
  { label: 'Hỗ trợ khách hàng', icon: <span>💬</span>, path: '/staff/support', badge: 3 }
]

const SupportPage: React.FC = () => {
  // State management
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets)
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)

  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'info' | 'warning'
  }>({
    open: false,
    message: '',
    severity: 'success'
  })

  // Get current staff (mock)
  const currentStaff = mockStaffUsers[0] // Assume first staff is logged in

  // Handle ticket selection
  const handleSelectTicket = (ticket: SupportTicket) => {
    setSelectedTicket(ticket)
  }

  // Handle send message
  const handleSendMessage = (message: string, isInternal: boolean) => {
    if (!selectedTicket) return

    // Create new message
    const newMessage: TicketMessage = {
      id: `MSG-${Date.now()}`,
      from: 'staff',
      senderName: currentStaff.name,
      text: message,
      timestamp: new Date().toISOString(),
      isInternal
    }

    // Update ticket
    const updatedTickets = tickets.map((t) => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          messages: [...t.messages, newMessage],
          updatedAt: new Date().toISOString(),
          status: t.status === 'open' ? 'in-progress' as const : t.status,
          assignedTo: t.assignedTo || currentStaff.id,
          assignedToName: t.assignedToName || currentStaff.name
        }
      }
      return t
    })

    setTickets(updatedTickets)
    setSelectedTicket(updatedTickets.find((t) => t.id === selectedTicket.id) || null)

    // TODO: replace with API call
    console.log('Send message:', newMessage)

    setSnackbar({
      open: true,
      message: isInternal ? '💬 Đã gửi ghi chú nội bộ' : '✅ Đã gửi tin nhắn',
      severity: 'success'
    })
  }

  // Handle resolve ticket
  const handleResolve = () => {
    if (!selectedTicket) return

    const updatedTickets = tickets.map((t) => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          status: 'resolved' as const,
          resolvedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
      return t
    })

    setTickets(updatedTickets)
    setSelectedTicket(updatedTickets.find((t) => t.id === selectedTicket.id) || null)

    // TODO: replace with API call
    console.log('Resolve ticket:', selectedTicket.id)

    setSnackbar({
      open: true,
      message: '✅ Đã đánh dấu ticket đã giải quyết',
      severity: 'success'
    })
  }

  // Handle reopen ticket
  const handleReopen = () => {
    if (!selectedTicket) return

    const updatedTickets = tickets.map((t) => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          status: 'in-progress' as const,
          resolvedAt: undefined,
          updatedAt: new Date().toISOString()
        }
      }
      return t
    })

    setTickets(updatedTickets)
    setSelectedTicket(updatedTickets.find((t) => t.id === selectedTicket.id) || null)

    // TODO: replace with API call
    console.log('Reopen ticket:', selectedTicket.id)

    setSnackbar({
      open: true,
      message: '🔄 Đã mở lại ticket',
      severity: 'info'
    })
  }

  // Handle assign ticket
  const handleAssign = (staffId: string) => {
    if (!selectedTicket) return

    const staff = getStaffById(staffId)
    if (!staff) return

    const updatedTickets = tickets.map((t) => {
      if (t.id === selectedTicket.id) {
        return {
          ...t,
          assignedTo: staff.id,
          assignedToName: staff.name,
          updatedAt: new Date().toISOString()
        }
      }
      return t
    })

    setTickets(updatedTickets)
    setSelectedTicket(updatedTickets.find((t) => t.id === selectedTicket.id) || null)

    // TODO: replace with API call
    console.log('Assign ticket to:', staff.name)

    setSnackbar({
      open: true,
      message: `👤 Đã phân công cho ${staff.name}`,
      severity: 'success'
    })
  }

  // Handle close ticket
  const handleClose = () => {
    if (!selectedTicket) return

    if (window.confirm('Bạn có chắc muốn đóng ticket này? Ticket đã đóng không thể mở lại.')) {
      const updatedTickets = tickets.map((t) => {
        if (t.id === selectedTicket.id) {
          return {
            ...t,
            status: 'closed' as const,
            updatedAt: new Date().toISOString()
          }
        }
        return t
      })

      setTickets(updatedTickets)
      setSelectedTicket(updatedTickets.find((t) => t.id === selectedTicket.id) || null)

      // TODO: replace with API call
      console.log('Close ticket:', selectedTicket.id)

      setSnackbar({
        open: true,
        message: '🔒 Đã đóng ticket',
        severity: 'info'
      })
    }
  }

  return (
    <DashboardLayout sidebar={<Sidebar items={staffSidebarItems} userRole='staff' />}>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900'>Hỗ trợ khách hàng</h1>
        <p className='text-gray-500 mt-1'>Quản lý và trả lời các yêu cầu hỗ trợ từ khách hàng</p>
      </div>

      {/* Main Layout: List + Conversation */}
      <Paper elevation={0} className='border border-gray-200 overflow-hidden' style={{ height: 'calc(100vh - 250px)' }}>
        <div className='flex h-full'>
          {/* Ticket List - Left Side */}
          <div className='w-full md:w-1/3 border-r border-gray-200 overflow-hidden'>
            <TicketList tickets={tickets} selectedTicketId={selectedTicket?.id} onSelectTicket={handleSelectTicket} />
          </div>

          {/* Conversation - Right Side */}
          <div className='hidden md:block w-2/3 overflow-hidden'>
            {selectedTicket ? (
              <TicketConversation
                ticket={selectedTicket}
                onSendMessage={handleSendMessage}
                onResolve={handleResolve}
                onReopen={handleReopen}
                onAssign={handleAssign}
                onClose={handleClose}
              />
            ) : (
              <Box className='flex items-center justify-center h-full'>
                <div className='text-center text-gray-400'>
                  <svg className='w-24 h-24 mx-auto mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1}
                      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                    />
                  </svg>
                  <p className='text-lg'>Chọn một ticket để xem chi tiết</p>
                </div>
              </Box>
            )}
          </div>
        </div>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </DashboardLayout>
  )
}

export default SupportPage

