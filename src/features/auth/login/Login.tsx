import { useAppDispatch } from "../../../app/store";
import style from "./login.module.scss"
import { useAppSelector } from '../../../app/store';
import { CustomizedSnackbars } from "../../../components/CustomizedSnackbars/CustomizedSnackbars";
import { LoginForm } from "./LoginForm/LoginForm";
import { setNotice } from "./loginReducer";
import { Navigate } from 'react-router-dom';
import { appPath } from '../../../common/path/appPath';

export const Login = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const loginStatus = useAppSelector(state => state.login.status)
    const notice = useAppSelector(state => state.login.notice)
    const onCloseSnackbar = () => {
        dispatch(setNotice({ notice: '' }))
    }
    if (isAuth) { return <Navigate to={appPath.PROFILE} /> }
    return (
        <div className={style.login}>
            <LoginForm />
            <CustomizedSnackbars message={notice} onClose={onCloseSnackbar} isError={loginStatus === 'failed'} isOpen={!!notice} />
        </div>
    )
}