import React, { useRef, useState } from 'react'
import { motion } from "framer-motion"
import { Button, Rating, TextField } from '@mui/material';

const RatePopUp = ({ handelRating, courseId, studentId,
  // isAddedBefore
}) => {
  const [isAddingRate, setIsAddingRate] = useState(false);
  const inputRef = useRef(null);
  const [value, setValue] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [comment, setComment] = useState("")
  const handleChangeComment = (e) => {
    setComment(e.target.value)
  }
  // console.log(inputRef.current?.value);
  const data = {
    rate: value,
    comment: comment,
    courseId: courseId,
    studentId: studentId,
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment || !value) {
      setShowAlert(true)
    } else {
      handelRating(data)
    }
  }
  return (

    <div
      className='ml-20 mx-auto w-[80%] mt-5'
    >
      <button onClick={() => setIsAddingRate(!isAddingRate)} className="block text-white mb-4 bg-brand-400 hover:bg-brand-800 focus:ring-4 focus:outline-none focus:ring-brand-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
        اضف تقيم
      </button>
      {isAddingRate &&
        <motion.form onSubmit={handleSubmit}
          className='relative rounded-lg'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <div className='flex flex-col gap-8 justify-start p-8 bg-brand-200 z-10'>
            <TextField
              placeholder='اضف تعليقك هنا'
              value={comment}
              onChange={handleChangeComment}
              ref={inputRef}
              className='placeholder:font-bold placeholder:text-8xl placeholder:text-brand-400'
              required
              id="filled-basic"
              fullWidth
              dir='ltr'
              // label="اضف تعليقك هنا"
              variant="filled"
            />

            <Rating
              className="rotate-180 text-2xl"
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            {showAlert && <p>يجب اضافة تعليق ونجمه واحده علي الاقل</p>}

            <button type='submit' className='w-fit ms-auto px-4 py-2 rounded-md bg-brand-800 hover:bg-brand-500 transition-all text-white'>ارسال تعليقك</button>

          </div>
        </motion.form>
      }

    </div>

  )
}

export default RatePopUp