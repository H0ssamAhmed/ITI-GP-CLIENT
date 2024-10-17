import React, { useEffect, useRef } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { FaX } from 'react-icons/fa6';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from "framer-motion";
import { getAllLevels } from '../apis/coursesApi';

export const LevelsAndCourses = ({ level, resetAllLevels, handleRemoveFiltration, handleFiltrationbyLevel, fetchLevel }) => {
  return (
    <aside>
      <div className='flex items-center justify-between sticky bg-white -top-4 z-10'>
        <h1 className='text-4xl my-8 font-bold ms-4 cursor-pointer' onClick={resetAllLevels}>
          الصفوف الدراسية
        </h1>

        {level && (
          <button onClick={handleRemoveFiltration} className='hover:bg-brand-900 bg-brand-400 transition-all text-white rounded-md p-2 mx-4'>
            <FaX />
          </button>
        )}
      </div>
      {fetchLevel.map((level, index) => {
        return <Accordion defaultExpanded={index == 0} key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}>
            <Typography fontSize={24} fontWeight={900}>
              {level?.title}
            </Typography>
          </AccordionSummary>
          {level?.subLevels?.map((level) => (
            <AccordionDetails key={level?.id} className='levels' onClick={(e) => handleFiltrationbyLevel(e, level?.id)}>
              <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level={level?.title}>
                {level?.title?.replace(/^\d+-\s*/, '')}
              </Typography>
            </AccordionDetails>
          ))}
        </Accordion>
      })}

    </aside>
  );
};

export const SmallLevelsAndCourses = ({ queryFilterId, level, handleRemoveFiltration, resetAllLevels, handleFiltrationbyLevel, fetchLevel, popupRef }) => {

  return (
    <motion.div
      initial={{ x: -1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
      transition={{ duration: 0.5 }}
      ref={popupRef}
      className='absolute inset-x-0 max-h-[500px] mt-16 overflow-y-scroll bg-white z-10 col-span-12 w-[90%] mx-auto md:hidden'>
      <div className='flex items-center justify-between sticky bg-white -top-4 z-10'>
        <h1 className='text-4xl my-8 font-bold ms-4 cursor-pointer' onClick={resetAllLevels}>
          الصفوف الدراسية
        </h1>
        {level && (
          <button onClick={handleRemoveFiltration} className='hover:bg-brand-900 bg-brand-400 transition-all text-white rounded-md p-2 mx-4'>
            {queryFilterId && <FaX fontSize={30} className='sticky -top-4 hover:border-2 rounded-md hover:border-slate-500' />}

          </button>
        )}
      </div>
      {fetchLevel.map((level, index) => {
        return <Accordion defaultExpanded={index == 0} key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}>
            <Typography fontSize={24} fontWeight={900}>
              {level?.title}
            </Typography>
          </AccordionSummary>
          {level?.subLevels?.map((level) => (
            <AccordionDetails key={level?.id} className='levels' onClick={(e) => handleFiltrationbyLevel(e, level?.id)}>
              <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level={level?.title}>
                {level?.title?.replace(/^\d+-\s*/, '')}
              </Typography>
            </AccordionDetails>
          ))}
        </Accordion>
      })}


    </motion.div>
  );
};