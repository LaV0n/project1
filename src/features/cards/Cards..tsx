import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setErrorNotice } from "./cardsReducer";
import { CardsTable } from "./cardsTable/cardsTable";
import styles from "./Cards.module.scss"
import { NavLink, useParams } from "react-router-dom";
import { appPath } from "../../common/path/appPath";
import { CircularProgress } from "@mui/material";
import { CustomizedSnackbars } from "../../components/CustomizedSnackbars/CustomizedSnackbars";
import vectorIcon from "../../assets/icons/Vector 1.png"

export const Cards = () => {
    const params = useParams<{ id: string }>()
    const data = useAppSelector(state => state.cards)
    const userId = useAppSelector(state => state.auth.data._id)
    const notice = useAppSelector(state => state.cards.notice)
    const dispatch = useAppDispatch()
    const packId = params.id ? params.id : ''

    const onCloseSnackbar = () => {
        dispatch(setErrorNotice({ notice: '' }))
    }

    return (
        <div className={styles.container}>
            {data.status && <CircularProgress style={{ zIndex: '3', position: 'absolute', left: '50vw', top: '50vh' }} />}
            <NavLink to={appPath.PACKS} className={styles.link}>
                <img src={vectorIcon} alt={''} /> Back to Packs list
            </NavLink>
            <CardsTable cards={data.data.cards}
                isOwner={userId === data.data.packUserId}
                packId={packId}
                status={data.status}
            />
            cardsCount : {data.data.cardsTotalCount}
            <CustomizedSnackbars message={notice} isOpen={!!notice} onClose={onCloseSnackbar}
                isError={true} />
        </div>
    )
}