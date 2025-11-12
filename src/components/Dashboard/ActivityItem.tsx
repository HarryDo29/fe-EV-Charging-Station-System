import React from 'react'

interface ActivityItemProps {
  icon: React.ReactNode
  title: string
  description: string
  time: string
  iconBgColor?: string
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  title,
  description,
  time,
  iconBgColor = 'bg-emerald-100'
}) => {
  return (
    <div className='flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors'>
      <div className={`${iconBgColor} p-2 rounded-lg flex-shrink-0`}>{icon}</div>
      <div className='flex-1 min-w-0'>
        <p className='text-sm font-medium text-gray-900'>{title}</p>
        <p className='text-sm text-gray-500 truncate'>{description}</p>
      </div>
      <span className='text-xs text-gray-400 flex-shrink-0'>{time}</span>
    </div>
  )
}

export default ActivityItem
