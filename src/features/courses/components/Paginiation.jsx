import React from 'react';
import { Button } from '@mui/material';

const CustomPagination = ({ questionsPerPage, totalQuestions, onPaginationChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalQuestions / questionsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    const startIndex = (pageNumber - 1) * questionsPerPage;
    const endIndex = startIndex + questionsPerPage;
    onPaginationChange([startIndex, endIndex]);
  };

  return (
    <div className="flex justify-center my-4">
      {pageNumbers.map(number => (
        <Button
          key={number}
          onClick={() => handlePageClick(number)}
          variant="outlined"
          sx={{ margin: '0 5px' }}
        >
          {number}
        </Button>
      ))}
    </div>
  );
};

export default CustomPagination;

// import React, { useState } from 'react';
// import { Button, Stack } from '@mui/material';

// const CustomPagination = ({ questionsPerPage, questions, setCurrentQuestionsRange, currentQuestionsRange }) => {
//   const [page, setPage] = useState(1);
//   const totalPages = Math.ceil(questions.length / questionsPerPage);

//   // Handle Next Button Click
//   const handleNext = () => {
//     if (page < totalPages) {
//       setCurrentQuestionsRange([currentQuestionsRange[0] + 10, currentQuestionsRange[1] + 10])
//       setPage(page + 1);
//     }
//   };

//   // Handle Previous Button Click
//   const handlePrevious = () => {
//     if (page > 1) {
//       setCurrentQuestionsRange([currentQuestionsRange[0] - 10, currentQuestionsRange[1] - 10])
//       setPage(page - 1);
//     }
//   };

//   return (
//     <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ py: 4, mx: 5 }}>
//       <Button
//         size={"large"}
//         variant="contained"
//         onClick={handlePrevious}
//         disabled={page === 1} // Disable Previous button on the first page
//       >
//         السابق
//       </Button>

//       <Button
//         variant="contained"
//         size={"large"}

//         onClick={handleNext}
//         disabled={page === totalPages} // Disable Next button on the last page
//       >
//         التالي
//       </Button>
//     </Stack>
//   );
// };

// export default CustomPagination;
