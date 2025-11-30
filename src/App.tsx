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
import DirectChargeControl from './pages/DirectChargeControl/DirectChargeControl'

// Admin Dashboard Pages
import AdminDashboard from './pages/Admin/AdminDashboard'
import VehicleList from './components/VehicleManagement/VehicleList'
import CustomerList from './components/UserManagement/CustomerList'
import StaffList from './components/UserManagement/StaffList'
import ReportsAnalytics from './components/Reports/ReportsAnalytics'
import TransactionList from './components/TransactionManagement/TransactionList'

// Staff Dashboard Pages
import StaffDashboard from './pages/Staff/StaffDashboard'
import ChargersPage from './pages/Staff/ChargersPage'
import ChargerDetail from './pages/Staff/ChargerDetail'
import CreateSessionPage from './pages/Staff/CreateSessionPage'
import SupportPage from './pages/Staff/SupportPage'

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

        {/* Auth Routes */}
        <Route path='/auth' element={<AuthPage />} />

        {/* Charge point Role Routes */}
        <Route path='/charge-control' element={<DirectChargeControl />} />

        {/* Admin Dashboard Routes */}
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/admin/vehicles/list' element={<VehicleList />} />
        <Route path='/admin/users/customers' element={<CustomerList />} />
        <Route path='/admin/users/staff' element={<StaffList />} />
        <Route path='/admin/transactions/rentals' element={<TransactionList />} />
        <Route path='/admin/transactions/payments' element={<TransactionList />} />
        <Route path='/admin/transactions/invoices' element={<TransactionList />} />
        <Route path='/admin/reports' element={<ReportsAnalytics />} />
        <Route path='/admin/reports/revenue' element={<ReportsAnalytics />} />
        <Route path='/admin/reports/vehicle-usage' element={<ReportsAnalytics />} />
        <Route path='/admin/reports/station-usage' element={<ReportsAnalytics />} />
        <Route path='/admin/reports/staff-performance' element={<ReportsAnalytics />} />

        {/* Staff Dashboard Routes */}
        <Route path='/staff' element={<StaffDashboard />} />
        <Route path='/staff/chargers' element={<ChargersPage />} />
        <Route path='/staff/chargers/:id' element={<ChargerDetail />} />
        <Route path='/staff/sessions/create' element={<CreateSessionPage />} />
        <Route path='/staff/support' element={<SupportPage />} />

        {/* 404 Not Found */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
