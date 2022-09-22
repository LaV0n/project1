import style from "./Registration.module.scss"
import { registrTC, setIsRegAC } from "./registrationReducer";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { FormTitle } from "../../components/Form/FormTitle/FormTitle";
import { FormFooter } from "../../components/Form/FormFooter/FormFooter";
import { FormEmail } from "../../components/Form/FormEmail/FormEmail";
import { FormPassword } from "../../components/Form/FormPassword/FormPassword";
import { useFormik } from "formik";
import { appPath } from "../../common/path/appPath";
import { Navigate } from 'react-router-dom'
import React, { useEffect } from "react";
import { validator } from "../../common/utils/validator";

export const Registration = () => {

   const dispatch = useAppDispatch()
   const reg = useAppSelector(state => state.registration.isReg)
   useEffect(() => {
      return () => {
         dispatch(setIsRegAC(false))
      }
   }, [dispatch])

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false
      },
      validate: values => {
         return validator(values)
      },
      onSubmit: values => {
         dispatch(registrTC(values.email, values.password));
      },
   });
   const onEmailFocusHandler = () => {
      formik.setTouched({ email: false, password: formik.touched.password && !!formik.errors.password })
   }
   const onPasswordFocusHandler = () => {
      formik.setTouched({ password: false, email: formik.touched.email && !!formik.errors.email })
   }
   if (reg) {
      return <Navigate to={appPath.LOGIN} />
   }
   return (
      <div className={style.registration}>
         <div className={style.login_form}>
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
               <FormFooter
                  className={style.form__footer}
                  onClick={formik.submitForm}
                  buttonTitle="Sign Up"
                  linkTitle="Sign In"
                  pathTo={appPath.REGISTRATION}

               >
                  Already have an account
               </FormFooter>
            </form>
         </div>
      </div>
   )
}