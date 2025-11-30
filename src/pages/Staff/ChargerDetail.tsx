/**
 * ChargerDetail - Charger Detail View
 * Shows detailed information, telemetry, current session, logs, and controls
 */

import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '../../components/Dashboard/DashboardLayout'
import Sidebar from '../../components/Dashboard/Sidebar'
import { mockChargerLogs, getChargerById, getSessionById } from '../../mocks/staffMocks'
import {
  Button,
  Chip,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
  Box
} from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import BuildIcon from '@mui/icons-material/Build'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ScheduleIcon from '@mui/icons-material/Schedule'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EvStationIcon from '@mui/icons-material/EvStation'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ErrorIcon from '@mui/icons-material/Error'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab'

const staffSidebarItems = [
  { label: 'Dashboard', icon: <DashboardIcon sx={{ fontSize: 20 }} />, path: '/staff' },
  { label: 'Quản lý Trụ sạc', icon: <EvStationIcon sx={{ fontSize: 20 }} />, path: '/staff/chargers' },
  { label: 'Phiên sạc', icon: <BatteryChargingFullIcon sx={{ fontSize: 20 }} />, path: '/staff/sessions' },
  { label: 'Hỗ trợ khách hàng', icon: <SupportAgentIcon sx={{ fontSize: 20 }} />, path: '/staff/support', badge: 3 }
]

const ChargerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // Find charger and session
  const charger = getChargerById(id || '')
  const currentSession = charger?.currentSessionId ? getSessionById(charger.currentSessionId) : null
  const logs = mockChargerLogs.filter((log) => log.chargerId === id).slice(0, 10)

  // State
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    title: string
    message: string
    onConfirm: () => void
  }>({
    open: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })

  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'info' | 'warning'
  }>({
    open: false,
    message: '',
    severity: 'success'
  })

  if (!charger) {
    return (
      <DashboardLayout sidebar={<Sidebar items={staffSidebarItems} userRole='staff' />}>
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>Không tìm thấy trụ sạc</p>
          <Button onClick={() => navigate('/staff/chargers')} className='mt-4'>
            Quay lại danh sách
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  // Action handlers
  const handleStartImmediate = () => {
    setConfirmDialog({
      open: true,
      title: 'Bắt đầu sạc ngay',
      message: 'Bạn có chắc muốn bắt đầu phiên sạc ngay lập tức tại trụ này?',
      onConfirm: () => {
        // TODO: replace with API call
        console.log('Start immediate session')
        setSnackbar({
          open: true,
          message: 'Đã bắt đầu phiên sạc',
          severity: 'success'
        })
        setConfirmDialog({ ...confirmDialog, open: false })
      }
    })
  }

  const handleRemoteStop = () => {
    setConfirmDialog({
      open: true,
      title: 'Dừng sạc từ xa',
      message: 'Bạn có chắc muốn dừng phiên sạc hiện tại?',
      onConfirm: () => {
        // TODO: replace with API call
        console.log('Remote stop')
        setSnackbar({
          open: true,
          message: 'Đã gửi lệnh dừng sạc',
          severity: 'warning'
        })
        setConfirmDialog({ ...confirmDialog, open: false })
      }
    })
  }

  const handleReset = () => {
    setConfirmDialog({
      open: true,
      title: 'Reset trụ sạc',
      message: 'Bạn có chắc muốn reset trụ sạc? Điều này có thể ngắt phiên sạc hiện tại.',
      onConfirm: () => {
        // TODO: replace with API call
        console.log('Reset charger')
        setSnackbar({
          open: true,
          message: 'Đã gửi lệnh reset',
          severity: 'info'
        })
        setConfirmDialog({ ...confirmDialog, open: false })
      }
    })
  }

  const getStatusColor = (status: string) => {
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

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'heartbeat':
        return <FavoriteIcon sx={{ fontSize: 16 }} className='text-pink-500' />
      case 'session_start':
        return <PlayArrowIcon sx={{ fontSize: 16 }} className='text-green-600' />
      case 'session_end':
        return <StopIcon sx={{ fontSize: 16 }} className='text-gray-600' />
      case 'error':
        return <ErrorIcon sx={{ fontSize: 16 }} className='text-red-600' />
      case 'maintenance':
        return <BuildIcon sx={{ fontSize: 16 }} className='text-orange-600' />
      case 'reset':
        return <RestartAltIcon sx={{ fontSize: 16 }} className='text-blue-600' />
      default:
        return <BoltIcon sx={{ fontSize: 16 }} className='text-gray-600' />
    }
  }

  const getEventLabel = (eventType: string) => {
    switch (eventType) {
      case 'heartbeat':
        return 'Heartbeat'
      case 'session_start':
        return 'Bắt đầu phiên'
      case 'session_end':
        return 'Kết thúc phiên'
      case 'error':
        return 'Lỗi'
      case 'maintenance':
        return 'Bảo trì'
      case 'reset':
        return 'Reset'
      default:
        return eventType
    }
  }

  return (
    <DashboardLayout sidebar={<Sidebar items={staffSidebarItems} userRole='staff' />}>
      {/* Header */}
      <div className='mb-6'>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/staff/chargers')} className='mb-4'>
          Quay lại
        </Button>
        <div className='flex items-start justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>{charger.id}</h1>
            <p className='text-gray-500 mt-1'>
              {charger.stationName} - {charger.stationAddress}
            </p>
          </div>
          <Chip
            label={getStatusLabel(charger.status)}
            color={getStatusColor(charger.status) as 'success' | 'error' | 'warning' | 'info' | 'default'}
          />
        </div>
      </div>

      {/* Actions */}
      <div className='flex flex-wrap gap-3 mb-6'>
        {charger.status === 'online' && !charger.currentSessionId && (
          <Button variant='contained' startIcon={<PlayArrowIcon />} onClick={handleStartImmediate}>
            Bắt đầu sạc ngay
          </Button>
        )}
        {charger.currentSessionId && (
          <Button variant='outlined' color='error' startIcon={<StopIcon />} onClick={handleRemoteStop}>
            Dừng sạc từ xa
          </Button>
        )}
        <Button
          variant='outlined'
          startIcon={<ScheduleIcon />}
          onClick={() => navigate(`/staff/sessions/create?chargerId=${charger.id}`)}
        >
          Tạo phiên sạc
        </Button>
        <Button variant='outlined' startIcon={<RestartAltIcon />} onClick={handleReset}>
          Reset
        </Button>
        {charger.status !== 'maintenance' && (
          <Button variant='outlined' startIcon={<BuildIcon />}>
            Chuyển sang bảo trì
          </Button>
        )}
      </div>

      {/* Telemetry Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <Card>
          <CardContent>
            <Box className='flex items-center justify-between mb-2'>
              <Typography variant='body2' color='text.secondary'>
                Công suất
              </Typography>
              <BoltIcon className='text-yellow-500' />
            </Box>
            <Typography variant='h4' className='font-bold'>
              {charger.maxKW} kW
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {charger.connectorType}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box className='flex items-center justify-between mb-2'>
              <Typography variant='body2' color='text.secondary'>
                Nhiệt độ
              </Typography>
              <ThermostatIcon className='text-red-400' />
            </Box>
            <Typography variant='h4' className='font-bold'>
              {charger.temperature || 'N/A'}°C
            </Typography>
            <Typography
              variant='caption'
              className={charger.temperature && charger.temperature > 40 ? 'text-red-600' : 'text-gray-600'}
            >
              {charger.temperature && charger.temperature > 40 ? 'Cảnh báo cao' : 'Bình thường'}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box className='flex items-center justify-between mb-2'>
              <Typography variant='body2' color='text.secondary'>
                Uptime
              </Typography>
              <AccessTimeIcon className='text-blue-400' />
            </Box>
            <Typography variant='h4' className='font-bold'>
              {charger.uptime || 0}h
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              Liên tục hoạt động
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Box className='flex items-center justify-between mb-2'>
              <Typography variant='body2' color='text.secondary'>
                Năng lượng
              </Typography>
              <EnergySavingsLeafIcon className='text-emerald-500' />
            </Box>
            <Typography variant='h4' className='font-bold'>
              {charger.totalEnergyDelivered || 0}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              kWh đã cung cấp
            </Typography>
          </CardContent>
        </Card>
      </div>

      {/* Current Session */}
      {currentSession && (
        <Card className='mb-6'>
          <CardContent>
            <Typography variant='h6' className='font-bold mb-4'>
              Phiên sạc hiện tại
            </Typography>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <Typography variant='body2' color='text.secondary'>
                  Session ID
                </Typography>
                <Typography variant='body1' className='font-mono font-semibold'>
                  {currentSession.id}
                </Typography>
              </div>
              <div>
                <Typography variant='body2' color='text.secondary'>
                  Khách hàng
                </Typography>
                <Typography variant='body1' className='font-semibold'>
                  {currentSession.driverName}
                </Typography>
              </div>
              <div>
                <Typography variant='body2' color='text.secondary'>
                  Xe
                </Typography>
                <Typography variant='body1'>
                  {currentSession.vehicle} ({currentSession.plate})
                </Typography>
              </div>
              <div>
                <Typography variant='body2' color='text.secondary'>
                  Bắt đầu
                </Typography>
                <Typography variant='body1'>{new Date(currentSession.startTime!).toLocaleString('vi-VN')}</Typography>
              </div>
              <div>
                <Typography variant='body2' color='text.secondary'>
                  Năng lượng ước tính
                </Typography>
                <Typography variant='body1'>{currentSession.estimatedKWh} kWh</Typography>
              </div>
              <div>
                <Typography variant='body2' color='text.secondary'>
                  Chi phí ước tính
                </Typography>
                <Typography variant='body1' className='font-semibold text-emerald-600'>
                  ₫{currentSession.cost?.toLocaleString()}
                </Typography>
              </div>
            </div>

            {/* Progress */}
            {currentSession.progress !== undefined && (
              <div>
                <Box className='flex items-center justify-between mb-1'>
                  <Typography variant='body2' color='text.secondary'>
                    Tiến độ
                  </Typography>
                  <Typography variant='body2' className='font-semibold'>
                    {currentSession.progress}%
                  </Typography>
                </Box>
                <LinearProgress variant='determinate' value={currentSession.progress} />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Logs Timeline */}
      <Card>
        <CardContent>
          <Typography variant='h6' className='font-bold mb-4'>
            Nhật ký hoạt động
          </Typography>
          <Timeline position='right'>
            {logs.map((log, index) => (
              <TimelineItem key={log.id}>
                <TimelineOppositeContent color='text.secondary' sx={{ flex: 0.3 }}>
                  <Typography variant='caption'>{new Date(log.timestamp).toLocaleString('vi-VN')}</Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    color={log.severity === 'error' ? 'error' : log.severity === 'warning' ? 'warning' : 'primary'}
                  />
                  {index < logs.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Box className='flex items-center gap-2 mb-1'>
                    {getEventIcon(log.eventType)}
                    <Typography variant='body2' className='font-semibold'>
                      {getEventLabel(log.eventType)}
                    </Typography>
                  </Box>
                  <Typography variant='body2' color='text.secondary'>
                    {log.message}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>

      {/* Confirm Dialog */}
      <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}>
        <DialogTitle>{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>Hủy</Button>
          <Button onClick={confirmDialog.onConfirm} variant='contained' autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

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

export default ChargerDetail
