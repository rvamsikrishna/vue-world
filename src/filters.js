import format from 'date-fns/format'

export const upperscase = value => {
  if (!value) return ''
  value = value.toString()
  return value.toUpperCase()
}

export const formatDate = (value, tokenStr) => {
  return format(value, tokenStr)
}
