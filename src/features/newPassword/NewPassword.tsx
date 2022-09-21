import React, {ChangeEvent, useState} from "react";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {StatusType} from "../../common/types";
import {Button, CircularProgress, TextField} from "@mui/material";
import {newPasswordTC, setNoticeErrorAC} from "./newPasswordReducer";
import {Navigate, useParams} from "react-router-dom";
import styles from "./NewPassword.module.scss"
import {appPath} from "../../common/path/appPath";
import {CustomizedSnackbars} from "../../components/CustomizedSnackbars/CustomizedSnackbars";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


export const NewPassword = () => {
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, StatusType>(state => state.profile.status)
    const passwordStatus = useSelector<AppRootStateType, boolean>(state => state.newPassword.passwordStatus)
    const params = useParams()
    const token = params.token as string;
    const notice = useSelector<AppRootStateType, string>(state => state.newPassword.notice);
    const [visibility, setVisibility] = useState<boolean>(false)

    const onClickHandler = () => {
        dispatch(newPasswordTC(password, token))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    const onCloseSnackbar = () => {
        dispatch(setNoticeErrorAC({notice: ''}))
    }
    const setVisibilityHandler = () => {
        setVisibility(!visibility)
    }

    if (passwordStatus) {
        return <Navigate to={appPath.LOGIN}/>
    }

    return (<>
            <div className={styles.container}>
                {status === 'pending' && <CircularProgress style={{zIndex: '3', position: 'absolute'}}/>}
                <div className={styles.block}>
                    <h3>Create new password</h3>
                    <div className={styles.inputBlock}>
                        <TextField onChange={onChangeHandler}
                                    className={styles.input}
                                    value={password}
                                    type={visibility ? 'text' : 'password'}
                                    label="Password"
                                    variant="standard"
                    />
                        <span className={styles.visibilityIcon} onClick={setVisibilityHandler}>
                            {visibility
                                ? <VisibilityOffIcon/>
                                : <RemoveRedEyeIcon/>
                            }
                        </span>
                    </div>
                    <p>
                        Create new password and we will send you further instructions to email
                    </p>
                    <Button onClick={onClickHandler}
                            className={styles.button}
                            variant='contained'
                    >Create new password</Button>
                </div>
            </div>
            <CustomizedSnackbars message={notice} isOpen={!!notice} onClose={onCloseSnackbar}
                                 isError={status === 'failed'}/>
        </>
    )
}