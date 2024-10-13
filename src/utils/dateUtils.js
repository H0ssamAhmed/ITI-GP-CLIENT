import {
  format,
  differenceInDays,
  addDays,
  subHours,
  isBefore,
  isToday,
  formatDistanceToNow,
} from "date-fns";

// Format date helper
// Function to format the date

// Function to format the date
export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  if (isNaN(date)) {
    console.error("Invalid date encountered:", isoDate);
    return "Invalid Date";
  }
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
// Calculate remaining days helper
export const daysLeft = (date) => differenceInDays(date, new Date());

// Add days helper
export const addDaysToDate = (date, days) => addDays(date, days);

// Subtract hours helper
export const subtractHoursFromDate = (date, hours) => subHours(date, hours);

// Check if date is before today
export const isDateBeforeToday = (date) => isBefore(date, new Date());

// Check if date is today
export const isDateToday = (date) => isToday(date);

// Format time ago
export const timeAgo = (date) => formatDistanceToNow(date, { addSuffix: true });
