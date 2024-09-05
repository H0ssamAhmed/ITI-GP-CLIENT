// Formating Currency
export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EGP",
  }).format(value);
}

//  Calculate time left for deadlines, exams, etc.
export function timeDifference(date1, date2) {
  const diffInMs = new Date(date2) - new Date(date1);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return diffInDays;
}

// check if the input is a valid email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//  ensure users set a strong password.
export function isStrongPassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
}

// Save important data such as user preferences, theme settings
export function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Retrieve data from localStorage.
export function getFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

// For limiting long descriptions or titles.
export function truncateString(str, num) {
  return str.length > num ? str.slice(0, num) + "..." : str;
}

// Useful for showing discounted course prices.
export function calculateDiscount(price, discount) {
  return price - (price * discount) / 100;
}

// Smooth Scroll to Top
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
