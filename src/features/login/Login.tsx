import { Checkbox } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../app/store";
import { FormContainer } from "../../components/Form/FormContainer/FormContainer";
import { FormTitle } from "../../components/Form/FormTitle/FormTitle";
import { NavLink, useNavigate } from "react-router-dom";
import { FormFooter } from "../../components/Form/FormFooter/FormFooter";
import style from "./login.module.scss"
import { FormPassword } from "../../components/Form/FormPassword/FormPassword";
import { FormEmail } from "../../components/Form/FormEmail/FormEmail";
import { LoaderFullSize } from "../../components/LoaderFullSize/LoaderFullSize";
import { useAppSelector } from './../../app/store';
import { setLogin, setNotice } from "./loginReducer";
import { CustomizedSnackbars } from "../../components/CustomizedSnackbars/CustomizedSnackbars";
import { appPath } from './../../common/path/appPath';
import { validator } from "../../common/utils/validator";

export const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const loginStatus = useAppSelector(state => state.login.status)
    const notice = useAppSelector(state => state.login.notice)
    const onEmailFocusHandler = () => {
        formik.setTouched({ email: false, password: formik.touched.password && !!formik.errors.password })
    }
    const onPasswordFocusHandler = () => {
        formik.setTouched({ password: false, email: formik.touched.email && !!formik.errors.email })
    }
    const onCloseSnackbar = () => {
        dispatch(setNotice({ notice: '' }))
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
        <div className={style.login}>
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
            <CustomizedSnackbars message={notice} onClose={onCloseSnackbar} isError={loginStatus === 'failed'} isOpen={!!notice} />
        </div>
    )
}