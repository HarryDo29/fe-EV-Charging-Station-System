/**
 * CreateSessionPage - Create Charging Session
 * Allows staff to create draft, scheduled, or immediate charging sessions
 */

import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DashboardLayout from '../../components/Dashboard/DashboardLayout'
import Sidebar from '../../components/Dashboard/Sidebar'
import SessionForm from '../../components/staff/SessionForm'
import type { SessionFormData } from '../../components/staff/SessionForm'
import { mockChargers } from '../../mocks/staffMocks'
import {
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'

const staffSidebarItems = [
  { label: 'Dashboard', icon: <span>📊</span>, path: '/staff' },
  { label: 'Quản lý Trụ sạc', icon: <span>⚡</span>, path: '/staff/chargers' },
  { label: 'Phiên sạc', icon: <span>🔋</span>, path: '/staff/sessions' },
  { label: 'Hỗ trợ khách hàng', icon: <span>💬</span>, path: '/staff/support', badge: 3 }
]

const CreateSessionPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const prefilledChargerId = searchParams.get('chargerId') || undefined

  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: 'success' | 'error' | 'info' | 'warning'
  }>({
    open: false,
    message: '',
    severity: 'success'
  })

  const [successDialog, setSuccessDialog] = useState<{
    open: boolean
    sessionId: string
    sessionType: string
  }>({
    open: false,
    sessionId: '',
    sessionType: ''
  })

  const handleSubmit = (data: SessionFormData) => {
    console.log('Creating session:', data)

    // TODO: replace with API call
    // Simulate API call
    setTimeout(() => {
      const mockSessionId = `SES-${Date.now()}`

      if (data.sessionType === 'draft') {
        setSnackbar({
          open: true,
          message: '✅ Đã lưu phiên sạc dạng Draft',
          severity: 'success'
        })
      } else if (data.sessionType === 'scheduled') {
        setSnackbar({
          open: true,
          message: `✅ Đã đặt lịch phiên sạc cho ${data.scheduledAt?.toLocaleString('vi-VN')}`,
          severity: 'success'
        })
      } else {
        setSnackbar({
          open: true,
          message: '⚡ Đã khởi động phiên sạc ngay lập tức',
          severity: 'success'
        })
      }

      setSuccessDialog({
        open: true,
        sessionId: mockSessionId,
        sessionType: data.sessionType
      })
    }, 500)
  }

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc muốn hủy? Dữ liệu đã nhập sẽ bị mất.')) {
      navigate('/staff/chargers')
    }
  }

  const handleDialogClose = () => {
    setSuccessDialog({ ...successDialog, open: false })
    navigate('/staff/sessions')
  }

  const handleCreateAnother = () => {
    setSuccessDialog({ ...successDialog, open: false })
    window.location.reload()
  }

  return (
    <DashboardLayout sidebar={<Sidebar items={staffSidebarItems} userRole='staff' />}>
      <div className='max-w-4xl mx-auto'>
        <Paper elevation={0} className='p-6 border border-gray-200'>
          <SessionForm
            chargers={mockChargers}
            prefilledChargerId={prefilledChargerId}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Paper>
      </div>

      {/* Success Dialog */}
      <Dialog open={successDialog.open} onClose={handleDialogClose} maxWidth='sm' fullWidth>
        <DialogTitle className='text-center'>
          {successDialog.sessionType === 'draft'
            ? '📝 Đã lưu Draft'
            : successDialog.sessionType === 'scheduled'
              ? '📅 Đã đặt lịch'
              : '⚡ Đã khởi động'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='text-center mb-4'>
            {successDialog.sessionType === 'draft'
              ? 'Phiên sạc đã được lưu dạng Draft. Bạn có thể quay lại chỉnh sửa hoặc khởi động sau.'
              : successDialog.sessionType === 'scheduled'
                ? 'Phiên sạc đã được đặt lịch thành công. Hệ thống sẽ tự động khởi động vào thời gian đã chọn.'
                : 'Phiên sạc đã được khởi động. Khách hàng có thể bắt đầu sạc ngay bây giờ.'}
          </DialogContentText>
          <div className='bg-gray-50 p-4 rounded-lg text-center'>
            <p className='text-sm text-gray-600 mb-2'>Mã phiên sạc</p>
            <p className='text-2xl font-mono font-bold text-emerald-600'>{successDialog.sessionId}</p>
          </div>
        </DialogContent>
        <DialogActions className='p-4'>
          <Button onClick={handleCreateAnother} variant='outlined'>
            Tạo phiên khác
          </Button>
          <Button onClick={handleDialogClose} variant='contained' autoFocus>
            Xem danh sách phiên
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

export default CreateSessionPage
