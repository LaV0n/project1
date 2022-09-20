import React, {ChangeEvent, useState} from "react";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {StatusType} from "../../common/types";
import {Button, LinearProgress,  TextField} from "@mui/material";
import {newPasswordTC} from "./newPasswordReducer";
import {Navigate, useParams} from "react-router-dom";
import styles from "./NewPassword.module.scss"

export const NewPassword = () => {
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, StatusType>(state => state.profile.status)
    const passwordStatus=useSelector<AppRootStateType,boolean>(state => state.newPassword.passwordStatus)
    const params = useParams()
    const token=params.token as string;

    const onClickHandler = () => {
        dispatch(newPasswordTC(password, token))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    if(passwordStatus){
        return  <Navigate to={ '/login'}/>
    }

    return (
        <div className={styles.container}>
            {status === 'pending' && <LinearProgress/>}
           <div className={styles.block}>
               <h3>Create new password</h3>
               <TextField onChange={onChangeHandler}
                          className={styles.input}
                          value={password}
                          type={'password'}
                          label="Password"
                          variant="standard"

               />
               <p>
                   Create new password and we will send you further instructions to email
               </p>
               <Button onClick={onClickHandler}
                       className={styles.button}
                       variant='contained'
               >Create new password</Button>
           </div>
        </div>
    )
}