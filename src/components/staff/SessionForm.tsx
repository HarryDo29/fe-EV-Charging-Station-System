/**
 * SessionForm Component
 * Form to create charging sessions (draft/scheduled/immediate)
 */

import React, { useState } from 'react'
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Box,
  Typography,
  Chip
} from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { vi } from 'date-fns/locale/vi'
import type { SessionType, Charger } from '../../types/staff'

interface SessionFormProps {
  chargers: Charger[]
  prefilledChargerId?: string
  onSubmit: (data: SessionFormData) => void
  onCancel?: () => void
}

export interface SessionFormData {
  chargerId: string
  driverName: string
  phone: string
  email: string
  vehicle: string
  plate: string
  sessionType: SessionType
  scheduledAt?: Date | null
  estimatedKWh: number
  estimatedDuration: number
  notes: string
}

const SessionForm: React.FC<SessionFormProps> = ({ chargers, prefilledChargerId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<SessionFormData>({
    chargerId: prefilledChargerId || '',
    driverName: '',
    phone: '',
    email: '',
    vehicle: '',
    plate: '',
    sessionType: 'draft',
    scheduledAt: null,
    estimatedKWh: 50,
    estimatedDuration: 60,
    notes: ''
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [chargerWarning, setChargerWarning] = useState('')

  // Validate form
  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.chargerId) newErrors.chargerId = 'Vui lòng chọn trụ sạc'
    if (!formData.driverName.trim()) newErrors.driverName = 'Vui lòng nhập tên khách hàng'
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại'
    if (formData.phone && !/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }
    if (!formData.vehicle.trim()) newErrors.vehicle = 'Vui lòng nhập loại xe'
    if (!formData.plate.trim()) newErrors.plate = 'Vui lòng nhập biển số xe'

    if (formData.sessionType === 'scheduled') {
      if (!formData.scheduledAt) {
        newErrors.scheduledAt = 'Vui lòng chọn thời gian bắt đầu'
      } else if (formData.scheduledAt <= new Date()) {
        newErrors.scheduledAt = 'Thời gian bắt đầu phải trong tương lai'
      }
    }

    if (formData.estimatedKWh <= 0) newErrors.estimatedKWh = 'Năng lượng ước tính phải lớn hơn 0'
    if (formData.estimatedDuration <= 0) newErrors.estimatedDuration = 'Thời gian ước tính phải lớn hơn 0'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle charger change
  const handleChargerChange = (chargerId: string) => {
    const charger = chargers.find((c) => c.id === chargerId)
    if (charger) {
      if (charger.status === 'offline') {
        setChargerWarning('⚠️ Trụ sạc này đang offline. Bạn vẫn có thể tạo phiên sạc dạng Draft.')
      } else if (charger.status === 'maintenance') {
        setChargerWarning('⚠️ Trụ sạc này đang bảo trì. Vui lòng chọn trụ khác hoặc tạo phiên Draft.')
      } else if (charger.status === 'in-use') {
        setChargerWarning('ℹ️ Trụ sạc này đang được sử dụng. Bạn có thể tạo phiên Scheduled cho sau.')
      } else {
        setChargerWarning('')
      }
    }
    setFormData({ ...formData, chargerId })
  }

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const selectedCharger = chargers.find((c) => c.id === formData.chargerId)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* Header */}
        <div className='mb-6'>
          <Typography variant='h5' className='font-bold text-gray-900 mb-2'>
            Tạo phiên sạc mới
          </Typography>
          <Typography variant='body2' className='text-gray-600'>
            Điền thông tin để tạo phiên sạc Draft, Schedule hoặc khởi động ngay (chỉ Admin)
          </Typography>
        </div>

        {/* Charger Selection */}
        <FormControl fullWidth error={!!errors.chargerId}>
          <InputLabel>Trụ sạc</InputLabel>
          <Select
            value={formData.chargerId}
            label='Trụ sạc'
            onChange={(e) => handleChargerChange(e.target.value)}
            disabled={!!prefilledChargerId}
          >
            {chargers.map((charger) => (
              <MenuItem key={charger.id} value={charger.id}>
                {charger.id} - {charger.stationName} ({charger.connectorType} {charger.maxKW}kW) -{' '}
                {charger.status === 'online'
                  ? '✅ Sẵn sàng'
                  : charger.status === 'in-use'
                    ? '🔵 Đang dùng'
                    : charger.status === 'maintenance'
                      ? '🟡 Bảo trì'
                      : '⚫ Offline'}
              </MenuItem>
            ))}
          </Select>
          {errors.chargerId && (
            <Typography variant='caption' color='error'>
              {errors.chargerId}
            </Typography>
          )}
        </FormControl>

        {/* Charger Warning */}
        {chargerWarning && <Alert severity='warning'>{chargerWarning}</Alert>}

        {/* Selected Charger Info */}
        {selectedCharger && (
          <Box className='p-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center justify-between mb-2'>
              <Typography variant='subtitle2' className='font-semibold'>
                {selectedCharger.stationName}
              </Typography>
              <Chip label={selectedCharger.connectorType} size='small' color='primary' variant='outlined' />
            </div>
            <div className='grid grid-cols-2 gap-2 text-sm'>
              <div>
                <span className='text-gray-600'>Công suất:</span>
                <span className='ml-2 font-semibold'>{selectedCharger.maxKW} kW</span>
              </div>
              <div>
                <span className='text-gray-600'>Trạng thái:</span>
                <span className='ml-2 font-semibold'>{selectedCharger.status}</span>
              </div>
            </div>
          </Box>
        )}

        {/* Driver Information */}
        <div className='border-t pt-4 mt-4'>
          <Typography variant='subtitle1' className='font-semibold mb-3'>
            Thông tin khách hàng
          </Typography>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <TextField
              label='Tên khách hàng'
              value={formData.driverName}
              onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
              error={!!errors.driverName}
              helperText={errors.driverName}
              required
              fullWidth
            />
            <TextField
              label='Số điện thoại'
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={!!errors.phone}
              helperText={errors.phone}
              required
              fullWidth
              placeholder='0901234567'
            />
            <TextField
              label='Email'
              type='email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              placeholder='example@email.com'
            />
            <TextField
              label='Loại xe'
              value={formData.vehicle}
              onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
              error={!!errors.vehicle}
              helperText={errors.vehicle}
              required
              fullWidth
              placeholder='VinFast VF8'
            />
            <TextField
              label='Biển số xe'
              value={formData.plate}
              onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
              error={!!errors.plate}
              helperText={errors.plate}
              required
              fullWidth
              placeholder='30A-12345'
            />
          </div>
        </div>

        {/* Session Configuration */}
        <div className='border-t pt-4 mt-4'>
          <Typography variant='subtitle1' className='font-semibold mb-3'>
            Cấu hình phiên sạc
          </Typography>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormControl fullWidth error={!!errors.sessionType}>
              <InputLabel>Loại phiên sạc</InputLabel>
              <Select
                value={formData.sessionType}
                label='Loại phiên sạc'
                onChange={(e) => setFormData({ ...formData, sessionType: e.target.value as SessionType })}
              >
                <MenuItem value='draft'>📝 Draft (Lưu nháp)</MenuItem>
                <MenuItem value='scheduled'>📅 Scheduled (Đặt lịch)</MenuItem>
                {/* TODO: check permission: canStartImmediateSession(user) */}
                <MenuItem value='immediate' disabled>
                  ⚡ Immediate (Admin only)
                </MenuItem>
              </Select>
              {errors.sessionType && (
                <Typography variant='caption' color='error'>
                  {errors.sessionType}
                </Typography>
              )}
            </FormControl>

            {formData.sessionType === 'scheduled' && (
              <DateTimePicker
                label='Thời gian bắt đầu'
                value={formData.scheduledAt}
                onChange={(newValue) => setFormData({ ...formData, scheduledAt: newValue })}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.scheduledAt,
                    helperText: errors.scheduledAt
                  }
                }}
                minDateTime={new Date()}
              />
            )}

            <TextField
              label='Năng lượng ước tính (kWh)'
              type='number'
              value={formData.estimatedKWh}
              onChange={(e) => setFormData({ ...formData, estimatedKWh: Number(e.target.value) })}
              error={!!errors.estimatedKWh}
              helperText={errors.estimatedKWh}
              fullWidth
              inputProps={{ min: 1, step: 1 }}
            />

            <TextField
              label='Thời gian ước tính (phút)'
              type='number'
              value={formData.estimatedDuration}
              onChange={(e) => setFormData({ ...formData, estimatedDuration: Number(e.target.value) })}
              error={!!errors.estimatedDuration}
              helperText={errors.estimatedDuration}
              fullWidth
              inputProps={{ min: 1, step: 1 }}
            />
          </div>

          <TextField
            label='Ghi chú'
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            fullWidth
            multiline
            rows={3}
            placeholder='Ghi chú về phiên sạc...'
            className='mt-4'
          />
        </div>

        {/* Actions */}
        <div className='flex items-center justify-end space-x-3 pt-4 border-t'>
          {onCancel && (
            <Button onClick={onCancel} variant='outlined' color='inherit'>
              Hủy
            </Button>
          )}
          <Button type='submit' variant='contained' color='primary' size='large'>
            {formData.sessionType === 'draft'
              ? '💾 Lưu nháp'
              : formData.sessionType === 'scheduled'
                ? '📅 Đặt lịch'
                : '⚡ Khởi động'}
          </Button>
        </div>
      </form>
    </LocalizationProvider>
  )
}

export default SessionForm
