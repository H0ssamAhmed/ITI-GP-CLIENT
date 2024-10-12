// import { useQuery } from "@tanstack/react-query";

// import { GrView } from "react-icons/gr";
// import { Link } from "react-router-dom";
// import Spinner from "../../../ui/Spinner";
// import ErrorMessage from "../components/ErrorMessage";
// import FormModal from "../components/FormModal";
// import { fetchTeacherLevel } from "../dashboardAPI";
// import teacherDefault from "../../../assets/dashboard/profileDefualt.jpg";

// const TeacherRow = ({ teacher, role }) => {
//   const {
//     data: teacherLevel,
//     isLoading: isTeacherLevelLoading,
//     error: teacherLevelError,
//   } = useQuery({
//     queryKey: ["teacherLevel", teacher.id],
//     queryFn: () => fetchTeacherLevel(teacher.id),
//   });

//   if (teacherLevelError)
//     return <ErrorMessage message="فشل تحميل مستوى المدرس" />;

//   return (
//     <tr
//       className="text-[1rem] hover:bg-brand-50 cursor-default even:bg-gray-50 border-b border-gray-200"
//       key={teacher.id}
//     >
//       <td className="flex items-center gap-4 p-4">
//         {teacher.picture ? (
//           <img
//             src={teacher.picture}
//             alt="teacherImage"
//             className="object-cover w-10 h-10 rounded-full md:hidden lg:block "
//           />
//         ) : (
//           <img
//             src={teacherDefault}
//             alt="userdefaultprofileimage"
//             className="object-cover w-10 h-10 rounded-full md:hidden lg:block "
//           />
//         )}
//         <div className="flex flex-col">
//           <h3 className="font-semibold">{teacher.firstName}</h3>
//           <p className="text-gray-400">{teacher?.email}</p>
//         </div>
//       </td>
//       <td className="hidden md:table-cell">
//         {teacher.id.slice(0, 8).toUpperCase()}
//       </td>
//       <td className="hidden md:table-cell">{teacher.specialization}</td>
//       <td className="hidden md:table-cell">
//         {isTeacherLevelLoading ? (
//           <Spinner size="small" />
//         ) : (
//           teacherLevel?.title?.join(", ")
//         )}
//       </td>
//       <td className="hidden md:table-cell">{teacher.phoneNumber}</td>
//       <td className="hidden md:table-cell">
//         {teacher.educationalQualification}
//       </td>
//       <td>
//         <div className="flex items-center gap-2">
//           <Link to={`/dashboard/list/teachers/${teacher.id}`}>
//             <button className="flex items-center justify-center transition-shadow duration-300 ease-in-out rounded-full shadow-md w-9 h-9 bg-brand-200 hover:bg-brand-100 hover:shadow-lg">
//               <GrView className="w-5 h-5" />
//             </button>
//           </Link>
//           {role === "admin" && (
//             <FormModal
//               table="المعلم"
//               queryKey="teachers"
//               type="delete"
//               id={teacher.id}
//             />
//           )}
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default TeacherRow;
