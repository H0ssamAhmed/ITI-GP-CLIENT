import testImg from "../../../assets/HomePageImages/teacher.png";
import { motion } from 'framer-motion'
import { FaClock, FaPlay } from 'react-icons/fa6';

const CourseDetail = () => {
  return (
    <div className=''>
      <div className='mx-auto'>
        <section>
          <div className='bg-brand-100 py-8'>
            {/* style={{ backgroundImage: 'url("../../../assets/backgroundcover.png")' }} */}
            <div className='container mx-auto grid grid-cols-12'>
              <div className="col-span-12  md:col-span-4 w-80 rounded-md mx-auto sm:m-0 bg-rose-5800">
                <motion.img
                  className='object-cover md:ms-8 lg:ms-8'
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  src={testImg} alt='Teacher image'
                />
              </div>

              <div className='m-5 col-span-12 md:col-span-8'>
                <motion.h1
                  transition={{ duration: 0.16 }}
                  initial={{ x: 500 }}
                  animate={{ x: 0 }}
                  className='my-4 text-4xl font-semibold'>الصف الاول الثانوي</motion.h1>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="my-8 flex items-center justify-start gap-4">
                  <h2 className='font-bold'>الكيمياء</h2>
                  <p className='px-8 py-2 bg-brand-500 text-white hover:bg-brand-700 cursor-pointer w-fit rounded-[14px] border'>اشترك الان</p>

                </motion.div>
                <div className='flex items-center justify-start flex-wrap gap-8'>
                  <motion.p transition={{ duration: 0.16 * 2, delay: 0.493 * 2 }} initial={{ y: - 500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>سلمي محمود</motion.p>
                  <motion.p transition={{ duration: 0.16 * 2, delay: 0.653 * 2 }} initial={{ y: - 500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>30 درس</motion.p>
                  {/* <motion.p transition={{ duration: 0.16 * 2, delay: 0.653 * 2 }} initial={{ y: - 500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>الكيمياء</motion.p>
                  <motion.p transition={{ duration: 0.16 * 2, delay: 0.813 * 2 }} initial={{ y: - 500 }} animate={{ y: 0 }} className='px-8 py-2 border-yellow-800 rounded-[14px] border'>الصف الاول الثانوي</motion.p> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <motion.section>
          {Array.from({ length: 50 }).map((_, index) => {
            return (<motion.div key={index + 1}
              // initial={{ x: index % 2 == 0 ? -2000 : 2000, opacity: 0 }} // come from left and right
              // initial={{ y: index % 2 == 0 ? -2000 : 2000, opacity: 0 }} // Come from top and bottom
              // initial={{ y: 2000, opacity: 0 }} // come from bottom
              initial={{ xOrY: -2000, opacity: 0 }} // 😂😂واحد بتجري ورا التانية
              animate={{ x: 0, y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
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