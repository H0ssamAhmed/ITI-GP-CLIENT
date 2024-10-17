import { Rating } from '@mui/material'
import React from 'react'
import { FaStar } from 'react-icons/fa6'

const RateCourse = ({ review }) => {
  const { id, rate, createdAt, student, comment } = { ...review }


  return (
    <div className='px-20 w-full ml-'>
      <div className='bg-brand-300 p-4 rounded-lg w-full mx-auto'>
        <div className=''>
          <div className='flex gap-2  items-center justify-satart'>
            <h1 className='font-bold text-xl'>{student?.name}</h1>
            <Rating
              className="rotate-180 text-2xl"
              name="simple-controlled"
              value={rate}
              readOnly
            />
          </div>
          <h4>{comment}</h4>
        </div>
        <h4 className='text-end'>{convertToEgyptTime(createdAt)}</h4>
      </div>

    </div>
  )
}

export default RateCourse

function convertToEgyptTime(utcDateString) {
  const date = new Date(utcDateString);
  const options = {
    timeZone: 'Africa/Cairo', // Egypt's time zone
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    hour12: true // 24-hour format
  };

  return date.toLocaleString('en-EG', options);
}

// Example usage:
// const utcDateString = "2024-10-16T18:37:14.000Z";
// const egyptTime = convertToEgyptTime(utcDateString);
// console.log(egyptTime); // Output: "16/10/2024, 20:37:14" (example output)
