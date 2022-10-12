import coverDefault from '../../assets/image/coverDefault.jpg'
type FormikErrorsType = { email?: string, password?: string, confirmPassword?: string }
export const validator = (values: FormikErrorsType) => {
   const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
   const errors: FormikErrorsType = {}
   if (!values.email) {
      errors.email = 'Required'
   } else if (!emailRegEx.test(values.email)) {
      errors.email = 'Invalid email address'
   }
   if (!values.password) {
      errors.password = 'Required'
   } else if (values.password.length < 8) {
      errors.password = 'Password cannot be less than 8 characters'
   } else if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
         errors.password = 'Passwords do not match'
      }
   } else {
      delete errors.password
   }
   if (values.confirmPassword === '') {
      errors.confirmPassword = 'Required'
   } else if (values.confirmPassword) {
      if (values.confirmPassword.length < 8) {
         errors.confirmPassword = 'Password cannot be less than 8 characters'
      } else if (values.confirmPassword && values.password) {
         if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
         }
      }
   }
   return errors
}
export const validateImage = (cover: string | null) => {
   const regexBase64 = /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
   if (cover) {
      return regexBase64.test(cover) ? cover :
         coverDefault
   } else {
      return coverDefault
   }
}