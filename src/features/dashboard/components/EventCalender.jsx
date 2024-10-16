import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
    </div>
  );
};

export default EventCalender;
