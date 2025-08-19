import React, {  useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUp'
import OnboardingPage from './pages/OnboardingPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import { Toaster } from 'react-hot-toast'

const App = () => {

   return (
   

      <div className="h-screen" data-theme= "night">
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/call/:id" element={<CallPage />} />
      </Routes>
      <Toaster />
      </div>
      
  )
}

export default App;