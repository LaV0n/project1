import styles from "./Users.module.scss";
import {UsersTable} from "./usersTable/UsersTable";
import {CustomizedSnackbars} from "../../../components/CustomizedSnackbars/CustomizedSnackbars";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import { setErrorNotice } from "./usersReducer";


export const Users =()=>{

    const notice=useAppSelector(state => state.users.notice)
    const dispatch=useAppDispatch()

    const onCloseSnackbar = () => {
        dispatch(setErrorNotice({notice: ''}))
    }

    return(
        <div className={styles.container}>
            <UsersTable/>
            <CustomizedSnackbars message={notice} isOpen={!!notice}
                                 onClose={onCloseSnackbar}
                                 isError={true}/>
        </div>
    )
}