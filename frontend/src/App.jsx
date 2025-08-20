import React, {  useEffect, useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUp'
import OnboardingPage from './pages/OnboardingPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from './Lib/axios'

const App = () => {

  const {data:authData, isLoading,error} = useQuery({ queryKey: ["todos"],

     queryFn: async()=>  {
         const res = await axiosInstance.get('http://localhost:5001/api/auth/me');
         return res.data;
     },
     retry : false,
   });  
  
const authUser = authData?.user
   return (
    
      <div className="h-screen" data-theme="dark">

      <Routes>
        <Route path="/" element={authUser ? <Navigate to="/" /> : <Navigate to="/login" />} />
        <Route path="/home" element={authUser ?<HomePage /> : <Navigate to ="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage />: <Navigate to="/" /> } />
        <Route 
            path="/login"
             element={!authUser ?<LoginPage />: <Navigate to="/home" />} />
        <Route path="/onboarding" element={authUser ?<OnboardingPage /> : <Navigate to="/login" />} />
        <Route path="/notification" element={authUser ?<NotificationPage />: <Navigate to="/login" />} />
        <Route path="/call/:id" element={authUser ?<CallPage />: <Navigate to="/login" />} />
      </Routes>
      <Toaster />
      </div>
      
  )
}

export default App; 