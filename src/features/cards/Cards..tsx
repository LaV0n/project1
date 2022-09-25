import React from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {useEffect} from "react";
import {getCardsTC} from "./cardsReducer";
import {CardsTable} from "./cardsTable/cardsTable";
import styles from "./Cards.module.scss"
import {NavLink} from "react-router-dom";
import {appPath} from "../../common/path/appPath";
import {CircularProgress} from "@mui/material";

export const Cards = () => {
    const data = useAppSelector(state => state.cards)
    const userId=useAppSelector(state => state.auth.data._id)
    const packId='632f9975ef99210257c3d00f'                                                         //plug
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCardsTC(packId))
    }, [])


    return (
        <div className={styles.container}>
            {data.status && <CircularProgress style={{zIndex: '3', position: 'absolute',left:'50vw',top:'50vh'}}/>}
            <NavLink to={appPath.MAIN}>Back to Packs list</NavLink>                                  {/* temp link*/}
            <CardsTable cards={data.cards}
                        isOwner={userId===data.packUserId}
                        packId={packId}
                        status={data.status}
            />
            pageCount : {data.cardPacksTotalCount}
        </div>
    )
}