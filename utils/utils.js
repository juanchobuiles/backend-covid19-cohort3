const moment = require('moment');
/**
 * Function that convert date in format right
 * @param {string} date
 * @param {string} format
 * @returns {string} date
 */
function formaterDate(date, format) {
  return moment(date).format(format);
}

module.exports = { formaterDate };
