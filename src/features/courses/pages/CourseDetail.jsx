import React from 'react'
import testImg from "../../../assets/HomePageImages/teacher.png";
import { motion } from 'framer-motion'
import { FaClock, FaPause, FaPlay } from 'react-icons/fa6';

const CourseDetail = () => {
  return (
    <div className='mt-36 py-5 '>
      <div className='mx-auto'>
        <motion.section>
          <div className='bg-brand-100 py-8'>
            {/* style={{ backgroundImage: 'url("../../../assets/backgroundcover.png")' }} */}
            <div className='container mx-auto grid grid-cols-12'>
              <motion.img
                className='col-span-12 md:col-span-4 w-80 object-cover rounded-md mx-auto sm:m-0'
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 * 2 }}
                src={testImg} alt='Teacher image'
              />

              <div className='m-5 col-span-12 md:col-span-8'>
                <motion.h1 transition={{ duration: 0.16 }} initial={{ y: - 500 }} animate={{ y: 0 }}
                  className='my-4 font-semibold'>الصف الاول الثانوي</motion.h1>

                <motion.h2 transition={{ duration: 0.166666, delay: 0.333 }} initial={{ y: - 500 }} animate={{ y: 0 }}
                  className='font-bold my-4'>الكيمياء</motion.h2>

                <div className='flex items-center justify-start flex-wrap gap-8'>
                  <motion.p transition={{ duration: 0.16 * 2, delay: 0.493 * 2 }} initial={{ y: - 500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>سلمي محمود</motion.p>
                  <motion.p transition={{ duration: 0.16 * 2, delay: 0.653 * 2 }} initial={{ y: - 500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>الكيمياء</motion.p>
                  <motion.p transition={{ duration: 0.16 * 2, delay: 0.813 * 2 }} initial={{ y: - 500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>الصف الاول الثانوي</motion.p>
                  <motion.p transition={{ duration: 0.16 * 2, delay: 1 * 2 }} initial={{ y: - 500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>30 درس</motion.p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section>
          {Array.from({ length: 50 }).map((_, index) => {
            const xOrY = `${index % 2 == 0 ? "x" : "y"} `
            return (<motion.div key={index + 1}
              // initial={{ x: index % 2 == 0 ? -2000 : 2000, opacity: 0 }} // come from left and right
              // initial={{ y: index % 2 == 0 ? -2000 : 2000, opacity: 0 }} // Come from top and bottom
              // initial={{ y: 2000, opacity: 0 }} // come from bottom
              initial={{ xOrY: -2000, opacity: 0 }} // 😂😂واحد بتجري ورا التانية
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ transition: 0, delay: 0.1 * (index + 1) }}
              className='container mx-auto'>
              <div className='grid grid-cols-12 gap-8 border-gray-300 border my-4 p-4 rounded-lg'>
                <div className=' col-span-6 flex items-center justify-start gap-8 '>
                  <p className='bg-brand-500 w-10 h-10 rounded-full text-white'><FaPlay className='w-full h-full p-2 ' /></p>
                  <p> الدرس - {index + 1}</p>
                </div>
                <div className='col-span-6 flex items-center justify-start gap-8'>
                  <FaClock />
                  <p>ساعتين</p>
                </div>
              </div>
            </motion.div>

            )
          })}
        </motion.section>
      </div>
    </div >
  )
}

export default CourseDetail