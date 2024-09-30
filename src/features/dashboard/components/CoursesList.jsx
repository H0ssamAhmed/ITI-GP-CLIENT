// Temp Data For Courses
const courses = [
  {
    id: 1,
    courseName: "الرياضيات التمهيدية",
    lessonName: "الجبر الأساسي",
    level: "تمهيدي",
    progress: "40%",
    instructor: "أحمد علي",
    duration: "8 ساعات",
    image: "https://example.com/images/math.jpg", // Example image URL for the course
  },
  {
    id: 2,
    courseName: "اللغة العربية",
    lessonName: "تحليل النصوص",
    level: "إعدادي",
    progress: "65%",
    instructor: "فاطمة حسن",
    duration: "6 ساعات",
    image: "https://example.com/images/arabic.jpg", // Example image URL for the course
  },
  {
    id: 3,
    courseName: "الفيزياء المتقدمة",
    lessonName: "الحركة والقوى",
    level: "ثانوي",
    progress: "50%",
    instructor: "محمد عيسى",
    duration: "10 ساعات",
    image: "https://example.com/images/physics.jpg", // Example image URL for the course
  },
  {
    id: 4,
    courseName: "التاريخ الإسلامي",
    lessonName: "الخلفاء الراشدين",
    level: "ثانوي",
    progress: "30%",
    instructor: "علي سالم",
    duration: "5 ساعات",
    image: "https://example.com/images/history.jpg", // Example image URL for the course
  },
  {
    id: 5,
    courseName: "الكيمياء الأساسية",
    lessonName: "المركبات الكيميائية",
    level: "إعدادي",
    progress: "80%",
    instructor: "سارة عبد الله",
    duration: "7 ساعات",
    image: "https://example.com/images/chemistry.jpg", // Example image URL for the course
  },
  {
    id: 6,
    courseName: "العلوم العامة",
    lessonName: "البيئة والكائنات الحية",
    level: "تمهيدي",
    progress: "90%",
    instructor: "يوسف عبد الرحمن",
    duration: "4 ساعات",
    image: "https://example.com/images/science.jpg", // Example image URL for the course
  },
];

const CoursesList = () => {
  return (
    <>
      <div className="flex items-center justify-between mt-8 mb-8">
        <h1 className="font-bold text-[2rem]">الدروس</h1>
        <span className="text-[1.3rem] text-gray-500 cursor-pointer">
          شاهد المزيد
        </span>
      </div>
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex gap-8 p-4 mb-4 bg-white cursor-pointer rounded-2xl"
        >
          <div>
            <img
              src="/src/assets/videoalt.svg"
              alt={course.courseName}
              className="w-24 h-24 rounded-lg"
            />
          </div>

          <div className="flex flex-col w-full gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[1.6rem] font-bold">{course.courseName}</p>
              <p className="text-[1.2rem] text-gray-400">{`أ/ ${course.instructor} `}</p>
            </div>
            <span className="text-[1.3rem] text-gray-500">
              {course.lessonName}
            </span>
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
    </>
  );
};

export default CoursesList;
