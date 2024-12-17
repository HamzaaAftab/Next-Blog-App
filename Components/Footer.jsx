import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-gray-800 py-5 items-center">
      <Image alt="" src={assets.logo_light} width={120}/>
      <p className="text-md text-white">All right reserved. Copyright @blogger</p>
      <div className="flex">
        <Image alt="" src={assets.facebook_icon} width={40} />
        <Image alt="" src={assets.twitter_icon} width={40} />
        <Image alt="" src={assets.googleplus_icon} width={40} />
      </div>
    </div>
  )
}

export default Footer
