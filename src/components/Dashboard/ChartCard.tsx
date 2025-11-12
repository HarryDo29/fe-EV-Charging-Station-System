import React from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  actions?: React.ReactNode
}

const ChartCard: React.FC<ChartCardProps> = ({ title, subtitle, children, actions }) => {
  return (
    <div className='bg-white rounded-xl shadow-sm p-6 border border-gray-100'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900'>{title}</h3>
          {subtitle && <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </div>
      <div>{children}</div>
    </div>
  )
}

export default ChartCard
