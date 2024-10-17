import React from "react";

const ParentCourseList = ({ son }) => {
  return (
    <div className="container mx-auto">
      {son.map((course) => (
        <div
          key={course.id}
          className="flex flex-col items-center justify-start gap-8 pb-4 mb-4 bg-white border-b md:flex-row"
        >
          {/* Course Image */}
          <div className="flex justify-end ">
            <img
              src={course.image}
              alt={course.name}
              className="object-cover w-24 h-24 rounded-lg shadow-md"
            />
          </div>

          {/* Course Information */}
          <div>
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <div className="w-full h-2 rounded-full">{course.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParentCourseList;
