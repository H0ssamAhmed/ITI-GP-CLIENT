import { useEffect, useState } from 'react'
import Navigation from '../../../ui/Navigation'
import TeacherCard from '../../../ui/TeacherCard'
import { AnimatePresence, motion } from "framer-motion";
import subjects from './subjects.json'
import { FaX } from 'react-icons/fa6';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { VscSettings } from "react-icons/vsc";
import { Fax } from '@mui/icons-material';

const CourseCatalog = () => {
  const [showFiltreDiv, setShowFiltreDiv] = useState(false)
  const [currentDisplayed, setCurrentDisplayed] = useState(subjects)
  const [level, setlevel] = useState("")
  const [subject, setSubject] = useState("")

  const handleFiltrationbyLevel = (e) => {
    if (e.target.localName == "p") {
      const filterBy = e.target.getAttribute("data-level")
      if (subject) {
        const filtration = subject.filter((teacher) => teacher.level == filterBy)
        setCurrentDisplayed(filtration)
      }
      if (!subject) {
        const filtration = subjects.filter((teacher) => teacher.level == filterBy)
        setCurrentDisplayed(filtration)
        setlevel(filtration)
      }
      activeLevel(e.target)
      resetAllSubjects()
    }
  }
  const activeLevel = (targetLi) => {
    let allLis = document.querySelectorAll(".levels p")
    allLis.forEach((li) => li.classList.remove("bg-brand-500", "text-white"))
    targetLi.classList.add("bg-brand-500", "text-white")
  }
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
    let allLis = document.querySelectorAll(".subjects p")
    allLis.forEach((li) => li.classList.remove("bg-brand-500", "text-white"))
    targetLi.classList.add("bg-brand-500", "text-white")
  }

  const resetAllLevers = () => {
    setCurrentDisplayed(subjects)
    let allLeveles = document.querySelectorAll(".levels p")
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
    <main className='bg-brand-600/10' style={{ backgroundImage: 'url("../../../assets/backgroundcover.png")' }}>
      <div className='container mx-auto py-80 bg-white'>
        <div
          onClick={() => setShowFiltreDiv(!showFiltreDiv)}
          className='px-4 py-2 start-0  sticky -mt-48 top-[7rem] md:hidden bg-white mx-auto transition-all z-10 b-white w-full cursor-pointer'>
          <AnimatePresence>
            {!showFiltreDiv &&
              <motion.div
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VscSettings fontSize={40} className='sticky -top-4 hover:border-2 rounded-md hover:border-slate-500' />
              </motion.div>
            }
          </AnimatePresence>
          <AnimatePresence>
            {showFiltreDiv &&
              <motion.div
                initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaX fontSize={30} className='sticky -top-4 hover:border-2 rounded-md hover:border-slate-500' />
              </motion.div>
            }
          </AnimatePresence>



        </div>
        <AnimatePresence>
          {showFiltreDiv &&
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='px-4 py-2 start-0  sticky -mt-48 top-[7rem] md:hidden bg-white/50 transition-all mx-auto  z-10 b-white w-full cursor-pointer'
            >

              <SmallLevelsAndCourses
                subject={subject}
                level={level}
                resetAllLevers={resetAllLevers}
                handleRemoveFilration={handleRemoveFilration}
                handleFiltrationbyLevel={handleFiltrationbyLevel}
                handleFiltrationbySubject={handleFiltrationbySubject}
              />
            </motion.div>
          }
        </AnimatePresence>

        <div className='relative grid grid-cols-12 mt-20 md:mt-0'>
          <motion.div
            initial={{ x: 2000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className='h-[800px] hidden sticky top-36 overflow-y-scroll md:block col-span-4 lg:col-span-3 mx-auto py-4 border-2 border-brand-400 w-full'>
            <LevelsAndCourses
              subject={subject}
              level={level}
              resetAllLevers={resetAllLevers}
              handleRemoveFilration={handleRemoveFilration}
              handleFiltrationbyLevel={handleFiltrationbyLevel}
              handleFiltrationbySubject={handleFiltrationbySubject}
            />
          </motion.div>

          <section className='col-span-12 md:col-span-8 lg:col-span-9'>
            <div className='flex items-center flex-wrap justify-center gap-y-56'>
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
                  </motion.div>
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default CourseCatalog


const LevelsAndCourses = ({
  subject,
  level,
  resetAllLevers,
  handleRemoveFilration,
  handleFiltrationbyLevel,
  handleFiltrationbySubject

}) => {
  return (
    <aside>
      <div className='flex  items-center  justify-between sticky bg-white -top-4 z-10'>
        <h1 className='text-4xl my-8 font-bold ms-4 cursor-pointer' onClick={resetAllLevers}>جميع الصفوف الدراسية</h1>
        {subject || level && <button
          onClick={handleRemoveFilration}
          className='hover:bg-brand-900 bg-brand-400 transition-all text-white rounded-md p-2 mx-4'>
          <FaX />
        </button>
        }
      </div>

      <Accordion defaultExpanded>
        <AccordionSummary
          className='sticky -top-2 z-20'
          expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}
        >
          <Typography fontSize={24} fontWeight={900}>
            المرحلة الابتدائية
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='levels' onClick={(e) => handleFiltrationbyLevel(e)}>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-1">الصف الأول الابتدائي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-2">الصف الثاني الابتدائي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-3">الصف الثالث الابتدائي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-4">الصف الرابع الابتدائي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-5">الصف الخامس الابتدائي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-6">الصف السادس الابتدائي</Typography >
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}>
          <Typography fontSize={24} fontWeight={900}>
            المرحلة الاعدادية
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='levels' onClick={(e) => handleFiltrationbyLevel(e)}>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-1">الصف الأول الإعدادي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-2">الصف الثاني الإعدادي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-3">الصف الثالث الإعدادي</Typography >
        </AccordionDetails>
      </Accordion>

      <Accordion >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}>
          <Typography fontSize={24} fontWeight={900}>
            المرحلة الثانوية
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='levels' onClick={(e) => handleFiltrationbyLevel(e)}>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-4">الصف الأول الثانوي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-5">الصف الثاني الثانوي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-6">الصف الثالث الثانوي</Typography >
        </AccordionDetails>
      </Accordion>
      <hr className='h-2 bg-brand-400 p-1 my-8' />
      <h1 className='text-4xl my-8 font-bold ms-4 cursor-pointer' onClick={resetAllLevers} >المواد الدراسية</h1>
      <ul className='subjects flex flex-col gap-2 text-4xl h-96 md:h-full overflow-y-scroll' onClick={(e) => handleFiltrationbySubject(e)}>
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
  )
}
const SmallLevelsAndCourses = ({
  subject,
  level,
  resetAllLevers,
  handleRemoveFilration,
  handleFiltrationbyLevel,
  handleFiltrationbySubject

}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }
  return (
    <aside className='mt-28 w-full mx-auto bg-white justify-between -top-4 z-10  overflow-y-scroll max-h-screen absolute'>
      <div className='mt-4 flex items-center justify-between mx-8 '>
        <h1 className='text-4xl my-8 font-bold ms-4 cursor-pointer' onClick={resetAllLevers}>جميع الصفوف الدراسية</h1>
        {subject || level && <button
          onClick={handleRemoveFilration}
          className='hover:bg-brand-900 bg-brand-400 transition-all text-white rounded-md p-2 mx-4'>
          <FaX onClick={resetAllLevers} />
        </button>
        }
      </div>

      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}
          className=' z-20'
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography fontSize={24} fontWeight={900}>
            المرحلة الابتدائية
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='levels' onClick={(e) => handleFiltrationbyLevel(e)}>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-1">الصف الأول الابتدائي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-2">الصف الثاني الابتدائي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-3">الصف الثالث الابتدائي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-4">الصف الرابع الابتدائي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-5">الصف الخامس الابتدائي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-6">الصف السادس الابتدائي</Typography >
        </AccordionDetails>
      </Accordion>


      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
        aria-controls="panel2bh-content"
        id="panel2bh-header">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}>
          <Typography fontSize={24} fontWeight={900}>
            المرحلة الاعدادية
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='levels' onClick={(e) => handleFiltrationbyLevel(e)}>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-1">الصف الأول الإعدادي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-2">الصف الثاني الإعدادي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-3">الصف الثالث الإعدادي</Typography >
        </AccordionDetails>
      </Accordion>


      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}
        aria-controls="panel3bh-content"
        id="panel3bh-header"
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}>
          <Typography fontSize={24} fontWeight={900}>
            المرحلة الثانوية
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='levels' onClick={(e) => handleFiltrationbyLevel(e)}>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-4">الصف الأول الثانوي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-5">الصف الثاني الثانوي</Typography >
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-6">الصف الثالث الثانوي</Typography >
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}
        aria-controls="panel4bh-content"
        id="panel4bh-header"
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}>
          <Typography fontSize={24} fontWeight={900}>
            المواد الدراسية
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='subjects' onClick={(e) => handleFiltrationbySubject(e)}>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="AR">اللغة العربية</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="MA">الرياضيات</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="SC">العلوم</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="SS">الدراسات الاجتماعية</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="EN">اللغة الإنجليزية</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="RE">التربية الدينية</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="AR">التربية الفنية</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="PE">التربية الرياضية</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="FR">اللغة الفرنسية</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="IT"> تكنولوجيا المعلومات</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="PH">الفيزياء</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="CH">الكيمياء</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="BI">الأحياء</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="HI">التاريخ</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="GE">الجغرافيا</Typography>
          <Typography padding={1} marginTop={2} fontSize={20} className='p-2 cursor-pointer rounded-md ps-4' data-subject="HE">الاقتصاد المنزلي</Typography>
        </AccordionDetails>
      </Accordion>

    </aside>
  )
}