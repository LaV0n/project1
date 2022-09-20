import { useAppDispatch } from "../../app/store";
import style from "./login.module.scss"
import { useAppSelector } from './../../app/store';
import { CustomizedSnackbars } from "../../components/CustomizedSnackbars/CustomizedSnackbars";
import { LoginForm } from "../../components/Form/LoginForm/LoginForm";
import { setNotice } from "./loginReducer";

export const Login = () => {
    const dispatch = useAppDispatch()
    const loginStatus = useAppSelector(state => state.login.status)
    const notice = useAppSelector(state => state.login.notice)
    const onCloseSnackbar = () => {
        dispatch(setNotice({ notice: '' }))
    }
    return (
        <div className={style.login}>
            <LoginForm />
            <CustomizedSnackbars message={notice} onClose={onCloseSnackbar} isError={loginStatus === 'failed'} isOpen={!!notice} />
        </div>
    )
}