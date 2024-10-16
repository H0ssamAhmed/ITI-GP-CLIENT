
import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const AccordionLevels = ({
  levels,
  handleFiltrationbyLevel,

}) => {
  console.log(levels);

  return (

    <Accordion defaultExpanded>
      <AccordionSummary
        className='sticky -top-2 z-20'
        expandIcon={<ExpandMoreIcon sx={{ fontSize: 30 }} />}
      >
        <Typography fontSize={24} fontWeight={900}>
          المرحلة الابتدائية
        </Typography>
      </AccordionSummary>
      {levels?.map((level, index) => {

      })}
      <AccordionDetails className='levels' onClick={(e) => handleFiltrationbyLevel(e)}>
        {/* <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-1">الصف الأول الابتدائي</Typography >
        <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-2">الصف الثاني الابتدائي</Typography >
        <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-3">الصف الثالث الابتدائي</Typography >
        <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-4">الصف الرابع الابتدائي</Typography >
        <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-5">الصف الخامس الابتدائي</Typography >
        <Typography padding={1} marginTop={2} fontSize={20} className='p-2 hover:bg-brand-500 hover:text-white bg-brand-100 cursor-pointer rounded-md ps-4' data-level="pri-6">الصف السادس الابتدائي</Typography > */}
      </AccordionDetails>
    </Accordion>
  )
}

export default AccordionLevels