import { useEffect, useState } from 'react'
import Navigation from '../../../ui/Navigation'
import TeacherCard from '../../../ui/TeacherCard'
import { motion } from "framer-motion";
import subjects from './subjects.json'
import { FaX } from 'react-icons/fa6';
const CourseCatalog = () => {

  const [currentDisplayed, setCurrentDisplayed] = useState(subjects)
  const [level, setlevel] = useState("")
  const [subject, setSubject] = useState("")

  const handleFiltrationbyLevel = (e) => {
    const filterBy = e.target.getAttribute("data-level")
    if (subject) {
      const filtration = subject.filter((teacher) => teacher.level == filterBy)
      setCurrentDisplayed(filtration)
    }
    if (!subject) {
      const filtration = subjects.filter((teacher) => teacher.level == filterBy)
      setCurrentDisplayed(filtration)
      setlevel(filtration)
      console.log(filtration);

    }
    activeLevel(e.target)
    resetAllSubjects()

  }
  const activeLevel = (targetLi) => {
    let allLis = document.querySelectorAll(".levels li")
    allLis.forEach((li) => li.classList.remove("bg-brand-500", "text-white"))
    targetLi.classList.add("bg-brand-500", "text-white")
  }
  // ///////////////////////////////////////

  const handleFiltrationbySubject = (e) => {
    const filterBy = e.target.getAttribute("data-subject")
    if (level) {
      const filtration = level.filter((teacher) => teacher.subject == filterBy)
      setCurrentDisplayed(filtration)
      activeSubject(e.target)

    }

  }

  const activeSubject = (targetLi) => {
    console.log(targetLi);

    let allLis = document.querySelectorAll(".subjects li")
    allLis.forEach((li) => li.classList.remove("bg-brand-500", "text-white"))
    targetLi.classList.add("bg-brand-500", "text-white")
  }

  const resetAllLevers = () => {
    setCurrentDisplayed(subjects)
    let allLeveles = document.querySelectorAll(".levels li")
    allLeveles.forEach((li) => li.classList.remove("bg-brand-500", "text-white"))
    setlevel('')
  }
  const resetAllSubjects = () => {
    let allSubjects = document.querySelectorAll(".subjects li")
    allSubjects.forEach((li) => li.classList.remove("bg-brand-500", "text-white"))
    setSubject('')
  }
  const handleRemoveFilration = () => {
    resetAllLevers()
    resetAllSubjects()
  }
  return (
    <main className='bg-brand-600/30' style={{ backgroundImage: 'url("../../../assets/backgroundcover.png")' }}>
      <div className='container mx-auto bg-brand-100'>
        <div className='py-80 relative grid grid-cols-12'>
          <aside className='hidden h-[800px] overflow-x-hidden sticky top-36 overflow-y-scroll md:block col-span-4 lg:col-span-3 mx-auto py-4 border-2 border-brand-400 w-full'>
            <div className='flex  items-center  justify-between'>
              <h1 className='text-4xl my-8 font-bold ms-4 cursor-pointer' onClick={resetAllLevers}>جميع الصفوف الدراسية</h1>
              {subject || level && <button
                onClick={handleRemoveFilration}
                className='hover:bg-brand-900 bg-brand-400 transition-all text-white rounded-md p-2 mx-4'><FaX />
              </button>
              }

            </div>

            <ul
              className='levels flex flex-col h-fit gap-2 text-4xl' onClick={(e) => handleFiltrationbyLevel(e)}>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="pri-1">الصف الأول الابتدائي</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="pri-2">الصف الثاني الابتدائي</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="pri-3">الصف الثالث الابتدائي</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="pri-4">الصف الرابع الابتدائي</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="pri-5">الصف الخامس الابتدائي</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="pri-6">الصف السادس الابتدائي</li>



              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="pre-1">الصف الأول الإعدادي</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="pre-2">الصف الثاني الإعدادي</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="pre-3">الصف الثالث الإعدادي</li>


              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="sec-1">الصف الأول الثانوي</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="sec-2">الصف الثاني الثانوي</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-level="sec-3">الصف الثالث الثانوي</li>
            </ul>

            <hr className='h-2 bg-brand-400 p-1 my-8' />

            <h1 className='text-4xl my-8 font-bold ms-4 cursor-pointer' onClick={resetAllLevers} >المواد الدراسية</h1>

            <ul className='subjects flex flex-col gap-2 text-4xl' onClick={(e) => handleFiltrationbySubject(e)}>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="AR">اللغة العربية</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="MA">الرياضيات</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="SC">العلوم</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="SS">الدراسات الاجتماعية</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="EN">اللغة الإنجليزية</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="RE">التربية الدينية</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="AR">التربية الفنية</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="PE">التربية الرياضية</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="FR">اللغة الفرنسية</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="IT"> تكنولوجيا المعلومات</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="PH">الفيزياء</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="CH">الكيمياء</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="BI">الأحياء</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="HI">التاريخ</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="GE">الجغرافيا</li>
              <li className='p-2 cursor-pointer rounded-md ps-4' data-subject="HE">الاقتصاد المنزلي</li>

            </ul>

          </aside>
          <section className='col-span-12 md:col-span-8 lg:col-span-9'>
            <div className='flex items-center flex-wrap justify-center gap-y-56'>
              {/* {Array.from({ length: 20 }).map((teacher, index) => { */}
              {currentDisplayed?.map((teacher, index) => {
                return (
                  <motion.div
                    className='p-4 cursor-pointer'
                    initial={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1, opacity: 1 }}
                    key={index}
                  >
                    <TeacherCard />
                    <h1 className='bg-brand-400 rounded-xl text-white p-4 text-center capitalize text-4xl'>{teacher.level}</h1>
                    <h1 className='bg-brand-300 rounded-xl text-white p-4 text-center capitalize text-4xl'>{teacher.subject}</h1>
                  </motion.div>
                )
              })}
            </div>
            {/* <AnimatePresence>
              {selectedId && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, transform: "translate(-50%,-50%)" }}
                  animate={{ opacity: 1, scale: 1, }}
                  exit={{ opacity: 0, scale: 0.5, }}
                  className='absolute p-8  w-[96vw] mx-auto h-fit rounded-3xl top-96 left-1/2 bg-brand-200 '>
                  <motion.div
                    className='relative rounded-lg gap-8 grid grid-cols-12 p-20 bg-orange-300'
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    exit={{ opacity: 0, }} >
                    <motion.div
                      className='col-span-12 md:col-span-6 flex items-center justify-center flex-col gap-24'
                      transition={{ opacity: '1' }}
                      layoutId={selectedId}>
                      <h1>More details about teacher</h1>
                      <p>history and feedback</p>
                    </motion.div>
                    <motion.div
                      className='col-span-12 md:col-span-6'

                      transition={{ opacity: '1' }}
                      layoutId={selectedId}>
                      <TeacherCard />
                    </motion.div>

                    <motion.button
                      onClick={() => setSelectedId(null)}
                      className='absolute bg-brand-700 m-5 text-white text-center rounded-full top-0 right-0 w-24 h-24'>
                      <FaXmark className='mx-auto' size={40} />
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence> */}
          </section>


        </div>
      </div>
    </main>
  )
}

export default CourseCatalog