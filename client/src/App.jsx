
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Auth from './pages/Auth'
import Home from './pages/Home'
import History from './pages/History'
import Pricing from './pages/Pricing'
import Notes from './pages/Notes'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFalied from './pages/PaymentFalied'

export const serverUrl = "http://localhost:8000"

export default function App() {

  const userData = useSelector(
    (state) => state.user?.userData
  )

  console.log(userData)

  return (

    <Routes>

      <Route path='/' element={userData ? <Home /> : <Navigate to="/auth" replace />} />
      <Route path='/auth' element={userData ? <Navigate to="/" replace /> : <Auth />} />
     <Route path='/history' element={userData ? <History /> : <Navigate to="/auth" replace />}/>
      <Route path='/pricing' element={userData ? <Pricing /> : <Navigate to="/auth" replace />}/>
      
      <Route path='/notes' element={userData ? <Notes /> : <Navigate to="/auth" replace />}/>

     <Route path='/payment-success' element={<PaymentSuccess />}/>

     <Route path='/payment-failed' element={<PaymentFalied />}/>

    </Routes>

  )
}