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
