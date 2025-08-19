import React from 'react'

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
            <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col ">
            {/* logo */}
            
            </div>
          </div>
    </div>
  )
}

export default SignUpPage;