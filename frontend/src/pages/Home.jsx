import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import {BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
  

} from "react-icons/bs"
import { HiSparkles } from 'react-icons/hi'

const Home = () => {
  const {userData} = useSelector((state)=>state.user)
  return (
    <div className='min-h-screen flex flex-col bg-[#f3f3f3]'>
      <Navbar/>

      <div className='flex-1 px-6 py-20'>
        3:27


      </div>
      
    </div>
  )
}


export default Home
