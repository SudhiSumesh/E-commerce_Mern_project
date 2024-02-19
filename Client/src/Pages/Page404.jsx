import React from 'react'

function Page404() {
  return (

<div className="flex items-center justify-center min-h-screen bg-white py-48">
  <div className="flex flex-col">
    {/* Notes */}
    <span className="text-center font-bold my-10 opacity-30">
      
      <hr className="my-4" />
      <a href="https://egoistdeveloper.github.io/twcss-to-sass-playground/" target="_blank" className="text-blue-600">
      Oopzz...
      </a>
    </span>
    {/* Error Container */}
    <div className="flex flex-col items-center">
      <div className="text-indigo-500 font-bold text-7xl">
        404
      </div>
      <div className="font-bold text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
        This page does not exist
      </div>
      <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
        The page you are looking for could not be found.
      </div>
    </div>
    {/* Continue With */}

  </div>
</div>

  )
}

export default Page404
