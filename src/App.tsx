import './App.css'
import Homepage from './pages/Homepage/Homepage'
import Layout from './components/Layout/Layout'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <div className='w-full min-h-screen'>
      <Routes>
        <Route path='/' element={<Layout isAuthenticated={isAuthenticated} />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
