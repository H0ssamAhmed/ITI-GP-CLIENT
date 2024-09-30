const announcements = [
  {
    id: 1,
    title: "إطلاق الدورة الجديدة",
    date: "2024-09-25",
    description:
      "يسرنا الإعلان عن إطلاق دورة جديدة حول تطوير تطبيقات الويب باستخدام React.",
  },
  {
    id: 2,
    title: "إجازة نهاية الأسبوع",
    date: "2024-09-30",
    description:
      "يرجى العلم بأن المركز سيكون مغلقًا خلال عطلة نهاية الأسبوع، وسيتم استئناف الدروس يوم الأحد.",
  },
  {
    id: 3,
    title: "تحديثات النظام",
    date: "2024-10-05",
    description:
      "سيتم إجراء بعض التحديثات على نظامنا يوم السبت المقبل لتحسين الأداء وتجربة المستخدم.",
  },
];

const Announcement = () => {
  return (
    <div className="w-full p-4 bg-white rounded-md ">
      <div className="flex items-center justify-between mt-8 mb-8">
        <h1 className="font-bold">أهم الإعلانات</h1>
        <span className="text-[1.3rem] text-gray-300 cursor-pointer">
          شاهد المزيد
        </span>
      </div>
      {announcements.map((announcement) => (
        <div
          className="p-4 mt-4 odd:bg-brand-100 even:bg-yellow-100 rounded-xl"
          key={announcement.id}
        >
          <div className="flex items-center justify-between mb-4 ">
            <h2 className="font-semibold">{announcement.title}</h2>
            <span className="text-[1rem] text-gray-400 bg-white rounded-full py-1 px-2 ">
              {announcement.date}
            </span>
          </div>
          <p className="font-light">{announcement.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
