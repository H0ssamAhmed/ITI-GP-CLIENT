import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { Button, Skeleton, Stack } from '@mui/material';
import { FaX } from 'react-icons/fa6';
import { VscSettings } from "react-icons/vsc";
import { useQuery } from '@tanstack/react-query';
import CourseCard from '../components/CourseCard';
import { getAllCourses, getAllLevels } from '../apis/coursesApi';
import { LevelsAndCourses, SmallLevelsAndCourses } from '../components/Levels';

const CourseCatalog = () => {
  const [showFiltreDiv, setShowFiltreDiv] = useState(false);
  const [currentDisplayed, setCurrentDisplayed] = useState([]);
  const [level, setLevel] = useState("");
  const [fetchLevel, setFetchLevels] = useState([]);
  const [subject, setSubject] = useState("");
  const { data, isLoading, error } = useQuery({ queryKey: ['courses'], queryFn: () => getAllCourses('all-courses') })
  const { data: AllLevel, isLoading: isLoadingLevel, error: errorLevels } = useQuery({ queryKey: ['levels'], queryFn: () => getAllLevels() })


  useEffect(() => {
    if (AllLevel) setFetchLevels(AllLevel.data.data);
    if (data) setCurrentDisplayed(data.data.data);
  }, [AllLevel, data]);

  const handleFiltrationbyLevel = (e) => {
    const filterBy = e.target?.innerText;
    const filteredCourses = data?.data?.data?.filter(course => course.levelTitle === filterBy);
    setCurrentDisplayed(filteredCourses);
    setLevel(filteredCourses);

    activateLevel(e.target);
    resetAllSubjects();
  };

  const activateLevel = (targetElement) => {
    const allLevels = document.querySelectorAll(".levels p");
    allLevels.forEach(level => level.classList.remove("bg-brand-500", "text-white"));
    targetElement.classList.add("bg-brand-500", "text-white");
  };

  const handleFiltrationbySubject = (e) => {
    const filterBy = e.target.getAttribute("data-subject");
    if (level) {
      const filteredCourses = level.filter(course => course.subject === filterBy);
      setCurrentDisplayed(filteredCourses);
      activateSubject(e.target);
    }
  };

  const activateSubject = (targetElement) => {
    const allSubjects = document.querySelectorAll(".subjects p");
    allSubjects.forEach(subject => subject.classList.remove("bg-brand-500", "text-white"));
    targetElement.classList.add("bg-brand-500", "text-white");
  };

  const resetAllLevels = () => {
    setCurrentDisplayed(data?.data.data);
    const allLevels = document.querySelectorAll(".levels p");
    allLevels.forEach(level => level.classList.remove("bg-brand-500", "text-white"));
    setLevel('');
  };

  const resetAllSubjects = () => {
    const allSubjects = document.querySelectorAll(".subjects li");
    allSubjects.forEach(subject => subject.classList.remove("bg-brand-500", "text-white"));
    setSubject('');
  };

  const handleRemoveFiltration = () => {
    resetAllLevels();
    resetAllSubjects();
  };

  return (
    <div className='relative bg-brand-600/10 min-h-[80vh]' style={{ backgroundImage: 'url("../../../assets/backgroundcover.png")' }}>

      {!isLoading && error &&
        <Stack direction="column" textAlign="center">
          <h1 className='p-16 w-full text-center text-6xl' >لا يوجد كورسات متاحة</h1>

        </Stack>
      }
      {!error && <div className='container mx-auto pt-4'>
        <div onClick={() => setShowFiltreDiv(!showFiltreDiv)} className='px-4 py-2 start-0 absolute -mt-48 top-[12rem] md:hidden mx-auto transition-all z-10 cursor-pointer'>
          <AnimatePresence>
            {!showFiltreDiv ?
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                <VscSettings fontSize={40} className='sticky -top-4 hover:border-2 rounded-md hover:border-slate-500' />
              </motion.div>
              :
              <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                <FaX fontSize={30} className='sticky -top-4 hover:border-2 rounded-md hover:border-slate-500' />
              </motion.div>
            }
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {showFiltreDiv && (
            <SmallLevelsAndCourses
              subject={subject}
              fetchLevel={fetchLevel}
              resetAllLevels={resetAllLevels}
              handleRemoveFiltration={handleRemoveFiltration}
              handleFiltrationbyLevel={handleFiltrationbyLevel}
              handleFiltrationbySubject={handleFiltrationbySubject}
            />
          )}
        </AnimatePresence>
        <div className='relative grid grid-cols-12 gap-8 min-h-[80vh] mt-20 md:mt-0'>
          {isLoading ? (
            <motion.div initial={{ x: 2000, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className='max-h-[600px] hidden ms-8 sticky top-40 overflow-y-scroll md:block col-span-4 lg:col-span-3 mx-auto bg-white'>
              <Skeleton variant="rounded" height={600} animation="wave" />
            </motion.div>
          ) : (
            <motion.div initial={{ x: 2000, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }} className='max-h-[600px] w-full hidden ms-8 sticky top-40 overflow-y-scroll md:block col-span-4 lg:col-span-3 mx-auto bg-white'>
              <LevelsAndCourses
                level={level}
                fetchLevel={fetchLevel}
                resetAllLevels={resetAllLevels}
                handleRemoveFiltration={handleRemoveFiltration}
                handleFiltrationbyLevel={handleFiltrationbyLevel}
                handleFiltrationbySubject={handleFiltrationbySubject}
              />
            </motion.div>
          )}
          <section className='col-span-12 md:col-span-8 lg:col-span-9'>
            <div className='flex items-center flex-wrap justify-center gap-y-56 mt-20'>
              {currentDisplayed?.length == 0 && !isLoading && !error &&
                <Stack direction="column" textAlign="center">
                  <h1 className='p-16 w-full text-center text-6xl' >لا يوجد كورسات متاح لهذا الصف في الوقت الحالي</h1>
                  <Button onClick={handleRemoveFiltration} variant='outlined' sx={{ fontSize: '2rem', margin: "0 auto", }} className='bg-brand-500 w-fit px-4 py-2 rounded-md'>اظهار الكل</Button>
                </Stack>
              }
              {isLoading ? (
                <div className='flex items-center justify-center gap-4 flex-wrap '>
                  <Skeleton animation="wave" width={400} height={400} />
                  <Skeleton animation="wave" width={400} height={400} />
                  <Skeleton animation="wave" width={400} height={400} />
                </div>
              ) : (
                currentDisplayed?.map((course, index) => (
                  <motion.div key={index} className='p-4 cursor-pointer' initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
                    <CourseCard course={course} />
                  </motion.div>))
              )}
            </div>
          </section>
        </div>
      </div>}
    </div>
  );
};
export default CourseCatalog;