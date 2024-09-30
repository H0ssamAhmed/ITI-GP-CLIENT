import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// Temp Data
const events = [
  {
    id: 1,
    title: "مقدمة في JavaScript",
    time: "10:00 صباحًا",
    description:
      "درس تمهيدي يغطي أساسيات JavaScript، بما في ذلك المتغيرات وأنواع البيانات والدوال.",
  },
  {
    id: 2,
    title: "أساسيات React",
    time: "01:00 ظهرًا",
    description:
      "دورة حول أساسيات React، بما في ذلك هيكل المكونات وإدارة الحالة واستخدام الخطافات.",
  },
  {
    id: 3,
    title: "ورشة تصميم قواعد البيانات",
    time: "03:30 مساءً",
    description:
      "ورشة عمل عملية تركز على تصميم قواعد البيانات لتطبيقات الويب القابلة للتوسع باستخدام SQL.",
  },
];

const EventCalender = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="w-full p-4 bg-white rounded-md">
      <Calendar
        locale="ar"
        calendarType="islamic"
        onChange={onChange}
        value={value}
      />
      <div className="flex items-center justify-between mt-8 mb-8">
        <h1 className="font-bold">أخر الأحداث</h1>
        <img
          src="/src/assets/dashboard/moreDark.png"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
      {events.map((event) => (
        <div
          key={event.id}
          className="p-5 bg-white rounded-lg odd:border-t-2 odd:border-yellow-300 even:border-t-2 even:border-brand-600"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-600">{event.title}</h2>
            <span className="text-[1.3rem] text-gray-400">{event.time}</span>
          </div>

          <p className="font-light">{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EventCalender;
