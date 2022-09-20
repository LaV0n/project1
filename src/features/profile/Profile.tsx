import React from "react";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "../../app/store";
import { Navigate } from "react-router-dom";
import { setNameTC } from "./profileReducer";
import avatar from "./../../assets/image/ava.png"
import { EditableSpan } from "../../components/EditableSpan/EditableSpan";
import { Button, LinearProgress } from "@mui/material";
import { StatusType } from "../../common/types";
import styles from "./Profile.module.scss"
import photo from "./../../assets/icons/photo.png"
import logoutIcon from "./../../assets/icons/logout.png"
import { setLogout } from "../../app/authReducer";

export const Profile = () => {
    const dispatch = useAppDispatch()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    const name = useSelector<AppRootStateType, string>(state => state.auth.data.name)
    const email = useSelector<AppRootStateType, string>(state => state.auth.data.email)
    const status = useSelector<AppRootStateType, StatusType>(state => state.profile.status)


    if (!isAuth) {
        return <Navigate to={'/login'} />
    }
    const logoutHandler = () => {
        dispatch(setLogout())
    }
    const changeNameHandler = (name: string) => {
        dispatch(setNameTC(name))
    }

    return (
        <div className={styles.container}>
            {status === 'pending' && <LinearProgress />}
            <div className={styles.block}>
                <h3>Personal Information</h3>
                <div className={styles.avatarBlock}>
                    <img src={avatar} alt={'0'} className={styles.avatar} />
                    <img src={photo} alt={'0'} className={styles.photo} />
                </div>
                <div className={styles.name}>
                    <EditableSpan value={name} onChange={changeNameHandler} />
                </div>
                <div className={styles.email}>
                    {email}
                </div>
                <Button onClick={logoutHandler}
                    className={styles.button}
                    variant='text'
                    color='inherit'
                > <img src={logoutIcon} alt={'0'} />Log out
                </Button>
            </div>
        </div>
    )
}