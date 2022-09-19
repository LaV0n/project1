import React, {ChangeEvent, useState} from "react";
import {Button, LinearProgress, TextField} from "@mui/material";
import { restorePasswordTC} from "./restorePasswordReducer";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {StatusType} from "../../common/types";

export const RestorePassword = () => {
    const [email,setEmail]=useState<string>('')
    const dispatch=useAppDispatch()
    const status = useSelector<AppRootStateType, StatusType>(state => state.profile.status)

    const onClickHandler= ()=>{
        dispatch(restorePasswordTC(email))
    }
    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.currentTarget.value)
    }
    return (
        <div>
            {status === 'pending' && <LinearProgress/>}
            Restore Password PAGE
            <TextField onChange={onChangeHandler}
                       value={email}
                       label="Email"
                       variant="standard"
            />
            <Button onClick={onClickHandler}
                    variant='contained'
            >Create new password</Button>
        </div>
    )
}