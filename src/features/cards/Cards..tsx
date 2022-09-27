import React, {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getCardsTC, setErrorNotice} from "./cardsReducer";
import {CardsTable} from "./cardsTable/cardsTable";
import styles from "./Cards.module.scss"
import {NavLink} from "react-router-dom";
import {appPath} from "../../common/path/appPath";
import {CircularProgress} from "@mui/material";
import {CustomizedSnackbars} from "../../components/CustomizedSnackbars/CustomizedSnackbars";
import vectorIcon from "../../assets/icons/Vector 1.png"

type CardsType = {
    packId: string
}

//export const packId='632f9975ef99210257c3d00f'                                                         //plug
export const packId = '6330327a85107f309033e65b'                                                         //plug owner

export const Cards: FC<CardsType> = ({packId}) => {
    const data = useAppSelector(state => state.cards)
    const userId = useAppSelector(state => state.auth.data._id)
    const notice = useAppSelector(state => state.cards.notice)
    const dispatch = useAppDispatch()


    const onCloseSnackbar = () => {
        dispatch(setErrorNotice({notice: ''}))
    }

    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [])

    return (
        <div className={styles.container}>
            {data.status && <CircularProgress style={{zIndex: '3', position: 'absolute', left: '50vw', top: '50vh'}}/>}
            <NavLink to={appPath.MAIN} className={styles.link}>                                       {/*//temp link*/}
                <img src={vectorIcon} alt={''}/> Back to Packs list
            </NavLink>
            <CardsTable cards={data.data.cards}
                        isOwner={userId === data.data.packUserId}
                        packId={packId}
                        status={data.status}

            />
            cardsCount : {data.data.cardsTotalCount}
            <CustomizedSnackbars message={notice} isOpen={!!notice} onClose={onCloseSnackbar}
                                 isError={true}/>
        </div>
    )
}