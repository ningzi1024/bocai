import moment from 'moment'

/**
 * 转换成中国时间并格式化
 * @param date
 * @param format
 * @returns {string}
 */
export function createDate(date,format){
  date  = date || ""
  format = format || 'YYYY/MM/DD HH:mm:ss'
  return moment(date).format(format)
}
