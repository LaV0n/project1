import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {Navigate} from "react-router-dom";
import {setLogoutTC, setNameTC} from "./profileReducer";
import avatar from "./../../assets/image/ava.png"
import {EditableSpan} from "../../components/EditableSpan/EditableSpan";
import {Button, LinearProgress} from "@mui/material";
import {StatusType} from "../../common/types";
import styles from "./Profile.module.scss"
import photo from "./../../assets/icons/photo.png"
import logout from "./../../assets/icons/logout.png"

export const Profile = () => {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.profile.isInitialized)
    const dispatch = useAppDispatch()
    const name = useSelector<AppRootStateType, string>(state => state.profile.name)
    const email = useSelector<AppRootStateType, string>(state => state.profile.email)
    const status = useSelector<AppRootStateType, StatusType>(state => state.profile.status)


    if (!isInitialized) {
        return <Navigate to={'/login'}/>
    }
    const logoutHandler = () => {
        dispatch(setLogoutTC())
    }
    const changeNameHandler = (name: string) => {
        dispatch(setNameTC(name))
    }

    return (
        <div className={styles.container}>
            {status === 'pending' && <LinearProgress/>}
            <div className={styles.block}>
                <h3>Personal Information</h3>
                <div className={styles.avatarBlock}>
                    <img src={avatar} alt={'0'} className={styles.avatar}/>
                    <img src={photo} alt={'0'} className={styles.photo}/>
                </div>
                <div className={styles.name}>
                    <EditableSpan value={name} onChange={changeNameHandler}/>
                </div>
                <div className={styles.email}>
                    {email}
                </div>
                <Button onClick={logoutHandler}
                        className={styles.button}
                        variant='text'
                        color='inherit'
                > <img src={logout} alt={'0'}/>Log out
                </Button>
            </div>
        </div>
    )
}