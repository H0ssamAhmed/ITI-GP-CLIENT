import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import { useState } from "react";
import { Link, useParams } from "react-router-dom";


const AccrdionModule = ({ unit, lessons, exam, index }) => {
  const { courseId, lessonId } = useParams()
  return (
    <Accordion defaultExpanded={index == 1}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography fontSize={24} fontWeight={900}>{unit?.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {unit?.Lessons.map((lesson, index) =>
          <Link to={`/courses/${courseId}/${lesson?.id}`} key={index}
          >
            <Typography
              // onClick={() => console.log(lesson.id)}
              padding={1}
              marginTop={2}
              fontSize={20}
              className={`hover:bg-brand-600 hover:text-white transition-all rounded-lg cursor-pointer ${lesson.id == lessonId && "bg-brand-600 text-white"}`}
            >
              <PlayLessonIcon sx={{ marginLeft: "10px", fontSize: "24px" }} />
              {lesson?.title}
            </Typography>
          </Link>
        )}
      </AccordionDetails>
      {
        exam &&
        <Link href={`/courses/${courseId}/${"lesson?.id"}/flksdflksdal`}>
          <Typography
            padding={1}
            marginTop={2}
            marginBottom={2}
            fontSize={20}
            className="hover:bg-brand-600 hover:text-white transition-all rounded-lg cursor-pointer"
          >اختبار الوحدة</Typography>
        </Link>

      }
    </Accordion >
  )
}

export default AccrdionModule