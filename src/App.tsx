import './App.css'
import Homepage from './pages/Homepage/Homepage'
import Layout from './components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Map from './pages/Map/Map'
import Booking from './pages/Booking/Booking'
import Payment from './pages/Payment/Payment'
import Profile from './pages/Profile/Profile'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  return (
    <div className='w-full min-h-screen'>
      <Routes>
        {/* có sử dụng layout chung cho các page */}
        <Route path='/' element={<Layout isAuthenticated={isAuthenticated} />}>
          <Route index element={<Homepage />} />
          <Route path='/map' element={<Map />} />
          <Route path='/booking/:stationId' element={<Booking />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        {/* không sử dụng layout chung cho các page */}
      </Routes>
    </div>
  )
}

export default App
