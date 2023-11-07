export const getOS = () => {
  const userAgent = window.navigator.userAgent;
  let OSName = "unknown";
  switch (true) {
    case /Windows NT 10.0/.test(userAgent):
      OSName = "Windows 10";
      break;
    case /Windows NT 6.3/.test(userAgent):
      OSName = "Windows 8.1";
      break;
    case /Windows NT 6.2/.test(userAgent):
      OSName = "Windows 8";
      break;
    case /Windows NT 6.1/.test(userAgent):
      OSName = "Windows 7";
      break;
    case /Windows NT 6.0/.test(userAgent):
      OSName = "Windows Vista";
      break;
    case /Windows NT 5.1/.test(userAgent):
      OSName = "Windows XP";
      break;
    case /Windows NT 5.0/.test(userAgent):
      OSName = "Windows 2000";
      break;
    case /Mac|iOS/.test(userAgent):
      OSName = "Mac";
      break;
    case /X11/.test(userAgent):
      OSName = "UNIX";
      break;
    case /Linux/.test(userAgent):
      OSName = "Linux";
      break;
    default:
      OSName = "unknown";
  }
  return OSName;
};

export const isValidDate = (str) => {
  if (!str) return false;
  // Regular expression to match "YYYYMMDD" dates
  const datePattern = /(\D|^)(\d{8})(\D|$)/g;

  // Extract the potential date part from the string (YYYYMMDD)
  const dateMatch = datePattern.exec(str);

  if (!dateMatch || !dateMatch[2]) {
    return false; // No valid date found in the string
  }

  const fileDate = dateMatch[2];

  // Check if the potential date is a valid date
  const year = parseInt(fileDate.substring(0, 4), 10);
  const month = parseInt(fileDate.substring(4, 6), 10);
  const day = parseInt(fileDate.substring(6, 8), 10);

  // Use Date constructor to validate the date
  const date = new Date(year, month, day);

  // Check if the Date object represents a valid date
  const valid = (date) =>
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day;
  if (!valid(date)) return false;
  return [date.getFullYear(), date.getMonth(), date.getDate()];
};

export const months = {
  1: "JAN",
  2: "FEB",
  3: "MAR",
  4: "APR",
  5: "MAY",
  6: "JUN",
  7: "JUL",
  8: "AUG",
  9: "SEP",
  10: "OCT",
  11: "NOV",
  12: "DEC",
};
