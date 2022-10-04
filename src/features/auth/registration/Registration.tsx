import style from "./Registration.module.scss"
import { registrTC, setIsRegistrationAC, setNotice } from "./registrationReducer";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { FormTitle } from "../../../components/Form/FormTitle/FormTitle";
import { FormFooter } from "../../../components/Form/FormFooter/FormFooter";
import { FormEmail } from "../../../components/Form/FormEmail/FormEmail";
import { FormPassword } from "../../../components/Form/FormPassword/FormPassword";
import { useFormik } from "formik";
import { appPath } from "../../../common/path/appPath";
import { Navigate } from 'react-router-dom'
import { useEffect } from "react";
import { validator } from "../../../common/utils/validator";
import { LoaderFullSize } from "../../../components/LoaderFullSize/LoaderFullSize";
import { CustomizedSnackbars } from "../../../components/CustomizedSnackbars/CustomizedSnackbars";

export const Registration = () => {
   const dispatch = useAppDispatch()
   const { isRegistration } = useAppSelector(state => state.registration)
   const { notice } = useAppSelector(state => state.registration)
   const registrationStatus = useAppSelector(state => state.registration.status)
   useEffect(() => {
      return () => {
         dispatch(setIsRegistrationAC(false))
      }
   }, [dispatch])
   const onEmailFocusHandler = () => {
      formik.setTouched({
         email: false,
         password: formik.touched.password && !!formik.errors.password,
         confirmPassword: formik.touched.confirmPassword && !!formik.errors.confirmPassword
      })
   }
   const onPasswordFocusHandler = () => {
      formik.setTouched({
         password: false,
         email: formik.touched.email && !!formik.errors.email,
         confirmPassword: formik.touched.confirmPassword && !!formik.errors.confirmPassword
      })
   }
   const onConfirmPassFocusHandler = () => {
      formik.setTouched({
         confirmPassword: false,
         password: formik.touched.password && !!formik.errors.password,
         email: formik.touched.email && !!formik.errors.email
      })
   }
   const onCloseSnackbar = () => { dispatch(setNotice('')) }
   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         confirmPassword: ''
      },
      validate: values => {
         return validator(values)
      },
      onSubmit: values => {
         dispatch(registrTC(values.email, values.password));
      },
   });
   if (isRegistration) {
      return <Navigate to={appPath.LOGIN} />
   }
   return (
      <div className={style.registration}>
         <div className={style.registration_form}>
            <FormTitle title='Sign up' />
            <form className={style.form} onSubmit={formik.handleSubmit}>
               <FormEmail
                  isError={formik.touched.email && !!formik.errors.email}
                  errorText={formik.errors.email}
                  onFocus={onEmailFocusHandler}
                  fieldProps={formik.getFieldProps('email')}
                  className={style.form__email}
               />
               <FormPassword
                  isError={formik.touched.password && !!formik.errors.password}
                  errorText={formik.errors.password}
                  onFocus={onPasswordFocusHandler}
                  fieldProps={formik.getFieldProps('password')}
                  className={style.form__password}
               />
               <FormPassword
                  isError={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  errorText={formik.errors.confirmPassword}
                  onFocus={onConfirmPassFocusHandler}
                  fieldProps={formik.getFieldProps('confirmPassword')}
                  className={style.form__password}
                  label={'Confirm password'}
               />
               <FormFooter
                  className={style.form__footer}
                  onClick={formik.submitForm}
                  buttonTitle="Sign Up"
                  linkTitle="Sign In"
                  pathTo={appPath.REGISTRATION}
                  disabled={registrationStatus === 'pending'}
               >
                  Already have an account
               </FormFooter>
            </form>
            {registrationStatus === 'pending' && <LoaderFullSize />}
         </div>
         <CustomizedSnackbars message={notice} onClose={onCloseSnackbar} isError={registrationStatus === 'failed'} isOpen={!!notice} />
      </div>
   )
}