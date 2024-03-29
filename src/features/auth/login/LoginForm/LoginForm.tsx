import { FormTitle } from "../../../../components/Form/FormTitle/FormTitle"
import { FormEmail } from '../../../../components/Form/FormEmail/FormEmail';
import { FormPassword } from '../../../../components/Form/FormPassword/FormPassword';
import { NavLink } from 'react-router-dom';
import { FormFooter } from '../../../../components/Form/FormFooter/FormFooter';
import { useAppDispatch } from "../../../../app/store";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../app/store';
import { useFormik } from 'formik';
import { validator } from '../../../../common/utils/validator';
import { setLogin } from '../loginReducer';
import { appPath } from '../../../../common/path/appPath';
import { LoaderFullSize } from '../../../../components/LoaderFullSize/LoaderFullSize';
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

   const testUserLogin=()=>{
      const values={
         email: 'test2@test.ts',
         password: '12345678',
         rememberMe: false
      }
      dispatch(setLogin(values))
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
         <div className={style.test_account_title}>
            or use
            <span className={style.test_account_title__link} onClick={testUserLogin}>test account</span>
         </div>
         {loginStatus === 'pending' && <LoaderFullSize />}
      </div>
   )
}