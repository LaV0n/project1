import {useAppDispatch, useAppSelector} from "../../../app/store";
import style from "./LearningWindow.module.scss"
import {Button, Switch} from "@mui/material";
import React, {useEffect, useState} from "react";
import {AnswerBlock} from "./AnswerBlock/AnswerBlock";
import {CardsType} from "../../cards/cardsReducer";
import {setFilter} from "../learningReducer";


const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
}

export const LearningWindow = () => {

    const dispatch = useAppDispatch()
    const packName = useAppSelector(state => state.learning.packName)
    const sortStepByStep = useAppSelector(state => state.learning.sortStepByStep)
    const cardAll = useAppSelector<CardsType[]>(state => state.learning.data)

    const [card, setCard] = useState({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        more_id: '',

        created: '',
        updated: '',
    })

    const [answerBlock, setAnswerBlock] = useState(false)

    const answerButtonHandler = () => {
        setAnswerBlock(true)
    }

    const [checked,setChecked]=useState(sortStepByStep)
    const handleChange=()=>{
        dispatch(setFilter({filter:!checked}))
        setChecked(!checked)
    }

    useEffect(() => {
        if (!sortStepByStep) {
            let index = cardAll.findIndex(c => c._id === card._id)
            if (index === cardAll.length - 1) { index = -1 }
            setCard(cardAll[index + 1])
        } else {
            setCard(getCard(cardAll))
        }
    }, [dispatch, packName, cardAll])

    return (
        <div className={style.container}>
            <div className={style.title}>
                <h3>Learn "{packName}" </h3>
                <div className={style.switch}>
                    <span className={style.mode}>dogged mode</span>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
            </div>
            <div className={style.block}>
                <div className={style.question}>
                    <span>Question: </span>
                    {card.question}
                </div>
                <div className={style.attempts}>
                    Number of attempts:
                    <span>{card.shots}</span>
                </div>
                {!answerBlock
                    ? <Button variant='contained'
                              className={style.button}
                              onClick={answerButtonHandler}
                    >Show answer</Button>
                    : <AnswerBlock setAnswerBlock={setAnswerBlock} cardId={card._id} answer={card.answer}/>
                }
            </div>

        </div>
    )

}