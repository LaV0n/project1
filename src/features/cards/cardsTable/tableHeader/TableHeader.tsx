import styles from "../cardsTable.module.scss";
import {BurgerMenu} from "../../BurgerMenu/BurgerMenu";
import {Button} from "@mui/material";
import React, {FC} from "react";
import {addNewCardTC} from "../../cardsReducer";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {useNavigate} from "react-router-dom";
import {appPath} from "../../../../common/path/appPath";

type HeaderTableType={
    isOwner:boolean
    packId:string
}

export const TableHeader:FC<HeaderTableType> =({isOwner,packId})=>{

    const dispatch = useAppDispatch()
    const status=useAppSelector(state => state.cards.status)
    const packName = useAppSelector(state => state.cards.data.packName)
    const cardsTotalCount = useAppSelector(state => state.cards.data.cardsTotalCount)
    const navigate = useNavigate()

    const addNewCardHandler = () => {
        dispatch(addNewCardTC(packId))
    }
    const learnCardHandler = () => {
      navigate(appPath.LEARNINGDEFAULT+packId)
    }

    return(
        <>
            {isOwner
                ? <div className={styles.headerBlock}>
                    <div className={styles.title}>
                        <span>"{packName}"</span>
                        <span className={styles.owner}>My Pack</span>
                        <span><BurgerMenu _id={packId}/></span>
                    </div>
                    <Button variant='contained'
                            className={styles.button}
                            onClick={addNewCardHandler}
                            disabled={status}
                    >Add New Card</Button>
                </div>
                : <div className={styles.headerBlock}>
                    <div className={styles.title}>
                        <span>"{packName}"</span>
                        <span className={styles.owner}> Friend's Pack</span>
                    </div>
                    <Button variant='contained'
                            className={styles.button}
                            onClick={learnCardHandler}
                            disabled={status || cardsTotalCount===0}
                    >Learn to pack</Button>
                </div>
            }
    </>
    )
}