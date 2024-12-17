import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({authorImg, title, author, date, deleteBlog,mongoId}) => {
  
    const BlogDate = new Date(date);
  
    return (
    <tr className='bg-white border-b'>
        <th scope='row' className='items-center gap-5 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap ' >
                <Image src={authorImg?authorImg:assets.profile_icon} alt='' width={60} height={60} />
                <p>{author?author:"No Author"}</p>
        </th>
        <td className='px-6 py-4'>
            {title?title:"No Title"}
        </td>
        <td className='px-6 py-4'>
            {BlogDate.toDateString()}
        </td>
        <td onClick={()=>deleteBlog(mongoId)} className='px-6 py-4 cursor-pointer'>
            x
        </td>
    </tr>
  )
}

export default BlogTableItem