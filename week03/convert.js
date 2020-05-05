
export function convertStringToNumber(str, radix) {
  if (arguments.length < 2) radix = 10
  let chars = str.split('')
  let number = 0

  let i = 0
  while (i < chars.length && chars[i] != '.') {
    number = number * radix
    number += chars[i].codePointAt(0) - '0'.codePointAt(0) 
    i++
  }

  if (chars[i] === '.') {
    i++
  }
  let fraction = 1
  while (i < chars.length) {
    fraction = fraction / radix
    number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction
    i++
  }

  return number
}


/**
 * @author kelseyyau
 * @param {Number} num 数字
 * @param {Number} radix 进制，默认十进制 
 */
export function convertNumberToString(num, radix) {

  if (num === 0) return '0'

  if (arguments.length < 2) radix = 10

  let string = ''
  let integer = Math.abs(Math.floor(num))
  let fraction = Math.abs(num) - integer
  while(integer > 0) {
    string = String(integer % radix) + string
    integer = Math.floor(integer / radix)
  }

  
  if (num < 0) string = '-' + string
  return string
}