import React, {  useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUp'
import OnboardingPage from './pages/OnboardingPage'
import NotificationPage from './pages/NotificationPage'
import CallPage from './pages/CallPage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstaence } from './Lib/axios'

const App = () => {

  const {data, isLoading,error} = useQuery({ queryKey: ["todos"],

     queryFn: async()=>  {
         const res = await axiosInstaence.get('http://localhost:5001/api/auth/me');
         return res.data;
     },
     retry : false,
   });  
  
   console.log(data);

   return (
   

      <div className="h-screen" data-theme="dark">
      
      <Routes>
        <Route path="/home" element={<HomePage />} />
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