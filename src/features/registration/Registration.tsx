import style from "./Registration.module.scss"
import {registrTC, setIsRegAC} from "./registrationReducer";
import {useAppDispatch, useAppSelector} from "../../app/store";
import { FormTitle } from "../../components/Form/FormTitle/FormTitle";
import { FormFooter } from "../../components/Form/FormFooter/FormFooter";
import { FormEmail } from "../../components/Form/FormEmail/FormEmail";
import { FormPassword } from "../../components/Form/FormPassword/FormPassword";
import { useFormik } from "formik";
import {appPath} from "../../common/path/appPath";
import {Navigate, useNavigate} from 'react-router-dom'
import React, {useEffect} from "react";

export const Registration = () => {

   let navigate = useNavigate()

   const reg = useAppSelector(state => state.registration.isReg)

   useEffect(() => {
      return () => {
         dispatch(setIsRegAC(false))
      }
   })

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false
      },
      onSubmit: values => {

         dispatch(registrTC(values.email, values.password));
         navigate(appPath.LOGIN)
      },
   });


   const dispatch = useAppDispatch()

   if (reg) {
      return <Navigate to={appPath.LOGIN}/>
   }
   return (
      <div className={style.login_form}>
         <FormTitle title='Sign up' />
         <form className={style.form} onSubmit={formik.handleSubmit}>
            <FormEmail isError={false}
               errorText={'qwe'}
               fieldProps={formik.getFieldProps('email')}
            />
            <FormPassword isError={false}
               errorText={''}
               fieldProps={formik.getFieldProps('password')}
            />
            <FormFooter buttonTitle='Sigh up'
               linkTitle='Sign in'
               pathTo='/login'
               onClick={formik.handleSubmit}
            >Already have an account
            </FormFooter>
         </form>
      </div>
   )
}