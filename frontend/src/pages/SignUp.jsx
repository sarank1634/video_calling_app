import React, { useState } from 'react'
import { ShipWheelIcon } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import LogPic from '../assets/i.png'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import axiosInstance from '../Lib/axios'
import { signup } from '../Lib/api'

const SignUpPage = () => {
  const [signupData, setSignData] = useState({
    fullName: "",
    email: "",
    password: "",
  })
   const queryClient = useQueryClient();
const Navigate = useNavigate();
  const {mutate:signupMutation, isPending, error} = useMutation({
    mutationFn:  signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onSettled: () => {
      Navigate("/")
    },
    onError: (error) => {
          console.log(error)
    }

  })
  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  }

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8" data-theme="forest">
      <div className="flex w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-xl overflow-hidden border border-primary/25">
        
        {/* LEFT: FORM */}
        <div className="lg:w-1/2 flex items-center justify-center p-8">
          <form onSubmit={handleSignup} className="w-full max-w-md space-y-6">
            {/* Logo + Brand */}
            <div className="flex items-center gap-2 mb-6">
              <ShipWheelIcon className="size-9 text-primary" />
              <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Streamify
              </span>
            </div>

              {/* ERROR MESSAGE ANY*/}
              {error && (
                <div className='alert error mb-4'>
                  <span> {error.response.data.message} </span>
                </div>
              ) }

            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-primary">Create an Account</h2>
              <p className="text-sm opacity-70">
                Join Streamify and start your language learning adventure!
              </p>
            </div>

            {/* Full Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
                value={signupData.fullName}
                onChange={(e) => setSignData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered w-full"
                value={signupData.email}
                onChange={(e) => setSignData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="********"
                className="input input-bordered w-full"
                value={signupData.password}
                onChange={(e) => setSignData({ ...signupData, password: e.target.value })}
                required
              />
              <p className="text-xs opacity-70 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Terms */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" required />
                <span className="text-xs leading-tight">
                  I agree to the{" "}
                  <span className="text-primary hover:underline">terms of service</span> and{" "}
                  <span className="text-primary hover:underline">privacy policy</span>
                </span>
              </label>
            </div>

            {/* Button */}
            <button className="btn btn-primary w-full" type="submit">
              {isPending ? (
                <>
                <span className="loading loading-spinner loading-xs"></span>
                 Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Already have account */}
            <div className="text-center">
              <p className="text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* RIGHT: ILLUSTRATION */}
        <div className="lg:flex w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md text-center p-8">
            <img src={LogPic} className="w-full h-auto object-contain mx-auto" alt="Signup Illustration" />
            <h2 className="text-xl font-semibold text-primary mt-6">
              Connect with language partners worldwide
            </h2>
            <p className="opacity-70 mt-2">
              Practice conversations, make friends, and improve your language skills together.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUpPage
