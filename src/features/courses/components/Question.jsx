import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Question = ({ question, index, handleSelectAns, currentPage, questionsPerPage }) => {
  // const theCorrectAns = answers[correctAnswer]
  const [showAlert, setShowAlert] = useState(false)
  const [selectedAns, setSelectedAns] = useState(true)
  // const handleShowAlert = (e) => {
  //   setShowAlert(true)
  //   handleSelectAns(e.target.value, currentPage * questionsPerPage + index)
  // }

  return (
    <div key={question.id} className="m-2 p-2 mb-6 bg-brand-200 text-black rounded-lg">
      <FormLabel sx={{ fontSize: 30, display: "block", marginBottom: "1rem", color: "black" }}>
        {question.id} - {question.questionTitle}
      </FormLabel>
      <RadioGroup
        value={question.selectedAnswer} // Controlled input to manage selected answer
        onChange={(e) => handleSelectAns(e.target.value, currentPage * questionsPerPage + index)} // Use the correct index
        // row
        name={`q-${question.id}`}
      >
        {question.answers.map((ans, idx) => (
          <FormControlLabel
            key={idx}
            value={ans.title}
            control={<Radio />}

            label={ans.title}
            required
            className="py-2 my-2"
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 24 },
              '& .MuiTypography-root': { fontSize: 28 },
            }}
          />
        ))}
      </RadioGroup>
    </div>
  );
}

export default Question;
