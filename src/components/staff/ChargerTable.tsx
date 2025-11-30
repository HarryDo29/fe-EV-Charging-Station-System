/**
 * ChargerTable Component
 * Displays chargers in table format for list view
 */

import React from 'react'
import { Charger } from '../../types/staff'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Link } from 'react-router-dom'

interface ChargerTableProps {
  chargers: Charger[]
  onStartSession?: (chargerId: string) => void
  onCreateSession?: (chargerId: string) => void
  onMaintenance?: (chargerId: string) => void
  onReset?: (chargerId: string) => void
  onRemoteStop?: (chargerId: string) => void
}

const ChargerTable: React.FC<ChargerTableProps> = ({
  chargers,
  onStartSession,
  onCreateSession,
  onMaintenance,
  onReset,
  onRemoteStop
}) => {
  const [anchorEl, setAnchorEl] = React.useState<{ [key: string]: HTMLElement | null }>({})

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, chargerId: string) => {
    event.preventDefault()
    setAnchorEl({ ...anchorEl, [chargerId]: event.currentTarget })
  }

  const handleMenuClose = (chargerId: string) => {
    setAnchorEl({ ...anchorEl, [chargerId]: null })
  }

  const getStatusColor = (status: string): 'default' | 'success' | 'error' | 'warning' | 'info' => {
    switch (status) {
      case 'online':
        return 'success'
      case 'offline':
        return 'error'
      case 'maintenance':
        return 'warning'
      case 'in-use':
        return 'info'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online':
        return 'Sẵn sàng'
      case 'offline':
        return 'Offline'
      case 'maintenance':
        return 'Bảo trì'
      case 'in-use':
        return 'Đang sử dụng'
      default:
        return status
    }
  }

  const formatLastSeen = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'Vừa xong'
    if (minutes < 60) return `${minutes} phút trước`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} giờ trước`
    const days = Math.floor(hours / 24)
    return `${days} ngày trước`
  }

  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e5e7eb', borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ bgcolor: '#f9fafb' }}>
            <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Mã trụ</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Trạm</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Connector</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Công suất</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Trạng thái</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Phiên hiện tại</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Nhiệt độ</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Uptime</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '14px' }}>Cập nhật</TableCell>
            <TableCell sx={{ fontWeight: 600, fontSize: '14px' }} align='right'>
              Thao tác
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chargers.map((charger) => (
            <TableRow key={charger.id} hover sx={{ '&:last-child td': { border: 0 } }}>
              <TableCell>
                <Link
                  to={`/staff/chargers/${charger.id}`}
                  className='font-mono font-semibold text-emerald-600 hover:text-emerald-700'
                >
                  {charger.id}
                </Link>
              </TableCell>

              <TableCell>
                <div>
                  <p className='font-medium text-gray-900 text-sm'>{charger.stationName}</p>
                  <p className='text-xs text-gray-500'>{charger.region}</p>
                </div>
              </TableCell>

              <TableCell>
                <Chip label={charger.connectorType} size='small' variant='outlined' />
              </TableCell>

              <TableCell>
                <span className='font-semibold text-gray-900'>{charger.maxKW} kW</span>
              </TableCell>

              <TableCell>
                <Chip label={getStatusLabel(charger.status)} size='small' color={getStatusColor(charger.status)} />
              </TableCell>

              <TableCell>
                {charger.currentSessionId ? (
                  <span className='font-mono text-sm text-blue-600'>{charger.currentSessionId}</span>
                ) : (
                  <span className='text-gray-400 text-sm'>-</span>
                )}
              </TableCell>

              <TableCell>
                {charger.temperature !== undefined ? (
                  <span
                    className={`font-medium ${
                      charger.temperature > 40 ? 'text-red-600' : charger.temperature > 35 ? 'text-orange-600' : 'text-gray-900'
                    }`}
                  >
                    {charger.temperature}°C
                  </span>
                ) : (
                  <span className='text-gray-400'>-</span>
                )}
              </TableCell>

              <TableCell>
                {charger.uptime !== undefined ? (
                  <span className='text-gray-900'>{charger.uptime}h</span>
                ) : (
                  <span className='text-gray-400'>-</span>
                )}
              </TableCell>

              <TableCell>
                <Tooltip title={new Date(charger.lastHeartbeat).toLocaleString('vi-VN')}>
                  <span className='text-sm text-gray-600'>{formatLastSeen(charger.lastHeartbeat)}</span>
                </Tooltip>
              </TableCell>

              <TableCell align='right'>
                <IconButton size='small' onClick={(e) => handleMenuClick(e, charger.id)}>
                  <MoreVertIcon fontSize='small' />
                </IconButton>

                <Menu
                  anchorEl={anchorEl[charger.id]}
                  open={Boolean(anchorEl[charger.id])}
                  onClose={() => handleMenuClose(charger.id)}
                >
                  <MenuItem
                    component={Link}
                    to={`/staff/chargers/${charger.id}`}
                    onClick={() => handleMenuClose(charger.id)}
                    sx={{ fontSize: '14px' }}
                  >
                    Xem chi tiết
                  </MenuItem>

                  {charger.status === 'online' && !charger.currentSessionId && (
                    <MenuItem
                      onClick={() => {
                        handleMenuClose(charger.id)
                        onStartSession?.(charger.id)
                      }}
                      sx={{ fontSize: '14px' }}
                    >
                      Bắt đầu sạc ngay
                    </MenuItem>
                  )}

                  <MenuItem
                    onClick={() => {
                      handleMenuClose(charger.id)
                      onCreateSession?.(charger.id)
                    }}
                    sx={{ fontSize: '14px' }}
                  >
                    Tạo phiên sạc
                  </MenuItem>

                  {charger.currentSessionId && (
                    <MenuItem
                      onClick={() => {
                        handleMenuClose(charger.id)
                        onRemoteStop?.(charger.id)
                      }}
                      sx={{ fontSize: '14px', color: 'error.main' }}
                    >
                      Dừng sạc từ xa
                    </MenuItem>
                  )}

                  {charger.status !== 'maintenance' && (
                    <MenuItem
                      onClick={() => {
                        handleMenuClose(charger.id)
                        onMaintenance?.(charger.id)
                      }}
                      sx={{ fontSize: '14px' }}
                    >
                      Chuyển sang bảo trì
                    </MenuItem>
                  )}

                  <MenuItem
                    onClick={() => {
                      handleMenuClose(charger.id)
                      onReset?.(charger.id)
                    }}
                    sx={{ fontSize: '14px' }}
                  >
                    Reset trụ sạc
                  </MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}

          {chargers.length === 0 && (
            <TableRow>
              <TableCell colSpan={10} align='center' sx={{ py: 4 }}>
                <p className='text-gray-500'>Không tìm thấy trụ sạc nào</p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ChargerTable

