
import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Header = () => {
  
  const [email, setEmail] = useState("");
  const onSubmitHandler = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("email", email);
      const response = await axios.post('/api/email', formData);
      if(response.data.success){
        toast.success(response.data.msg);
        setEmail("");
      }
      else{
        toast.error(response.data.msg);
      }
  }
  
  
  return (
    <div className=" py-5 px-6 md:px-12 lg:px-24 lg:py-7 bg-[#e3eced] ">
      
      <div className="flex justify-between items-center">

        <Link href={`/`}>
        <Image href={`/`} src={assets.logo} width={180} alt="" className="w-[130px] sm:w-auto" />
        </Link>

       <Link href={`/admin/addProduct`}>
       <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-5 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:scale-90 transition-all
         duration-300 ease-in ">Get Started <Image src={assets.arrow} alt=""/></button>
       </Link>
      </div>

      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-5 sm:mt-7 max-w-[750px] m-auto text-xs font-medium sm:text-lg">Explore insightful articles on technology, lifestyle, and creativity, delivering fresh perspectives and inspiration.</p>
        <form onSubmit={onSubmitHandler} className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-5 sm:mt-7 border border-black shadow-[-7px_7px_0px_#000000]" action="">

            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="email" placeholder="Enter your email" className="pl-4 outline-none w-full " />
            <button type="submit" className="border-1 border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white font-semibold hover:bg-black hover:text-white">Subscribe</button>

        </form>
      </div>


    </div>
  )
}

export default Header
