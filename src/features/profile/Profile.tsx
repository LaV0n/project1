import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";
import {setLogoutTC} from "./profileReducer";

export const Profile = () => {

    const isInitialized =useSelector<AppRootStateType,boolean>(state =>state.profile.isInitialized )
    const dispatch=useAppDispatch()

    if (!isInitialized){
        return <Navigate to={'/login'}/>
    }
    const logoutHandler = () =>{
        dispatch(setLogoutTC())
    }

    return (
        <div>
            <h2>PROFILE PAGE</h2>
            <button onClick={logoutHandler}>Logout</button>
        </div>
    )
}