import './App.css'
import Homepage from './pages/Homepage/Homepage'
import Layout from './components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Booking from './pages/Booking/Booking'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <div className='w-full min-h-screen'>
      <Routes>
        {/* có sử dụng layout chung cho các page */}
        <Route path='/' element={<Layout isAuthenticated={isAuthenticated} />}>
          <Route index element={<Homepage />} />
        </Route>
        {/* không sử dụng layout chung cho các page */}
        <Route path='/booking' element={<Booking />} />
      </Routes>
    </div>
  )
}

export default App
