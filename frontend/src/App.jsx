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
     const [data, setData] = useState();
     const [isLoading, setIsLoading] = useState(false);
     const [ error, setError] = useState();

      useEffect(() => {
        const getData = async() => {
          
          try {
            const data = await fetch("https://jsonplaceholder.typicode.com/todos")
             const json = await data.json()
             setData(json)
          } catch (error) {
            setError(error);
          }finally {
            setIsLoading(false);
          }
        }

        getData();
      }, [])
       console.log(data);
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