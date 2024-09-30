import React from "react";

const CourseList = ({ sons }) => {
  return (
    <div className="container mx-auto">
      {sons.map((son) => (
        <div key={son.id} className="p-4 mb-8 bg-white rounded-lg ">
          <h2 className="mb-4  text-[2rem] font-semibold">
            {" "}
            الدروس الخاصة ب{son.name}
          </h2>
          {son.courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col items-center justify-start gap-8 pb-4 mb-4 border-b md:flex-row"
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
              <div className="">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: course.progress }}
                  ></div>
                </div>
                <span className="text-[1.3rem] text-gray-500">
                  التقدم: {course.progress}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CourseList;
