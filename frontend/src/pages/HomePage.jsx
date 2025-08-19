import React from 'react'

const HomePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-primary mb-4">Home Page</h1>
      <p className="text-base-content">This should show night theme colors</p>
      <button className="btn btn-primary mt-4">Primary Button</button>
      <button className="btn btn-secondary ml-2 mt-4">Secondary Button</button>
      <div className="card w-96 bg-base-100 shadow-xl mt-4">
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p className="text-base-content">This card should have night theme styling</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage;