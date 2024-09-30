// Example data for testing in Arabic
const courses = [
  {
    id: 1,
    name: "مقدمة في React",

    studentsBought: 30,
    image: "https://example.com/course-image1.jpg",
  },
  {
    id: 2,
    name: "متقدم في Node.js",

    studentsBought: 45,
    image: "https://example.com/course-image2.jpg",
  },
  // Add more courses as needed
];

const CoursesOverview = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md ">
      <h2 className="mb-4 text-2xl font-bold">نظرة عامة على الدروس</h2>
      <div className="space-y-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <img
                src={course.image}
                alt={course.name}
                className="object-cover w-16 h-16 rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{course.name}</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-green-600">
                {course.studentsBought} طالب
              </p>
              <p className="text-sm text-gray-400">الملتحقون بهذه الدورة</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesOverview;
