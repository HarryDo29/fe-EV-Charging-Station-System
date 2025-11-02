import './App.css'
import Homepage from './pages/Homepage/Homepage'
import Layout from './components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'
// import Map from './pages/Map/Map'
import Booking from './pages/Booking/Booking'
import Payment from './pages/Payment/Payment'
import Profile from './pages/Profile/Profile'
import AuthPage from './pages/Auth/AuthPage'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import NotFound from './pages/NotFound/Notfound'
import { useEffect, useState } from 'react'
import useAuth from './context/AuthContext/useAuth'
import StationPage from './pages/Station/StationPage'
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { state } = useAuth()
  console.log('state', state)

  useEffect(() => {
    if (state.driver_account) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [state.driver_account])
  return (
    <div className='w-full min-h-screen'>
      <Routes>
        {/* có sử dụng layout chung cho các page */}
        <Route path='/' element={<Layout isAuthenticated={isAuthenticated} />}>
          <Route index element={<Homepage />} />
          <Route path='/map' element={<StationPage />} />
          <Route path='/booking/:stationId' element={<Booking />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='*' element={<NotFound />} />
        {/* không sử dụng layout chung cho các page */}
      </Routes>
    </div>
  )
}

export default App
