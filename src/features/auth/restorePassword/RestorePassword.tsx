import { ChangeEvent, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { restorePasswordTC, setNoticeErrorAC } from "./restorePasswordReducer";
import { useAppDispatch, useAppSelector} from "../../../app/store";
import styles from "./RestorePassword.module.scss"
import mailIcon from "../../../assets/icons/mail.png"
import { useNavigate } from "react-router-dom";
import { appPath } from "../../../common/path/appPath";
import { CustomizedSnackbars } from "../../../components/CustomizedSnackbars/CustomizedSnackbars";

export const RestorePassword = () => {
    const [email, setEmail] = useState<string>('')
    const sendStatus = useAppSelector(state => state.restorePassword.sendStatus)
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.profile.status)
    const navigate = useNavigate()
    const notice = useAppSelector(state => state.restorePassword.notice)

    const onClickHandler = () => {
        dispatch(restorePasswordTC(email))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    const onCloseSnackbar = () => {
        dispatch(setNoticeErrorAC({ notice: '' }))
    }

    return (<>
        <div className={styles.container}>
            {status === 'pending' && <CircularProgress style={{ zIndex: '3', position: 'absolute' }} />}
            {!sendStatus
                ? <div className={styles.block}>
                    <h3>Forgot your password?</h3>
                    <TextField onChange={onChangeHandler}
                        value={email}
                        label="Email"
                        variant="standard"
                        className={styles.input}
                    />
                    <p>
                        Enter your email address and we will send you further instructions
                    </p>
                    <Button onClick={onClickHandler}
                        variant='contained'
                        className={styles.button}
                    >Send Instructions</Button>
                    <p style={{ textAlign: 'center', marginTop: '31px' }}>
                        Did you remember your password?
                    </p>
                    <a href={appPath.LOGIN}>Try logging in</a>
                </div>
                : <div className={styles.block} >
                    <h3>Check Email</h3>
                    <img src={mailIcon} alt={'0'} style={{ marginTop: '29px' }} />
                    <p style={{ textAlign: 'center' }}>
                        We’ve sent an Email with instructions to <br />
                        {email}
                    </p>
                    <Button onClick={() => navigate(appPath.LOGIN)}
                        variant='contained'
                        className={styles.button}
                        style={{ marginBottom: '48px', marginTop: '41px' }}
                    >Back to login</Button>
                </div>
            }
        </div>
        <CustomizedSnackbars message={notice} isOpen={!!notice} onClose={onCloseSnackbar} isError={status === 'failed'} />
    </>
    )
}