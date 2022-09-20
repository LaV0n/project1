import { FormContainer } from "../FormContainer/FormContainer"
import { FormTitle } from "../FormTitle/FormTitle"
import { FormEmail } from './../FormEmail/FormEmail';
import { FormPassword } from './../FormPassword/FormPassword';
import { NavLink } from 'react-router-dom';
import { FormFooter } from './../FormFooter/FormFooter';
import { useAppDispatch } from "../../../app/store";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from './../../../app/store';
import { useFormik } from 'formik';
import { validator } from './../../../common/utils/validator';
import { setLogin } from './../../../features/login/loginReducer';
import { appPath } from './../../../common/path/appPath';
import { LoaderFullSize } from './../../LoaderFullSize/LoaderFullSize';
import { Checkbox } from '@mui/material';
import style from './loginForm.module.scss'
export const LoginForm = () => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const loginStatus = useAppSelector(state => state.login.status)
   const onEmailFocusHandler = () => {
      formik.setTouched({ email: false, password: formik.touched.password && !!formik.errors.password })
   }
   const onPasswordFocusHandler = () => {
      formik.setTouched({ password: false, email: formik.touched.email && !!formik.errors.email })
   }
   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         rememberMe: false
      },
      validate: values => {
         return validator(values)
      },
      onSubmit: async values => {
         const action = await dispatch(setLogin(values))
         if (setLogin.fulfilled.match(action)) {
            navigate(appPath.PROFILE)
         }
      }
   })
   return (
      <div className={style.login_form}>
         <FormContainer>
            <FormTitle title={'Sign in'} />
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
               <label className={style.form__remember} htmlFor="rememberMe">
                  <Checkbox id="rememberMe" {...formik.getFieldProps('rememberMe')} />
                  Remember me
               </label>
               <NavLink to={appPath.RESTOREPASSWORD} className={style.form__forgot}>
                  Forgot Password?
               </NavLink>
               <FormFooter
                  className={style.form__footer}
                  onClick={formik.submitForm}
                  buttonTitle="Sign In"
                  linkTitle="Sign Up"
                  pathTo={appPath.REGISTRATION}
                  disabled={loginStatus === 'pending'}
               >
                  Don't have an account yet?
               </FormFooter>
            </form>
            {loginStatus === 'pending' && <LoaderFullSize />}
         </FormContainer>
      </div>
   )
}