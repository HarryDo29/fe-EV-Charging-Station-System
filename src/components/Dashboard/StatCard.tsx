import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  bgColor?: string
  iconColor?: string
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  bgColor = 'bg-white',
  iconColor = 'text-emerald-500'
}) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow`}>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-600 mb-1'>{title}</p>
          <p className='text-2xl font-bold text-gray-900'>{value}</p>
          {trend && (
            <div className='flex items-center mt-2'>
              <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className='text-xs text-gray-500 ml-1'>so với hôm qua</span>
            </div>
          )}
        </div>
        <div className={`${iconColor} bg-opacity-10 p-3 rounded-lg`}>{icon}</div>
      </div>
    </div>
  )
}

export default StatCard
