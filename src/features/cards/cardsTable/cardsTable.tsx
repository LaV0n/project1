import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {ChangeEvent, FC, useEffect, useState} from "react";
import React from "react";
import {addNewCardTC, CardsType, deleteCardTC, editCardTC, getCardsTC, setPage, setPageCount} from "../cardsReducer";
import styles from "./cardsTable.module.scss"
import {RatingStars} from "../../../components/RatingStars/RatingStars";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import editIcon from "../../../assets/icons/packs/edit.svg"
import deleteIcon from "../../../assets/icons/packs/trash.svg"
import {BurgerMenu} from "../../../components/BurgerMenu/BurgerMenu";
import {SortArrows} from "./sortArrows/sortArrows";
import useDebounce from "../../../common/utils/hooks";
import {CardsFooter} from "../cardsFooter/cardsFooter";

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

export const CardsTable: FC<CardsTablePropsType> = ({cards, isOwner, packId, status}) => {

    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.cards.data)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const page=useAppSelector(state => state.cards.page)
    const [questionSort, setQuestionSort] = useState(false)
    const [answerSort, setAnswerSort] = useState(false)
    const [updateSort, setUpdateSort] = useState(false)
    const [gradeSort, setGradeSort] = useState(false)
    const packName = useAppSelector(state => state.cards.data.packName)
    const localSearchItem = localStorage.getItem('searchItem')
    const [searchInput, setSearchInput] = useState<string>(localSearchItem ? localSearchItem : '')
    const debouncedValue = useDebounce<string>(searchInput, 700)

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
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value)
    }
    const onChangePageCountHandler = (pageCount: number) => {
        dispatch(setPageCount(pageCount))
    }
    const onChangePageHandler = (page: number) => {
        dispatch(setPage(page))
    }

    useEffect(() => {
        localStorage.setItem('searchItem', debouncedValue)
        dispatch(getCardsTC({cardsPack_id: packId, cardQuestion: debouncedValue}))
    }, [debouncedValue, pageCount, page])

    return (
        <div className={styles.container}>
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
                            disabled={status}
                    >Learn to pack</Button>
                </div>
            }
            <div className={styles.searchBlock}>
                <div className={styles.searchTitle}>Search</div>
                <input type={'search'} placeholder={'Provide your text'}
                       style={{width: '100%', height: '30px', border: '1px solid rgba(0, 0, 0, 0.1)'}}
                       onChange={onChangeHandler} value={searchInput}/>
            </div>
            <div>
                <TableContainer className={styles.table}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow className={styles.tableHeader}>
                                <TableCell className={styles.headerTitle}
                                           onClick={() => setQuestionSort(true)}
                                           onMouseLeave={() => setQuestionSort(false)}>
                                    Question
                                    {questionSort && <SortArrows packId={packId} value={'question'}/>}
                                </TableCell>
                                <TableCell className={styles.headerTitle} align="right"
                                           onClick={() => setAnswerSort(true)}
                                           onMouseLeave={() => setAnswerSort(false)}>
                                    Answer
                                    {answerSort && <SortArrows packId={packId} value={'answer'}/>}
                                </TableCell>
                                <TableCell className={styles.headerTitle} align="right"
                                           onClick={() => setUpdateSort(true)}
                                           onMouseLeave={() => setUpdateSort(false)}>
                                    Last Updated
                                    {updateSort && <SortArrows packId={packId} value={'update'}/>}
                                </TableCell>
                                <TableCell className={styles.headerTitle} align="right"
                                           onClick={() => setGradeSort(true)}
                                           onMouseLeave={() => setGradeSort(false)}>
                                    Grade
                                    {gradeSort && <SortArrows packId={packId} value={'grade'}/>}
                                </TableCell>
                                {isOwner && <TableCell className={styles.headerTitle} align="right"></TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cards.length === 0
                                ? <TableRow>
                                    <TableCell style={{
                                        paddingTop: '20px',
                                        height: '50px',
                                        display: "flex",
                                        justifyContent: 'center',
                                        marginLeft: "400px"
                                    }}>no cards</TableCell>
                                </TableRow>
                                : cards.map((card) => (
                                    <TableRow
                                        key={card._id}
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
                                                    <button
                                                        onClick={() => deleteCardHandler(card._id, card.cardsPack_id)}
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
            <div>
                <CardsFooter page={data.page} cardsTotalCount={data.cardsTotalCount}
                             pageCount={data.pageCount} onChangePageCount={onChangePageCountHandler}
                             onChangePage={onChangePageHandler}/>
            </div>
        </div>

    );
}