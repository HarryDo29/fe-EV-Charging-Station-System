/**
 * ChargersPage - Staff Charger Management
 * Displays list of chargers with filters and actions
 *
 * INTEGRATION NOTES:
 * - Import this page in App.tsx route: /staff/chargers
 * - Uses DashboardLayout with role='staff' from existing components
 * - Uses mock data from src/mocks/staffMocks.ts
 * - TODO: Replace mock data with API calls
 */

import React, { useState } from 'react'
import DashboardLayout from '../../components/Dashboard/DashboardLayout'
import Sidebar from '../../components/Dashboard/Sidebar'
import ChargerCard from '../../components/staff/ChargerCard'
import ChargerTable from '../../components/staff/ChargerTable'
import { mockChargers } from '../../mocks/staffMocks'
import type { Charger, ChargerStatus, ConnectorType } from '../../types/staff'
import {
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import GridViewIcon from '@mui/icons-material/GridView'
import TableRowsIcon from '@mui/icons-material/TableRows'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'

// Sidebar items for staff
const staffSidebarItems = [
  {
    label: 'Dashboard',
    icon: <span>📊</span>,
    path: '/staff'
  },
  {
    label: 'Quản lý Trụ sạc',
    icon: <span>⚡</span>,
    path: '/staff/chargers'
  },
  {
    label: 'Phiên sạc',
    icon: <span>🔋</span>,
    path: '/staff/sessions'
  },
  {
    label: 'Hỗ trợ khách hàng',
    icon: <span>💬</span>,
    path: '/staff/support',
    badge: 3
  }
]

const ChargersPage: React.FC = () => {
  const navigate = useNavigate()

  // State management
  const [chargers] = useState<Charger[]>(mockChargers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<ChargerStatus | 'all'>('all')
  const [filterConnector, setFilterConnector] = useState<ConnectorType | 'all'>('all')
  const [filterRegion, setFilterRegion] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  // Dialog state
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

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'info' | 'warning'
  }>({
    open: false,
    message: '',
    severity: 'success'
  })

  // Filter chargers
  const filteredChargers = chargers.filter((charger) => {
    const matchesSearch =
      charger.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charger.stationName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || charger.status === filterStatus
    const matchesConnector = filterConnector === 'all' || charger.connectorType === filterConnector
    const matchesRegion = filterRegion === 'all' || charger.region === filterRegion

    return matchesSearch && matchesStatus && matchesConnector && matchesRegion
  })

  // Get unique regions
  const regions = Array.from(new Set(chargers.map((c) => c.region).filter(Boolean)))

  // Action handlers
  const handleStartSession = (chargerId: string) => {
    const charger = chargers.find((c) => c.id === chargerId)
    setConfirmDialog({
      open: true,
      title: 'Bắt đầu phiên sạc',
      message: `Bạn có chắc muốn bắt đầu phiên sạc tại trụ ${charger?.id}?`,
      onConfirm: () => {
        // TODO: replace with API call
        console.log('Start session for charger:', chargerId)
        setSnackbar({
          open: true,
          message: `Đã bắt đầu phiên sạc tại ${charger?.id}`,
          severity: 'success'
        })
        setConfirmDialog({ ...confirmDialog, open: false })
      }
    })
  }

  const handleCreateSession = (chargerId: string) => {
    navigate(`/staff/sessions/create?chargerId=${chargerId}`)
  }

  const handleMaintenance = (chargerId: string) => {
    const charger = chargers.find((c) => c.id === chargerId)
    setConfirmDialog({
      open: true,
      title: 'Chuyển sang bảo trì',
      message: `Bạn có chắc muốn chuyển trụ ${charger?.id} sang chế độ bảo trì?`,
      onConfirm: () => {
        // TODO: replace with API call
        console.log('Set charger to maintenance:', chargerId)
        setSnackbar({
          open: true,
          message: `Đã chuyển ${charger?.id} sang chế độ bảo trì`,
          severity: 'success'
        })
        setConfirmDialog({ ...confirmDialog, open: false })
      }
    })
  }

  const handleReset = (chargerId: string) => {
    const charger = chargers.find((c) => c.id === chargerId)
    setConfirmDialog({
      open: true,
      title: 'Reset trụ sạc',
      message: `Bạn có chắc muốn reset trụ ${charger?.id}? Điều này có thể ngắt phiên sạc hiện tại.`,
      onConfirm: () => {
        // TODO: replace with API call
        console.log('Reset charger:', chargerId)
        setSnackbar({
          open: true,
          message: `Đã gửi lệnh reset đến ${charger?.id}`,
          severity: 'info'
        })
        setConfirmDialog({ ...confirmDialog, open: false })
      }
    })
  }

  const handleRemoteStop = (chargerId: string) => {
    const charger = chargers.find((c) => c.id === chargerId)
    setConfirmDialog({
      open: true,
      title: 'Dừng sạc từ xa',
      message: `Bạn có chắc muốn dừng phiên sạc hiện tại tại trụ ${charger?.id}?`,
      onConfirm: () => {
        // TODO: replace with API call
        console.log('Remote stop charger:', chargerId)
        setSnackbar({
          open: true,
          message: `Đã gửi lệnh dừng sạc đến ${charger?.id}`,
          severity: 'warning'
        })
        setConfirmDialog({ ...confirmDialog, open: false })
      }
    })
  }

  // Stats
  const stats = {
    total: chargers.length,
    online: chargers.filter((c) => c.status === 'online').length,
    inUse: chargers.filter((c) => c.status === 'in-use').length,
    maintenance: chargers.filter((c) => c.status === 'maintenance').length,
    offline: chargers.filter((c) => c.status === 'offline').length
  }

  return (
    <DashboardLayout sidebar={<Sidebar items={staffSidebarItems} userRole='staff' />}>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>Quản lý Trụ sạc</h1>
            <p className='text-gray-500 mt-1'>Giám sát và điều khiển các trụ sạc được phân công</p>
          </div>
          <Button variant='contained' startIcon={<AddIcon />} onClick={() => navigate('/staff/sessions/create')}>
            Tạo phiên sạc
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mb-6'>
        <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-100'>
          <p className='text-sm text-gray-600'>Tổng số trụ</p>
          <p className='text-2xl font-bold text-gray-900'>{stats.total}</p>
        </div>
        <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-100'>
          <p className='text-sm text-gray-600'>Sẵn sàng</p>
          <p className='text-2xl font-bold text-emerald-600'>{stats.online}</p>
        </div>
        <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-100'>
          <p className='text-sm text-gray-600'>Đang sử dụng</p>
          <p className='text-2xl font-bold text-blue-600'>{stats.inUse}</p>
        </div>
        <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-100'>
          <p className='text-sm text-gray-600'>Bảo trì</p>
          <p className='text-2xl font-bold text-yellow-600'>{stats.maintenance}</p>
        </div>
        <div className='bg-white rounded-lg shadow-sm p-4 border border-gray-100'>
          <p className='text-sm text-gray-600'>Offline</p>
          <p className='text-2xl font-bold text-gray-600'>{stats.offline}</p>
        </div>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-xl shadow-sm p-4 border border-gray-100 mb-6'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
          <TextField
            fullWidth
            size='small'
            placeholder='Tìm theo mã trụ, tên trạm...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon fontSize='small' />
                </InputAdornment>
              )
            }}
          />

          <FormControl size='small' fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select value={filterStatus} label='Trạng thái' onChange={(e) => setFilterStatus(e.target.value)}>
              <MenuItem value='all'>Tất cả</MenuItem>
              <MenuItem value='online'>Sẵn sàng</MenuItem>
              <MenuItem value='in-use'>Đang sử dụng</MenuItem>
              <MenuItem value='maintenance'>Bảo trì</MenuItem>
              <MenuItem value='offline'>Offline</MenuItem>
            </Select>
          </FormControl>

          <FormControl size='small' fullWidth>
            <InputLabel>Connector</InputLabel>
            <Select
              value={filterConnector}
              label='Connector'
              onChange={(e) => setFilterConnector(e.target.value)}
            >
              <MenuItem value='all'>Tất cả</MenuItem>
              <MenuItem value='CCS2'>CCS2</MenuItem>
              <MenuItem value='Type2'>Type2</MenuItem>
              <MenuItem value='CHAdeMO'>CHAdeMO</MenuItem>
              <MenuItem value='Tesla'>Tesla</MenuItem>
            </Select>
          </FormControl>

          <FormControl size='small' fullWidth>
            <InputLabel>Khu vực</InputLabel>
            <Select value={filterRegion} label='Khu vực' onChange={(e) => setFilterRegion(e.target.value)}>
              <MenuItem value='all'>Tất cả</MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, newMode) => newMode && setViewMode(newMode)}
            size='small'
            fullWidth
          >
            <ToggleButton value='grid'>
              <GridViewIcon fontSize='small' />
            </ToggleButton>
            <ToggleButton value='table'>
              <TableRowsIcon fontSize='small' />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className='mt-3 text-sm text-gray-600'>
          Hiển thị {filteredChargers.length} / {chargers.length} trụ sạc
        </div>
      </div>

      {/* Chargers Display */}
      {viewMode === 'grid' ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredChargers.map((charger) => (
            <ChargerCard
              key={charger.id}
              charger={charger}
              onStartSession={handleStartSession}
              onCreateSession={handleCreateSession}
              onMaintenance={handleMaintenance}
              onReset={handleReset}
              onRemoteStop={handleRemoteStop}
            />
          ))}
        </div>
      ) : (
        <ChargerTable
          chargers={filteredChargers}
          onStartSession={handleStartSession}
          onCreateSession={handleCreateSession}
          onMaintenance={handleMaintenance}
          onReset={handleReset}
          onRemoteStop={handleRemoteStop}
        />
      )}

      {filteredChargers.length === 0 && (
        <div className='text-center py-12'>
          <p className='text-gray-500 text-lg'>Không tìm thấy trụ sạc nào phù hợp</p>
        </div>
      )}

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

export default ChargersPage
