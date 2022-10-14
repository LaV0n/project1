import styles from "./FriendProfile.module.scss"
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {getUserProfileTC, setErrorNotice} from "./friendProfileReducer";
import {useParams} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import avatarDefault from "../../../assets/image/ava.png";
import {CustomizedSnackbars} from "../../../components/CustomizedSnackbars/CustomizedSnackbars";

const formatDate = (dateCard: string) => {
    const date = new Date(dateCard)
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1;
    let dd: any = date.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return `${dd}.${mm}.${yyyy}`
}

export const FriendProfile = () => {

    const dispatch = useAppDispatch()
    const param = useParams<{ id: string }>()
    const status = useAppSelector(state => state.friendProfile.status)
    const profile = useAppSelector(state => state.friendProfile.data)
    const notice = useAppSelector(state => state.friendProfile.notice)

    const onCloseSnackbar = () => {
        dispatch(setErrorNotice({notice: ''}))
    }

    useEffect(() => {
        if (param.id) {
            dispatch(getUserProfileTC(param.id))
        }
    }, [])

    return (
        <div className={styles.container}>
            {status && <CircularProgress style={{zIndex: '3', position: 'absolute', left: '50vw', top: '50vh'}}/>}
            <div className={styles.block}>
                <h3>User Profile Information</h3>
                <img src={profile.avatar ? profile.avatar : avatarDefault} alt={'0'} className={styles.avatarBlock}/>
                <div className={styles.infoBlock}>
                    <div className={styles.title}>
                        name <span>{profile.name}</span>
                    </div>
                    <div className={styles.title}>
                        email <span>{profile.email}</span>
                    </div>
                    <div className={styles.title}>
                        update date <span>{formatDate(profile.updated)}</span>
                    </div>
                    <div className={styles.title}>
                        packs count <span>{profile.publicCardPacksCount}</span>
                    </div>
                    <div className={styles.title}>
                        role <span>{profile.isAdmin ? 'ADMIN' : 'user'}</span>
                    </div>
                </div>
            </div>
            <CustomizedSnackbars message={notice} isOpen={!!notice}
                                 onClose={onCloseSnackbar}
                                 isError={true}/>
        </div>
    )
}