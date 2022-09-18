import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";

export const Profile = () => {
    const isInitialized =useSelector<AppRootStateType,boolean>(state =>state.profile.isInitialized )
    if (!isInitialized){
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            PROFILE PAGE
        </div>
    )
}