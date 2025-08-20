import { LoaderCircle } from 'lucide-react';
import React from 'react'

const PageLoader = () => {
  return (
    <>
    <div className='border border-primary flex justify-center items-center h-screen'>
        <LoaderCircle size={480} className='loading  text-primary' />
    </div>
    </>
  )
}

export default PageLoader