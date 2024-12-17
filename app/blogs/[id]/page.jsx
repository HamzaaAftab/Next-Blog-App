'use client';

import { assets, blog_data } from '@/Assets/assets'
import Footer from '@/Components/Footer'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Page = ({params}) => {
  
  const [data, setdata] = useState(null)

  const fetchBlogData = async () =>{
    const response = await axios.get('/api/blog',{
      params:{
        id: params.id
      }
    })

    setdata(response.data)
  }

  useEffect(()=>{
    fetchBlogData();
  }, [])

  return ( data? <>
    <div className="bg-gray-200 py-6 px-5 md:px-12 lg:px-28">
      
      <div className="flex justify-between items-center">
        <Link href={`/`}>
        <Image src={assets.logo} width={180} alt="" className="w-[130px] sm:w-auto" />
        </Link>
        <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-5 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:scale-90 transition-all
         duration-300 ease-in ">Get Started <Image src={assets.arrow} alt=""/></button>
      </div>

      <div className="text-center my-20">
        <h1 className=" text-2xl sm:text-5xl text-[#183639] font-semibold max-w-[700px] mx-auto">{data.title}</h1>
        <Image className="mx-auto mt-8 rounded-lg" src={data.authorImg} alt="" width={80} height={80} />
        <p className="mt-3 pb-3 text-lg max-w-[740px] mx-auto font-medium ">{data.author}</p>
      </div>
      

    </div>

    <div className="mx-5 max-w-[750px] md:mx-auto mt-[-100px] mb-10 ">
        <Image className="border-4 border-gray-600 " src={data.image} width={1000} height={500} alt=""  />
        <div className='blog-content' dangerouslySetInnerHTML={{__html: data.description}}>

        </div>

        <p className='text-black font-semibold my-5 '>Share this Article on Social Media</p>
        <div className='flex  '>
            <Image src={assets.facebook_icon} width={50} alt=""/>
            <Image src={assets.twitter_icon} width={50} alt=""/>
            <Image src={assets.googleplus_icon} width={50} alt=""/>
        </div>
        



    </div>

    <Footer/>

    </>:<></>

  )
}

export default Page
