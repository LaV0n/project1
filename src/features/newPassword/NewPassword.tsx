import React, {ChangeEvent, useState} from "react";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {StatusType} from "../../common/types";
import {Button, LinearProgress, TextField} from "@mui/material";
import {newPasswordTC} from "./newPasswordReducer";
import {useParams} from "react-router-dom";

export const NewPassword = () => {
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, StatusType>(state => state.profile.status)
    const params = useParams()
    const token=params.token;
    console.log(token)

    const onClickHandler = () => { //@ts-ignore
        dispatch(newPasswordTC(password, token))
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }
    return (
        <div>
            {status === 'pending' && <LinearProgress/>}
            new pass
            <TextField onChange={onChangeHandler}
                       value={password}
                       type='password'
                       label="Password"
                       variant="standard"
            />
            <Button onClick={onClickHandler}
                    variant='contained'
            >Send Instructions</Button>
        </div>
    )
}