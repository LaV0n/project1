export const dateFormat = (date: Date) => {
   const day = new Date(date).getDate()
   const month = new Date(date).getMonth() + 1
   const year = new Date(date).getFullYear()
   const twoDigitDay = day < 10 ? `0${day}` : day
   const twoDigitMonth = month < 10 ? `0${month}` : month
   return `${twoDigitDay}.${twoDigitMonth}.${year}`
}
export const formatDate = (dateCard: string) => {
    const date = new Date(dateCard)
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1;
    let dd: any = date.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return `${dd}.${mm}.${yyyy}`
}