import { Link } from "react-router-dom";
import testImg from "../../../assets/HomePageImages/teacher.png";
import { FaStar } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserCourses } from "../apis/coursesApi";
import { useEffect, useState } from "react";

function CourseCard({ course, userCourses }) {
  const [isUserEnroled, setIsUserEnroled] = useState(false)

  useEffect(() => {
    userCourses?.find((theCourse) => theCourse.id === course.id) ? setIsUserEnroled(true) : setIsUserEnroled(false)
  }, [userCourses, course])

  function convertToArabicNumerals(num) {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toString().split('').map(digit => arabicNumerals[digit]).join('');
  }
  const { id, title, averageRating, price, image, teacherId, teacherName, levelTitle, } = { ...course }
  const shortTitle = title?.split(" ").length > 2 ? title?.split(" ")[0] + " " + title?.split(" ")[1] : title
  return (
    <div className="relative rounded-lg mx-auto bg-white shadow-lg text-gray-900 w-[24rem] flex flex-col overflow-hidden">
      {/* Course Image */}
      <div className="w-full h-[140px]">
        <img
          src={image || testImg}
          alt="Course"
          className="object-cover h-full w-full"
        />
      </div>

      {/* Course Details */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div className="mb-2">
          {/* Course Title */}
          <p className="font-bold leading-tight mb-1 text-2xl line-clamp-2">
            {shortTitle}
          </p>
          {/* Instructor Name */}
          <p className=" text-xl  text-gray-500">{teacherName}</p>
        </div>

        {/* Rating and Price */}
        <div className="flex justify-between items-center mb-4">
          {/* Rating */}

          <div className="flex items-center text-yellow-600">
            {course.averageRating.length <= 5 ?
              <>
                <FaStar className="text-[1.2rem]" />
                <span className="ml-1 text-lg font-bold">{averageRating}</span>
              </>
              : null
            }
          </div>
          {/* Price */}
          <p className={`font-bold text-lg ${isUserEnroled && 'opacity-0'}`}>
            {convertToArabicNumerals(price)} جنية
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          {/* View More Button */}
          <Link
            to={`/courses/${id}`}
            className="bg-blue-500 hover:bg-blue-600 transition-all rounded-md text-white px-4 py-2 text-center capitalize text-sm"
          >
            المزيد
          </Link>
          {/* Subscribe or Continue Button */}
          {isUserEnroled ? (
            <Link
              to={`/courses/${course.id}`}
              className="bg-green-500 hover:bg-green-600 transition-all rounded-md text-white px-4 py-2 text-center capitalize text-sm"
            >
              اكمل الدورة
            </Link>
          ) : (
            <Link
              to={`/courses/${id}`}
              className="bg-yellow-500 hover:bg-yellow-600 transition-all rounded-md text-black px-4 py-2 text-center capitalize text-sm"
            >
              اشترك الان
            </Link>
          )}
        </div>
      </div>
    </div>

  );
}

export default CourseCard;
