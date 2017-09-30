export const isNumber = (value, expectLen) => {
  const reg = /^\d+$/
  let flag = false
  const isLength = !expectLen || (expectLen && (value && (value.length === expectLen)))
  if (value === '' || (!isNaN(value) && reg.test(value) && isLength)) {
    flag = true
  }
  return flag
}

export const isBetween = (value, min, max) => value >= min && value <= max
