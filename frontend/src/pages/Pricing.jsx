import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Pricing() {

  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-16 px-6'>

      <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>

        <button
          className='mt-2 p-3 rounded-full bg-white shadow hover:shadow-md transition'
        >
          <FaArrowLeft className='text-gray-600' />
        </button>

      </div>

    </div>
  )
}

export default Pricing