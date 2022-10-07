import React from "react";
import { useAppDispatch, useAppSelector} from "../../app/store";
import {Navigate, NavLink} from "react-router-dom";
import {setErrorNotice, setNameTC } from "./profileReducer";
import avatarDefault from "./../../assets/image/ava.png"
import { EditableSpan } from "../../components/EditableSpan/EditableSpan";
import {Button, CircularProgress} from "@mui/material";
import styles from "./Profile.module.scss"
import photo from "./../../assets/icons/photo.png"
import logoutIcon from "./../../assets/icons/logout.png"
import { setLogout } from "../../app/authReducer";
import { appPath } from "../../common/path/appPath";
import vectorIcon from "../../assets/icons/Vector 1.png";
import {CustomizedSnackbars} from "../../components/CustomizedSnackbars/CustomizedSnackbars";


export const Profile = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const name = useAppSelector(state => state.auth.data.name)
    const email = useAppSelector(state => state.auth.data.email)
    const status = useAppSelector(state => state.profile.status)
    const avatar= useAppSelector(state => state.auth.data.avatar)
    const notice=useAppSelector(state => state.profile.notice)


    if (!isAuth) {
        return <Navigate to={appPath.LOGIN} />
    }
    const logoutHandler = () => {
        dispatch(setLogout())
    }
    const changeNameHandler = (name: string) => {
        dispatch(setNameTC(name))
    }
    const changeAvatarHandler =()=>{
        alert('feature in progress...')
    }
    const onCloseSnackbar = () => {
        dispatch(setErrorNotice({notice: ''}))
    }

    return (
        <div className={styles.container}>
            <NavLink to={appPath.PACKS} className={styles.link}>
                <img src={vectorIcon} alt={''}/> Back to Packs list
            </NavLink>
            {status === 'pending' && <CircularProgress style={{zIndex:'3',position:'absolute',left: '50vw', top: '50vh'}}/>}
            <div className={styles.block}>
                <h3>Personal Information</h3>
                <div className={styles.avatarBlock}>
                    <img src={avatar? avatar : avatarDefault} alt={'0'} className={styles.avatar} />
                    <img src={photo} alt={'0'} className={styles.photoIcon} onClick={changeAvatarHandler} />
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
            <CustomizedSnackbars message={notice} isOpen={!!notice}
                                 onClose={onCloseSnackbar}
                                 isError={true}/>
        </div>
    )
}