import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import styles from "./Learning.module.scss"
import {NavLink, useParams} from "react-router-dom";
import {appPath} from "../../common/path/appPath";
import {CircularProgress} from "@mui/material";
import {CustomizedSnackbars} from "../../components/CustomizedSnackbars/CustomizedSnackbars";
import vectorIcon from "../../assets/icons/Vector 1.png"
import {getAllCardsTC, setErrorNotice} from "./learningReducer";
import {LearningWindow} from "./LearningWindow/LearningWindow";

export const Learning = () => {

    const initialized = useAppSelector(state => state.learning.initialized)
    const status = useAppSelector(state => state.learning.status)
    const notice = useAppSelector(state => state.learning.notice)
    const param = useParams<{ id: string }>()
    const dispatch = useAppDispatch()

    const onCloseSnackbar = () => {
        dispatch(setErrorNotice({notice: ''}))
    }

    useEffect(() => {
        if (param.id) {
            dispatch(getAllCardsTC(param.id))
        }
    }, [])

    if (!initialized) {
        return <CircularProgress style={{zIndex: '3', position: 'absolute', left: '50vw', top: '50vh'}}/>
    }
    return (
        <div className={styles.container}>
            {status && <CircularProgress style={{zIndex: '3', position: 'absolute', left: '50vw', top: '50vh'}}/>}
            <NavLink to={appPath.PACKS} className={styles.link}>
                <img src={vectorIcon} alt={'0'}/> Back to Packs list
            </NavLink>
            <LearningWindow/>
            <CustomizedSnackbars message={notice} isOpen={!!notice}
                                 onClose={onCloseSnackbar}
                                 isError={true}/>
        </div>
    )
}