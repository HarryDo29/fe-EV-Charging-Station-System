/**
 * TicketList Component
 * Displays list of support tickets with filters
 */

import React, { useState } from 'react'
import type { SupportTicket, TicketStatus, TicketPriority } from '../../types/staff'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Chip,
  Badge,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Divider
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import LinkIcon from '@mui/icons-material/Link'

interface TicketListProps {
  tickets: SupportTicket[]
  selectedTicketId?: string
  onSelectTicket: (ticket: SupportTicket) => void
}

const TicketList: React.FC<TicketListProps> = ({ tickets, selectedTicketId, onSelectTicket }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<TicketStatus | 'all'>('all')
  const [filterPriority, setFilterPriority] = useState<TicketPriority | 'all'>('all')

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: TicketStatus): 'default' | 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
      case 'open':
        return 'info'
      case 'in-progress':
        return 'warning'
      case 'resolved':
        return 'success'
      case 'closed':
        return 'default'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: TicketStatus) => {
    switch (status) {
      case 'open':
        return 'Mới'
      case 'in-progress':
        return 'Đang xử lý'
      case 'resolved':
        return 'Đã giải quyết'
      case 'closed':
        return 'Đã đóng'
      default:
        return status
    }
  }

  const getPriorityColor = (priority: TicketPriority): 'default' | 'success' | 'warning' | 'error' => {
    switch (priority) {
      case 'low':
        return 'default'
      case 'normal':
        return 'success'
      case 'high':
        return 'warning'
      case 'urgent':
        return 'error'
      default:
        return 'default'
    }
  }

  const getPriorityLabel = (priority: TicketPriority) => {
    switch (priority) {
      case 'low':
        return 'Thấp'
      case 'normal':
        return 'Bình thường'
      case 'high':
        return 'Cao'
      case 'urgent':
        return 'Khẩn cấp'
      default:
        return priority
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / 3600000)

    if (hours < 1) {
      const minutes = Math.floor(diff / 60000)
      return `${minutes} phút trước`
    }
    if (hours < 24) return `${hours} giờ trước`
    const days = Math.floor(hours / 24)
    return `${days} ngày trước`
  }

  // Count unread messages (mock: last message from customer)
  const hasUnread = (ticket: SupportTicket) => {
    const lastMessage = ticket.messages[ticket.messages.length - 1]
    return lastMessage?.from === 'customer' && ticket.status !== 'resolved'
  }

  return (
    <Box className='h-full flex flex-col bg-white border-r border-gray-200'>
      {/* Header */}
      <Box className='p-4 border-b border-gray-200'>
        <Typography variant='h6' className='font-bold mb-3'>
          Hỗ trợ khách hàng
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          size='small'
          placeholder='Tìm kiếm ticket...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon fontSize='small' />
              </InputAdornment>
            )
          }}
          className='mb-3'
        />

        {/* Filters */}
        <div className='grid grid-cols-2 gap-2'>
          <FormControl size='small' fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select value={filterStatus} label='Trạng thái' onChange={(e) => setFilterStatus(e.target.value)}>
              <MenuItem value='all'>Tất cả</MenuItem>
              <MenuItem value='open'>Mới</MenuItem>
              <MenuItem value='in-progress'>Đang xử lý</MenuItem>
              <MenuItem value='resolved'>Đã giải quyết</MenuItem>
              <MenuItem value='closed'>Đã đóng</MenuItem>
            </Select>
          </FormControl>

          <FormControl size='small' fullWidth>
            <InputLabel>Mức độ</InputLabel>
            <Select value={filterPriority} label='Mức độ' onChange={(e) => setFilterPriority(e.target.value)}>
              <MenuItem value='all'>Tất cả</MenuItem>
              <MenuItem value='low'>Thấp</MenuItem>
              <MenuItem value='normal'>Bình thường</MenuItem>
              <MenuItem value='high'>Cao</MenuItem>
              <MenuItem value='urgent'>Khẩn cấp</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Stats */}
        <div className='flex items-center justify-between mt-3 text-sm text-gray-600'>
          <span>{filteredTickets.length} tickets</span>
          <span>{filteredTickets.filter((t) => hasUnread(t)).length} chưa đọc</span>
        </div>
      </Box>

      {/* Ticket List */}
      <Box className='flex-1 overflow-y-auto'>
        <List disablePadding>
          {filteredTickets.map((ticket, index) => (
            <React.Fragment key={ticket.id}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={selectedTicketId === ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className={hasUnread(ticket) ? 'bg-blue-50' : ''}
                >
                  <ListItemText
                    primary={
                      <Box className='flex items-start justify-between mb-1'>
                        <Typography variant='subtitle2' className='font-semibold text-gray-900 flex-1 pr-2'>
                          <Badge color='primary' variant='dot' invisible={!hasUnread(ticket)}>
                            {ticket.subject}
                          </Badge>
                        </Typography>
                        <Typography variant='caption' className='text-gray-500 flex-shrink-0'>
                          {formatTime(ticket.updatedAt)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box>
                        {/* Customer Info */}
                        <Box className='flex items-center space-x-1 text-sm text-gray-600 mb-2'>
                          <PersonIcon fontSize='small' sx={{ fontSize: 16 }} />
                          <span>{ticket.customerName}</span>
                          <span>•</span>
                          <span className='font-mono text-xs'>{ticket.id}</span>
                        </Box>

                        {/* Tags */}
                        <Box className='flex flex-wrap gap-1'>
                          <Chip label={getStatusLabel(ticket.status)} size='small' color={getStatusColor(ticket.status)} />
                          <Chip
                            label={getPriorityLabel(ticket.priority)}
                            size='small'
                            color={getPriorityColor(ticket.priority)}
                            variant='outlined'
                          />
                          {ticket.assignedToName && (
                            <Chip label={ticket.assignedToName} size='small' variant='outlined' />
                          )}
                          {(ticket.linkedBookingId || ticket.linkedChargerId) && (
                            <Chip icon={<LinkIcon sx={{ fontSize: 14 }} />} label='Có liên kết' size='small' variant='outlined' />
                          )}
                        </Box>
                      </Box>
                    }
                  />
                </ListItemButton>
              </ListItem>
              {index < filteredTickets.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>

        {filteredTickets.length === 0 && (
          <Box className='flex items-center justify-center h-full p-8'>
            <Typography variant='body2' color='text.secondary'>
              Không tìm thấy ticket nào
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default TicketList

