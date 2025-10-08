import dayjs from 'dayjs';

const TIME_CONST = {
  day: 60 * 60 * 24,
  hour: 60 * 60,
  minute: 60
};

export const formatServerDate = value => {
  if (value && /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/.test(value)) {
    return value.replace(' ', 'T');
  }
  return value;
};

export const formatServerDateV2 = value => {
  if (value && /^\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/.test(value)) {
    return value.replace(' ', 'T') + 'Z';
  }
  return value;
};

/**
 * Minus date to date, return number in seconds
 * @param {Date} a
 * @param {Date} b
 *
 * @returns {number}
 */
export const getDiffSeconds = (a, b) => Math.floor((a - b) / 1000);

/**
 * Given a number in seconds, convert it to days, hours, minutes, seconds
 * @param {number} countDown
 *
 * @returns {{
 *      days: number
 *      hours: number
 *      minutes: number
 *      seconds: number
 * }}
 */
export const getPartitials = countDown => {
  const days = Math.floor(countDown / TIME_CONST.day);
  const leftHours = countDown - days * TIME_CONST.day;
  const hours = Math.floor(leftHours / TIME_CONST.hour);
  const leftMinutes = leftHours - hours * TIME_CONST.hour;
  const minutes = Math.floor(leftMinutes / TIME_CONST.minute);
  const seconds = leftMinutes - minutes * TIME_CONST.minute;
  return {
    days,
    hours,
    minutes,
    seconds
  };
};

/**
 * Given a date string or Date instance, convert it to date string (format 04 Jun 2024)
 * @param {string, Date} dateString
 *
 * @returns { string } // format 04 Jun 2024
 */
export const getDateString = dateString => {
  if (!dateString) return dateString;
  if (typeof dateString === 'string') {
    let result = new Date(formatServerDateV2(dateString));
    if (!isNaN(result)) {
      result = result.toGMTString();
      return result.slice(4, 16);
    }
  } else if (typeof dateString === 'object') {
    return dateString.toGMTString().slice(4, 16);
  }
};

/**
 * Given a date string or Date instance, convert it to date string (format 04/18/2024)
 * @param {string, Date} dateString
 *
 * @returns { string } // format 04/18/2024
 */
export const getDateStringV2 = dateString => {
  if (!dateString) return dateString;
  if (typeof dateString === 'string') {
    const result = new Date(formatServerDateV2(dateString));
    if (!isNaN(result)) {
      return result.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
    }
  } else if (typeof dateString === 'object') {
    return dateString.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }
};

export const getFullTimeString = (dateString, options) => {
  const { format = 'DD MMM YYYY, hh:mm:ss A' } = options || {};
  if (!dateString) return dateString;
  if (typeof dateString === 'string') {
    const result = new Date(formatServerDateV2(dateString));
    if (!isNaN(result)) {
      return dayjs(result).format(format);
    }
  }
};
