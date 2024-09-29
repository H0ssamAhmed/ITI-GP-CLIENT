
import Button from "../../../ui/Button"
import VideoEmbed from "../../../ui/VideoEmbed"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function LessonDetails() {
  return (
    <main className='my-40'>
      <div className='container mx-auto'>
        <div className=" grid grid-cols-12 gap-4">
          <section className="col-span-12 md:col-span-9 grid-cols-subgrid">
            <VideoEmbed />
            <p className="my-8 ms-4 font-bold">الفلزات الرقمية</p>
            <div className="flex justify-between mx-4">
              <div className="bg-brand-500 w-fit text-[16px] flex items-center gap-4 hover:bg-brand-400 text-white  rounded-xl px-8  p-2">
                <FaArrowRight />
                <Button children="الدرس التالي" />
              </div>
              <div className="bg-brand-500 w-fit text-[16px] flex items-center gap-4 hover:bg-brand-400 text-white  rounded-xl px-8 p-2">
                <Button children="الدرس السابق" />
                <FaArrowLeft />
              </div>
            </div>
          </section>
          <nav className="taegetNav col-span-12 md:col-span-3 bg-brand-100 h-fit max-h-[300px] md:max-h-[550px] overflow-y-scroll py-2 align-middle  my-4 border border-brand-500 rounded-lg">
            <div className="h-full">
              <Accordion defaultExpanded>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography fontSize={24} fontWeight={900}>الوحده الاولي</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.from({ length: 5 }).map((lesson, index) => <Typography
                    padding={1}
                    marginTop={2}
                    fontSize={20}
                    className="hover:bg-brand-600 hover:text-white transition-all rounded-lg cursor-pointer"
                    key={index}
                  >الدرس {index + 1}</Typography>)}


                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography fontSize={24} fontWeight={900}>الوحده الثانية</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.from({ length: 5 }).map((lesson, index) => <Typography
                    padding={1}
                    marginTop={2}
                    className="hover:bg-brand-600 hover:text-white transition-all rounded-lg cursor-pointer"
                    fontSize={20}
                    key={index}
                  >الدرس {index + 1}</Typography>)}

                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography fontSize={24} fontWeight={900}>الوحده الثالثة</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.from({ length: 5 }).map((lesson, index) => <Typography
                    padding={1}
                    marginTop={2}
                    className="hover:bg-brand-600 hover:text-white transition-all rounded-lg cursor-pointer"
                    fontSize={20}
                    key={index}
                  >الدرس {index + 1}</Typography>)}

                </AccordionDetails>
              </Accordion>

            </div>
          </nav>
        </div>
      </div>

    </main>
  )
}

export default LessonDetails