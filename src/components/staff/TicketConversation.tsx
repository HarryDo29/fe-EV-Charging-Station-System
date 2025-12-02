/**
 * TicketConversation Component
 * Displays ticket conversation with reply functionality
 */

import React, { useState, useRef, useEffect } from 'react'
import type { SupportTicket, TicketMessage, QuickResponse } from '../../types/staff'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import LinkIcon from '@mui/icons-material/Link'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import { mockQuickResponses, mockStaffUsers } from '../../mocks/staffMocks'
import { Link } from 'react-router-dom'

interface TicketConversationProps {
  ticket: SupportTicket
  onSendMessage: (message: string, isInternal: boolean) => void
  onResolve: () => void
  onReopen: () => void
  onAssign: (staffId: string) => void
  onClose: () => void
}

const TicketConversation: React.FC<TicketConversationProps> = ({
  ticket,
  onSendMessage,
  onResolve,
  onReopen,
  onAssign,
  onClose
}) => {
  const [message, setMessage] = useState('')
  const [isInternal, setIsInternal] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [quickResponseAnchor, setQuickResponseAnchor] = useState<null | HTMLElement>(null)
  const [assignDialogOpen, setAssignDialogOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState(ticket.assignedTo || '')
  const [isTyping] = useState(false) // Mock typing indicator
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [ticket.messages])

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, isInternal)
      setMessage('')
      setIsInternal(false)
    }
  }

  const handleQuickResponse = (response: QuickResponse) => {
    setMessage(response.content)
    setQuickResponseAnchor(null)
  }

  const handleAssign = () => {
    if (selectedStaff) {
      onAssign(selectedStaff)
      setAssignDialogOpen(false)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()
    const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === date.toDateString()

    const timeStr = date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })

    if (isToday) return `Hôm nay ${timeStr}`
    if (isYesterday) return `Hôm qua ${timeStr}`
    return date.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
  }

  const getMessageBubbleStyle = (msg: TicketMessage) => {
    if (msg.from === 'customer') {
      return 'bg-gray-100 text-gray-900'
    } else if (msg.isInternal) {
      return 'bg-yellow-50 text-gray-900 border border-yellow-200'
    } else if (msg.from === 'staff') {
      return 'bg-emerald-500 text-white'
    } else {
      return 'bg-blue-50 text-blue-900 border border-blue-200'
    }
  }

  return (
    <Box className='h-full flex flex-col bg-white'>
      {/* Header */}
      <Box className='p-4 border-b border-gray-200'>
        <Box className='flex items-start justify-between mb-3'>
          <div className='flex-1'>
            <Typography variant='h6' className='font-bold text-gray-900 mb-1'>
              {ticket.subject}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              #{ticket.id}
            </Typography>
          </div>
          <IconButton size='small' onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* Customer Info */}
        <Card variant='outlined' className='mb-3'>
          <CardContent className='p-3'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 text-sm'>
              <div className='flex items-center space-x-2'>
                <PersonIcon fontSize='small' className='text-gray-500' />
                <span className='font-semibold'>{ticket.customerName}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <PhoneIcon fontSize='small' className='text-gray-500' />
                <span>{ticket.customerPhone}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <EmailIcon fontSize='small' className='text-gray-500' />
                <span className='truncate'>{ticket.customerEmail}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tags & Links */}
        <Box className='flex flex-wrap gap-2'>
          <Chip
            label={ticket.status === 'open' ? 'Mới' : ticket.status === 'in-progress' ? 'Đang xử lý' : ticket.status === 'resolved' ? 'Đã giải quyết' : 'Đã đóng'}
            color={
              ticket.status === 'open'
                ? 'info'
                : ticket.status === 'in-progress'
                  ? 'warning'
                  : ticket.status === 'resolved'
                    ? 'success'
                    : 'default'
            }
            size='small'
          />
          <Chip
            label={ticket.priority === 'urgent' ? 'Khẩn cấp' : ticket.priority === 'high' ? 'Cao' : ticket.priority === 'normal' ? 'Bình thường' : 'Thấp'}
            color={ticket.priority === 'urgent' ? 'error' : ticket.priority === 'high' ? 'warning' : 'default'}
            size='small'
            variant='outlined'
          />
          {ticket.assignedToName && <Chip label={`Phụ trách: ${ticket.assignedToName}`} size='small' variant='outlined' />}
          {ticket.linkedBookingId && (
            <Chip
              icon={<LinkIcon />}
              label={`Booking: ${ticket.linkedBookingId}`}
              size='small'
              variant='outlined'
              component={Link}
              to={`/staff/bookings/${ticket.linkedBookingId}`}
              clickable
            />
          )}
          {ticket.linkedChargerId && (
            <Chip
              icon={<LinkIcon />}
              label={`Charger: ${ticket.linkedChargerId}`}
              size='small'
              variant='outlined'
              component={Link}
              to={`/staff/chargers/${ticket.linkedChargerId}`}
              clickable
            />
          )}
        </Box>
      </Box>

      {/* Messages */}
      <Box className='flex-1 overflow-y-auto p-4 space-y-4'>
        {ticket.messages.map((msg) => (
          <Box
            key={msg.id}
            className={`flex ${msg.from === 'staff' && !msg.isInternal ? 'justify-end' : 'justify-start'}`}
          >
            <Box className={`max-w-[70%] ${msg.from === 'staff' && !msg.isInternal ? 'items-end' : 'items-start'} flex flex-col`}>
              {/* Sender Name & Time */}
              <Box className='flex items-center space-x-2 mb-1 px-3'>
                <Typography variant='caption' className='font-semibold text-gray-700'>
                  {msg.senderName}
                  {msg.isInternal && ' (Nội bộ)'}
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  {formatTime(msg.timestamp)}
                </Typography>
              </Box>

              {/* Message Bubble */}
              <Paper elevation={0} className={`p-3 rounded-2xl ${getMessageBubbleStyle(msg)}`}>
                <Typography variant='body2' className='whitespace-pre-wrap'>
                  {msg.text}
                </Typography>
              </Paper>

              {/* Attachments (mock) */}
              {msg.attachments && msg.attachments.length > 0 && (
                <Box className='mt-2 space-y-1'>
                  {msg.attachments.map((attachment, idx) => (
                    <Chip key={idx} label={attachment} size='small' icon={<AttachFileIcon />} variant='outlined' />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        ))}

        {/* Typing Indicator (mock) */}
        {isTyping && (
          <Box className='flex justify-start'>
            <Paper elevation={0} className='p-3 rounded-2xl bg-gray-100'>
              <Typography variant='caption' className='text-gray-500'>
                Khách hàng đang nhập...
              </Typography>
            </Paper>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Reply Box */}
      {ticket.status !== 'closed' && (
        <Box className='p-4 border-t border-gray-200'>
          <Box className='flex items-start space-x-2'>
            <Box className='flex-1'>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder='Nhập tin nhắn...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                variant='outlined'
              />
              <Box className='flex items-center justify-between mt-2'>
                <Box className='flex items-center space-x-2'>
                  <Button
                    size='small'
                    startIcon={<AttachFileIcon />}
                    onClick={() => alert('Chức năng đính kèm file (UI mock)')}
                  >
                    Đính kèm
                  </Button>
                  <Button size='small' onClick={(e) => setQuickResponseAnchor(e.currentTarget)}>
                    Phản hồi nhanh
                  </Button>
                  <FormControlLabel
                    control={<Checkbox checked={isInternal} onChange={(e) => setIsInternal(e.target.checked)} size='small' />}
                    label='Ghi chú nội bộ'
                  />
                </Box>
                <Button
                  variant='contained'
                  endIcon={<SendIcon />}
                  onClick={handleSend}
                  disabled={!message.trim()}
                >
                  Gửi
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Actions Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {ticket.status !== 'resolved' && (
          <MenuItem
            onClick={() => {
              setAnchorEl(null)
              onResolve()
            }}
          >
            ✅ Đánh dấu đã giải quyết
          </MenuItem>
        )}
        {ticket.status === 'resolved' && (
          <MenuItem
            onClick={() => {
              setAnchorEl(null)
              onReopen()
            }}
          >
            🔄 Mở lại ticket
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            setAssignDialogOpen(true)
          }}
        >
          👤 Phân công
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null)
            onClose()
          }}
          sx={{ color: 'error.main' }}
        >
          🔒 Đóng ticket
        </MenuItem>
      </Menu>

      {/* Quick Responses Menu */}
      <Menu anchorEl={quickResponseAnchor} open={Boolean(quickResponseAnchor)} onClose={() => setQuickResponseAnchor(null)}>
        {mockQuickResponses.map((response) => (
          <MenuItem key={response.id} onClick={() => handleQuickResponse(response)}>
            <Box>
              <Typography variant='subtitle2' className='font-semibold'>
                {response.title}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {response.category}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>

      {/* Assign Dialog */}
      <Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)} maxWidth='sm' fullWidth>
        <DialogTitle>Phân công ticket</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Chọn nhân viên</InputLabel>
            <Select value={selectedStaff} label='Chọn nhân viên' onChange={(e) => setSelectedStaff(e.target.value)}>
              {mockStaffUsers.map((staff) => (
                <MenuItem key={staff.id} value={staff.id}>
                  {staff.name} ({staff.role}) {staff.isOnline ? '🟢' : '⚫'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleAssign} variant='contained' disabled={!selectedStaff}>
            Phân công
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TicketConversation

