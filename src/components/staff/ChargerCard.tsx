/**
 * ChargerCard Component
 * Displays charger information in card format for grid view
 */

import React from 'react'
import { Charger } from '../../types/staff'
import { Chip, IconButton, Menu, MenuItem, Tooltip } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import BoltIcon from '@mui/icons-material/Bolt'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { Link } from 'react-router-dom'

interface ChargerCardProps {
  charger: Charger
  onStartSession?: (chargerId: string) => void
  onCreateSession?: (chargerId: string) => void
  onMaintenance?: (chargerId: string) => void
  onReset?: (chargerId: string) => void
  onRemoteStop?: (chargerId: string) => void
}

const ChargerCard: React.FC<ChargerCardProps> = ({
  charger,
  onStartSession,
  onCreateSession,
  onMaintenance,
  onReset,
  onRemoteStop
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-emerald-100 text-emerald-700'
      case 'offline':
        return 'bg-gray-100 text-gray-700'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-700'
      case 'in-use':
        return 'bg-blue-100 text-blue-700'
      default:
        return 'bg-gray-100 text-gray-700'
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

  const getConnectorTypeColor = (type: string) => {
    switch (type) {
      case 'CCS2':
        return 'bg-purple-100 text-purple-700'
      case 'Type2':
        return 'bg-blue-100 text-blue-700'
      case 'CHAdeMO':
        return 'bg-orange-100 text-orange-700'
      case 'Tesla':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
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
    <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow'>
      {/* Header */}
      <div className='p-4 border-b border-gray-100 flex items-start justify-between'>
        <div className='flex-1'>
          <Link to={`/staff/chargers/${charger.id}`} className='hover:text-emerald-600 transition-colors'>
            <h3 className='text-lg font-bold text-gray-900 mb-1'>{charger.id}</h3>
          </Link>
          <p className='text-sm text-gray-600'>{charger.stationName}</p>
        </div>
        <div className='flex items-center space-x-2'>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(charger.status)}`}>
            {getStatusLabel(charger.status)}
          </span>
          <IconButton size='small' onClick={handleMenuClick}>
            <MoreVertIcon fontSize='small' />
          </IconButton>
        </div>
      </div>

      {/* Body */}
      <div className='p-4 space-y-3'>
        {/* Connector Type & Power */}
        <div className='flex items-center justify-between'>
          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getConnectorTypeColor(charger.connectorType)}`}>
            {charger.connectorType}
          </span>
          <div className='flex items-center space-x-1 text-gray-900 font-semibold'>
            <BoltIcon fontSize='small' className='text-yellow-500' />
            <span>{charger.maxKW} kW</span>
          </div>
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 gap-3'>
          {charger.temperature !== undefined && (
            <div className='flex items-center space-x-2'>
              <ThermostatIcon fontSize='small' className='text-red-400' />
              <div>
                <p className='text-xs text-gray-500'>Nhiệt độ</p>
                <p className='text-sm font-semibold text-gray-900'>{charger.temperature}°C</p>
              </div>
            </div>
          )}

          {charger.uptime !== undefined && (
            <div className='flex items-center space-x-2'>
              <AccessTimeIcon fontSize='small' className='text-blue-400' />
              <div>
                <p className='text-xs text-gray-500'>Uptime</p>
                <p className='text-sm font-semibold text-gray-900'>{charger.uptime}h</p>
              </div>
            </div>
          )}
        </div>

        {/* Current Session */}
        {charger.currentSessionId && (
          <div className='bg-blue-50 p-3 rounded-lg'>
            <p className='text-xs text-blue-600 mb-1'>Phiên hiện tại</p>
            <p className='text-sm font-mono font-semibold text-blue-900'>{charger.currentSessionId}</p>
          </div>
        )}

        {/* Last Heartbeat */}
        <div className='flex items-center justify-between text-xs text-gray-500'>
          <span>Cập nhật:</span>
          <Tooltip title={new Date(charger.lastHeartbeat).toLocaleString('vi-VN')}>
            <span className='font-medium'>{formatLastSeen(charger.lastHeartbeat)}</span>
          </Tooltip>
        </div>

        {/* Total Energy */}
        {charger.totalEnergyDelivered !== undefined && (
          <div className='pt-3 border-t border-gray-100'>
            <p className='text-xs text-gray-500'>Tổng năng lượng</p>
            <p className='text-lg font-bold text-emerald-600'>{charger.totalEnergyDelivered} kWh</p>
          </div>
        )}
      </div>

      {/* Actions Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem
          component={Link}
          to={`/staff/chargers/${charger.id}`}
          onClick={handleMenuClose}
          sx={{ fontSize: '14px' }}
        >
          Xem chi tiết
        </MenuItem>

        {charger.status === 'online' && !charger.currentSessionId && (
          <MenuItem
            onClick={() => {
              handleMenuClose()
              onStartSession?.(charger.id)
            }}
            sx={{ fontSize: '14px' }}
          >
            Bắt đầu sạc ngay
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            handleMenuClose()
            onCreateSession?.(charger.id)
          }}
          sx={{ fontSize: '14px' }}
        >
          Tạo phiên sạc
        </MenuItem>

        {charger.currentSessionId && (
          <MenuItem
            onClick={() => {
              handleMenuClose()
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
              handleMenuClose()
              onMaintenance?.(charger.id)
            }}
            sx={{ fontSize: '14px' }}
          >
            Chuyển sang bảo trì
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            handleMenuClose()
            onReset?.(charger.id)
          }}
          sx={{ fontSize: '14px' }}
        >
          Reset trụ sạc
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ChargerCard

