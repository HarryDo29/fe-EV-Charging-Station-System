import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SettingsIcon from '@mui/icons-material/Settings'

interface SidebarItem {
  label: string
  icon: React.ReactNode
  path: string
  badge?: string | number
  children?: SidebarItem[]
}

interface SidebarProps {
  items: SidebarItem[]
  userRole: 'admin' | 'staff'
}

const Sidebar: React.FC<SidebarProps> = ({ items, userRole }) => {
  const location = useLocation()
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  const isActive = (path: string) => location.pathname === path

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.label)
    const active = isActive(item.path)

    return (
      <div key={item.label}>
        {hasChildren ? (
          <button
            onClick={() => toggleExpand(item.label)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
              level === 0 ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-600 hover:bg-gray-50 pl-8'
            } ${active ? 'bg-emerald-50 text-emerald-600' : ''}`}
          >
            <div className='flex items-center space-x-3'>
              <span className={active ? 'text-emerald-600' : 'text-gray-400'}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <div className='flex items-center space-x-2'>
              {item.badge && (
                <span className='bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full'>{item.badge}</span>
              )}
              <ExpandMoreIcon
                sx={{ fontSize: 16 }}
                className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              />
            </div>
          </button>
        ) : (
          <Link
            to={item.path}
            className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
              level === 0 ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-600 hover:bg-gray-50 pl-8'
            } ${active ? 'bg-emerald-50 text-emerald-600 border-r-4 border-emerald-600' : ''}`}
          >
            <div className='flex items-center space-x-3'>
              <span className={active ? 'text-emerald-600' : 'text-gray-400'}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className='bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full'>{item.badge}</span>
            )}
          </Link>
        )}

        {hasChildren && isExpanded && (
          <div className='bg-gray-50'>{item.children!.map((child) => renderSidebarItem(child, level + 1))}</div>
        )}
      </div>
    )
  }

  return (
    <div className='flex flex-col h-full'>
      {/* Logo */}
      <div className='p-6 border-b border-gray-200'>
        <div className='flex items-center space-x-3'>
          <img src='../../public/EV-logo-black.svg' alt='EV Logo' className='h-10' />
          <div>
            <h2 className='text-xl font-bold text-gray-900'>EV Manager</h2>
            <p className='text-xs text-gray-500 uppercase'>{userRole}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 overflow-y-auto py-4'>{items.map((item) => renderSidebarItem(item))}</nav>

      {/* User Info */}
      <div className='p-4 border-t border-gray-200'>
        <div className='flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer'>
          <div className='w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold'>
            A
          </div>
          <div className='flex-1'>
            <p className='text-sm font-medium text-gray-900'>Admin User</p>
            <p className='text-xs text-gray-500'>{userRole}</p>
          </div>
          <SettingsIcon sx={{ fontSize: 20 }} className='text-gray-400' />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
