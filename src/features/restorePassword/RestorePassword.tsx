import React, {ChangeEvent, useState} from "react";
import {Button, LinearProgress, TextField} from "@mui/material";
import {restorePasswordTC} from "./restorePasswordReducer";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {StatusType} from "../../common/types";
import styles from "./RestorePassword.module.scss"
import mailIcon from "./../../assets/icons/mail.png"
import { useNavigate} from "react-router-dom";

export const RestorePassword = () => {
    const [email, setEmail] = useState<string>('test@test.tyt')
    const sendStatus=useSelector<AppRootStateType,boolean>(state => state.restorePassword.sendStatus)
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, StatusType>(state => state.profile.status)
    const navigate = useNavigate()

    const onClickHandler = () => {
        dispatch(restorePasswordTC(email))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }
    return (
        <div className={styles.container}>
            {status === 'pending' && <LinearProgress/>}
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
                    <p style={{textAlign: 'center', marginTop: '31px'}}>
                        Did you remember your password?
                    </p>
                    <a href={'/login'}>Try logging in</a>
                </div>
                : <div className={styles.block} style={{height:'408px'}}>
                    <h3>Check Email</h3>
                    <img src={mailIcon} alt={'0'}/>
                    <p style={{textAlign:'center'}}>
                        We’ve sent an Email with instructions to <br/>
                        {email}
                    </p>
                    <Button onClick={()=>navigate('/login')}
                            variant='contained'
                            className={styles.button}
                    >Back to login</Button>
                </div>
            }
        </div>
    )
}