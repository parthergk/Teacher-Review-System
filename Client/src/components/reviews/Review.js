import React from 'react'

const Review = (reviews) => {
  const {collegeName,departmentName,rating,review,teacherName} = reviews.data
    return (
    <div className=' border border-gray-300 w-full flex flex-col px-1 sm:px-3 sm:py-1 rounded-sm'>
        <h1 className=' text-gray-800 font-bold text-2xl sm:text-3xl'>{teacherName}</h1>
        <span className=' text-primary text-[1rem] sm:text-xl font-bold sm:my-1'>{collegeName}, {departmentName}</span>
        <span className=' text-gray-800 font-medium sm:text-xl'>Review : <p className=' inline font-normal'>{review}</p> </span>
        <span className=' text-gray-800 font-medium sm:text-xl sm:my-1'>Rating : <p className=' inline font-normal'>{rating}</p> </span>
    </div>
  )
}
export default Review