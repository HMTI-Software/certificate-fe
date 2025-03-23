'use client'

import Navbar from '@/components/Navbar'
import React, { useState } from 'react'

const page = () => {
  const [ isUserPremium, setIsUserPremium ] = useState(true)


  return (
    <div className="w-full px-40 2xl:px-80 pb-40">
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="aspect-square w-40 border-2 mt-20 rounded-full border-black">
          <img src="https://dummyimage.com/100x100" alt="Profile Picture" className="w-full object-cover" />
        </div>
        <div className="mt-10 flex gap-4 w-full">
          <div className="bordered flex flex-col px-4 py-3 rounded-md bg-purplee w-full">
            <h1 className="text-4xl font-bold">12</h1>
            <p className='font-bold mt-4'>Events</p>
            <p>event yang anda buat</p>
          </div>
          <div className="bordered flex flex-col px-4 py-3 rounded-md bg-greenn w-full">
            <h1 className="text-4xl font-bold">12</h1>
            <p className='font-bold mt-4'>Events</p>
            <p>event yang anda buat</p>
          </div>
          <div className="bordered justify-between flex flex-col px-4 py-3 rounded-md bg-yelloww w-full">
            <h1 className="text-xl font-bold">
              {isUserPremium ? (
                'Premium'
              ) : (
                'Not Premium'
              )}
            </h1>
            <div>
              <p className='font-bold mt-4'>susbcription</p>
              <p>until 12 Sep 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page