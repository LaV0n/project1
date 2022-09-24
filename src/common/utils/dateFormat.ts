export const dateFormat = (date: Date) => {
   const day = new Date(date).getDate()
   const month = new Date(date).getMonth() + 1
   const year = new Date(date).getFullYear()
   const twoDigitDay = day < 10 ? `0${day}` : day
   const twoDigitMonth = month < 10 ? `0${month}` : month
   return `${twoDigitDay}.${twoDigitMonth}.${year}`
}