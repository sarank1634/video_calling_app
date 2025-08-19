import React from 'react'
import { useState } from 'react'
import {ShipWheelIcon} from "lucide-react"
import { Link } from 'react-router'

const SignUpPage = () => {
  const [signupData, setSignData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const handleSignup = (e) => {
    e.preventDefaault();
  }
  return (
    <div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8' data-theme="forest">
       <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100
          rounded-xl shadow-lg overflow-hidden">
            {/* signup left form */}
            <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col-4 ">
            {/* logo */}
              <div className="mb-4 flex items-center justify-start gap-2">
                <ShipWheelIcon className="size-9 text-primary" />
              </div>
             <span className='text-3xl font-bold fnot-mono bg-clip-text text-transparent bg-gradient-to-r from-primary
             to-secondary tracking-wider'> Streamify</span>
            </div>

            <div className="w-full">
              <form onSubmit={handleSignup}>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Create an Account</h2>
                    <p className='text-sm opacity-70'>
                      Join Streamify and start your language learning adventure!
                    </p>
                  </div>

                  <div className="space-y-3">

                    {/*   FULL NAME */}
                    <div className="form-control w-full">
                      <label htmlFor="label">
                        <span className='label-text'>Full Name</span>
                      </label>
                      <input type="text" 
                      placeholder='John Doe'
                      className='input input-border w-full'
                      value={signupData.fullName}
                      onChange={(e) =>  setSignData({ ...signupData, fullName: e.target.value})}
                      required
                      />
                    </div>
                  
                    {/* email */}
                    <div className="form-control w-full">
                      <label htmlFor="label">
                        <span className='label-text'>Email </span>
                      </label>
                      <input type="text" 
                      placeholder='email'
                      className='input input-border w-full'
                      value={signupData.email}
                      onChange={(e) =>  setSignData({ ...signupData, email: e.target.value})}
                      required
                      />
                    </div>
                  
                    {/* PASSWORD */}
                    <div className="form-control w-full">
                      <label htmlFor="label">
                        <span className='label-text'>Password</span>
                      </label>
                      <input type="text" 
                      placeholder=''
                      className='input input-border w-full'
                      value={signupData.password}
                      onChange={(e) =>  setSignData({ ...signupData, password: e.target.value})}
                      required
                      />
                       <p className="text-xs opacity-70 mt-1">
                        Password must be at least 6 character long
                       </p>
                    </div>

                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-2">
                        <input type="checkbox" className='checkbox checkbox-sm' required />
                        <span className='text-xs leading-tight'>
                          I agree to the {""}
                          <span className='text-primary hover:underline'>terms of services</span> and{""}
                          <span className='text-primary hover:underline'>privacy policy</span> 
                        </span>
                      </label>
                      </div>   
                  </div>

                  <button className='btn btn-primary w-full' type='submit'>
                    Create Account
                  </button>
                   
                   <div className="text-center mt-4">
                    <p className="text-sm">
                      Already have an account? {""}
                      <Link to="/login" className="text-primary hover:underline">
                        Sign in
                      </Link>
                    </p>
                   </div>
                </div>
              </form>
            </div>
          </div>
    </div>
  )
}

export default SignUpPage;