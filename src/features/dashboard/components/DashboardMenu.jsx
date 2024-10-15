import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../auth/slices/authSlice";
import { toast } from "react-toastify";
import {
  clearUserRole,
  logout as logoutAction,
} from "../../auth/slices/authSlice.js"; // Adjust the import path as necessary

const menuItems = [
  {
    title: "القائمة",
    items: [
      {
        icon: "/src/assets/dashboard/home.png",
        label: "الرئيسية",
        href: "userHome",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/src/assets/dashboard/request.png",
        label: "طلبات المنصة",
        href: "list/requests",
        visible: ["admin"],
      },
      {
        icon: "/src/assets/dashboard/teacher.png",
        label: "المعلمين",
        href: "list/teachers",
        visible: ["admin"],
      },

      {
        icon: "/src/assets/dashboard/student.png",
        label: "التلاميذ",
        href: "list/students",
        visible: ["admin"],
      },

      {
        icon: "/src/assets/dashboard/subject.png",
        label: "الكورسات",
        href: "list/subjects",
        visible: ["admin"],
      },

      {
        icon: "/src/assets/dashboard/subject.png",
        label: "الكورسات الخاصة",
        href: "list/teacherSubjects",
        visible: ["teacher"],
      },
      {
        icon: "/src/assets/dashboard/subject.png",
        label: "الدروس",
        href: "list/teacherLessons",
        visible: ["teacher"],
      },
      {
        icon: "/src/assets/dashboard/student.png",
        label: "التلاميذ المشتركين",
        href: "list/enrolledStudent",
        visible: ["teacher"],
      },

      {
        icon: "/src/assets/dashboard/class.png",
        label: "الصفوف الدراسية",
        href: "list/classes",
        visible: ["admin"],
      },
      {
        icon: "/src/assets/dashboard/lesson.png",
        label: "إنشاء كورس",
        href: "list/lessons",
        visible: ["teacher"],
      },
      {
        icon: "/src/assets/dashboard/exam.png",
        label: "إنشاء أختبار",
        href: "list/exams",
        visible: ["teacher"],
      },

      {
        icon: "/src/assets/dashboard/result.png",
        label: "نتائج الإختبارات",
        href: "list/results",
        visible: ["admin", "teacher", "student", "parent"],
      },

      {
        icon: "/src/assets/dashboard/message.png",
        label: "الرسائل",
        href: "list/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/src/assets/dashboard/announcement.png",
        label: "الإعلانات",
        href: "list/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
  {
    title: "أُخْرَىٰ",
    items: [
      {
        icon: "/src/assets/dashboard/profile.png",
        label: "الصفحة الشخصية",
        href: "/ProfileDetails",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/src/assets/dashboard/setting.png",
        label: "المنصة",
        href: "/",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/src/assets/dashboard/logout.png",
        label: "الخروج",
        href: "logout",
        visible: ["admin", "teacher", "student", "parent"],
        isLogout: true,
      },
    ],
  },
];

const DashboardMenu = () => {
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      dispatch(logoutAction());
      dispatch(clearUserRole());

      toast.success("تم تسجيل الخروج بنجاح");

      navigate("/login");
    } catch (error) {
      toast.error(error.message || "An error occurred during logout.");
    }
  };

  return (
    <div>
      {menuItems.map((item) => (
        <div className="flex flex-col gap-2" key={item.title}>
          <span className="hidden my-4 font-light text-brand-800 lg:flex">
            {item.title}
          </span>
          {item.items.map((i) => {
            if (i.visible.includes(role)) {
              return i.isLogout ? (
                <button
                  key={i.label}
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-4 py-3 text-gray-700 rounded-md md:px-2 hover:bg-brand-100 lg:justify-start"
                >
                  <img src={i.icon} alt="menu-icon" className="w-10 h-10" />
                  <span className="hidden lg:block">{i.label}</span>
                </button>
              ) : (
                <Link
                  to={i.href}
                  key={i.label}
                  className="flex items-center justify-center gap-4 py-3 text-gray-700 rounded-md md:px-2 hover:bg-brand-100 lg:justify-start"
                >
                  <img src={i.icon} alt="menu-icon" className="w-10 h-10" />
                  <span className="hidden lg:block">{i.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default DashboardMenu;
