import { useState, useRef } from 'react'
import { CameraAlt } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import type { DriverAccount } from '../../interface/driverAccount.interface'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'

const validateSchema = yup.object().shape({
  full_name: yup
    .string()
    .min(3, 'Họ và tên phải có ít nhất 3 ký tự')
    .max(50, 'Họ và tên không được vượt quá 50 ký tự')
    .required('Họ và tên là bắt buộc'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email không hợp lệ'),
  phone_number: yup
    .string()
    .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
    .max(11, 'Số điện thoại không được vượt quá 11 chữ số')
    .required('Số điện thoại là bắt buộc')
})

interface EditProfileModalProps {
  setShowEditProfileModal: (show: boolean) => void
  profile: DriverAccount
  setEditedProfile: (profile: {
    avatar_url?: string
    full_name?: string
    email?: string
    phone_number?: string
  }) => void
  handleSubmitEditProfile: (values: FormValues) => void
}

export interface FormValues {
  avatar_url?: string
  full_name?: string
  email?: string
  phone_number?: string
}

export const EditProfileModal = ({
  setShowEditProfileModal,
  profile,
  setEditedProfile,
  handleSubmitEditProfile
}: EditProfileModalProps) => {
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const initialValues: FormValues = {
    avatar_url: profile.avatar_url,
    full_name: profile.full_name,
    email: profile.email,
    phone_number: profile.phone_number
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string)
        setEditedProfile({ ...profile, avatar_url: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const onSubmit = (values: FormValues) => {
    setEditedProfile({ ...profile, ...values })
    handleSubmitEditProfile(values)
    console.log('onSubmit values', values)
  }

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h3 className='text-lg font-semibold text-gray-900'>Chỉnh sửa thông tin</h3>
          <button
            onClick={() => setShowEditProfileModal(false)}
            className='text-gray-400 hover:text-gray-600 transition-colors'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Form */}
        <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
          {({ errors, touched }) => (
            <Form className='p-6 space-y-4'>
              {/* Avatar */}
              <div className='flex flex-col items-center pb-2'>
                <div className='relative group cursor-pointer' onClick={handleAvatarClick}>
                  <Avatar
                    src={previewAvatar || profile.avatar_url}
                    alt={profile.full_name}
                    sx={{ width: 90, height: 90 }}
                    className='border-2 border-gray-200'
                  />
                  <div className='absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                    <CameraAlt className='text-white' sx={{ fontSize: 28 }} />
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleAvatarChange}
                  className='hidden'
                />
                <p className='text-xs text-gray-500 mt-2'>Click để thay đổi ảnh đại diện</p>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor='full_name' className='block text-sm font-medium text-gray-700 mb-1.5'>
                  Họ và tên
                </label>
                <Field
                  id='full_name'
                  name='full_name'
                  type='text'
                  placeholder='Nhập họ và tên'
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-1 transition-all outline-none text-sm ${
                    errors.full_name && touched.full_name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-sky-500 focus:ring-sky-500'
                  }`}
                />
                <ErrorMessage name='full_name' component='div' className='text-red-500 text-xs mt-1' />
              </div>

              {/* Email */}
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1.5'>
                  Email
                </label>
                <Field
                  id='email'
                  name='email'
                  type='email'
                  placeholder='Nhập email'
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-1 transition-all outline-none text-sm ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-sky-500 focus:ring-sky-500'
                  }`}
                />
                <ErrorMessage name='email' component='div' className='text-red-500 text-xs mt-1' />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor='phone_number' className='block text-sm font-medium text-gray-700 mb-1.5'>
                  Số điện thoại
                </label>
                <Field
                  id='phone_number'
                  name='phone_number'
                  type='tel'
                  placeholder='Nhập số điện thoại'
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-1 transition-all outline-none text-sm ${
                    errors.phone_number && touched.phone_number
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-sky-500 focus:ring-sky-500'
                  }`}
                />
                <ErrorMessage name='phone_number' component='div' className='text-red-500 text-xs mt-1' />
              </div>

              {/* Buttons */}
              <div className='flex gap-3 pt-3'>
                <button
                  type='button'
                  onClick={() => setShowEditProfileModal(false)}
                  className='flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm'
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  className='flex-1 px-4 py-2.5 bg-sky-600 text-white font-medium rounded-lg hover:bg-sky-700 transition-colors text-sm'
                >
                  Lưu thay đổi
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
