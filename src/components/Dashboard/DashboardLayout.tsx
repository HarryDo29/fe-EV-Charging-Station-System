import React, { useState } from 'react'

interface DashboardLayoutProps {
  sidebar: React.ReactNode
  children?: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ sidebar, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden' onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {sidebar}
      </aside>

      {/* Main Content */}
      <div className='lg:ml-64'>
        {/* Mobile Header */}
        <div className='lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30'>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='p-2 rounded-lg hover:bg-gray-100'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
          <div className='flex items-center space-x-2'>
            <img src='/EV-logo-black.svg' alt='EV Logo' className='h-8' />
          </div>
        </div>

        {/* Content Area */}
        <main className='p-4 lg:p-8'>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
