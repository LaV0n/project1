import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";
import {setLogoutTC, setNameTC} from "./profileReducer";
import avatar from "./../../assets/image/ava.png"
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import { LinearProgress } from "@mui/material";
import {StatusType} from "../../common/types";

export const Profile = () => {

    const isInitialized =useSelector<AppRootStateType,boolean>(state =>state.profile.isInitialized )
    const dispatch=useAppDispatch()
    const name=useSelector<AppRootStateType,string>(state => state.profile.name)
    const email=useSelector<AppRootStateType,string>(state => state.profile.email)
    const status=useSelector<AppRootStateType,StatusType>(state => state.profile.status)


    if (!isInitialized){
        return <Navigate to={'/login'}/>
    }
    const logoutHandler = () =>{
        dispatch(setLogoutTC())
    }
    const changeNameHandler= (name:string) =>{
       dispatch(setNameTC(name))
    }

    return (
        <div>
            { status === 'pending' && <LinearProgress/>}
            <h2>PROFILE PAGE</h2>
            <img src={avatar} alt={'0'}/>
            <div>name :
               <EditableSpan value={name} onChange={changeNameHandler}/>
            </div>
            <div>
                {email}
            </div>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}