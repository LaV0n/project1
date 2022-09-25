import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {FC} from "react";
import React from "react";
import {addNewCardTC, CardsType, deleteCardTC, editCardTC} from "../cardsReducer";
import styles from "./cardsTable.module.scss"
import {RatingStars} from "../../../components/RatingStars/RatingStars";
import {useAppDispatch} from "../../../app/store";
import editIcon from "../../../assets/icons/Edit.png"
import deleteIcon from "../../../assets/icons/Delete.png"
import {BurgerMenu} from "../../../components/BurgerMenu/BurgerMenu";

type CardsTablePropsType = {
    cards: CardsType[]
    isOwner: boolean
    packId: string
    status: boolean
}

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

const items = [
    'Edit',
    'Delete',
    'Learn',
]


export const CardsTable: FC<CardsTablePropsType> = ({cards, isOwner, packId, status}) => {

    const dispatch = useAppDispatch()

    const addNewCardHandler = () => {
        dispatch(addNewCardTC(packId))
    }
    const learnCardHandler = () => {
        alert('learn')
    }
    const editCardHandler = (cardId: string, packId: string) => {
        dispatch(editCardTC(cardId, packId))
    }
    const deleteCardHandler = (cardId: string, packId: string) => {
        dispatch(deleteCardTC(cardId, packId))
    }

    return (
        <div className={styles.container}>
            {isOwner
                ? <div className={styles.headerBlock}>
                    <div className={styles.title}>
                        <span>My Pack</span>
                        <span><BurgerMenu items={items}/></span>
                    </div>
                    <Button variant='contained'
                            className={styles.button}
                            onClick={addNewCardHandler}
                            disabled={status}
                    >Add New Card</Button>
                </div>
                : <div className={styles.headerBlock}>
                    <div className={styles.title}>Friends Pack</div>
                    <Button variant='contained'
                            className={styles.button}
                            onClick={learnCardHandler}
                            disabled={status}
                    >Learn to pack</Button>
                </div>
            }
            <div className={styles.searchBlock}>
                <div className={styles.searchTitle}>Search</div>
                <input type={'search'} placeholder={'Provide your text'} style={{width:'100%',height:'30px', border:'1px solid rgba(0, 0, 0, 0.1)'}}/>
            </div>
            <div>
                <TableContainer className={styles.table}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow className={styles.tableHeader}>
                                <TableCell className={styles.headerTitle}>Question</TableCell>
                                <TableCell className={styles.headerTitle} align="right">Answer</TableCell>
                                <TableCell className={styles.headerTitle} align="right">Last Updated</TableCell>
                                <TableCell className={styles.headerTitle} align="right">Grade</TableCell>
                                {isOwner && <TableCell className={styles.headerTitle} align="right"></TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.map((card) => (
                                <TableRow
                                    key={card.question}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}, backgroundColor: 'white'}}
                                >
                                    <TableCell component="th" scope="row">
                                        {card.question}
                                    </TableCell>
                                    <TableCell align="right">{card.answer}</TableCell>
                                    <TableCell align="right">
                                        {formatDate(card.updated)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <RatingStars stars={card.grade}/>
                                    </TableCell>
                                    {isOwner &&
                                        <TableCell align="right" style={{width: '60px'}}>
                                            <div className={styles.toolsIcon}>
                                                <button onClick={() => editCardHandler(card._id, card.cardsPack_id)}
                                                        disabled={status} style={{backgroundColor: 'white'}}
                                                >
                                                    <img src={editIcon} alt={'0'} className={styles.Icon}/>
                                                </button>
                                                <button onClick={() => deleteCardHandler(card._id, card.cardsPack_id)}
                                                        disabled={status} style={{backgroundColor: 'white'}}
                                                >
                                                    <img src={deleteIcon} alt={'0'} className={styles.Icon}/>
                                                </button>
                                            </div>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}