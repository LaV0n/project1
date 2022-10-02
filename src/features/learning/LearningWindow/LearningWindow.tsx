import {useAppDispatch, useAppSelector} from "../../../app/store";
import style from "./LearningWindow.module.scss"
import {Button} from "@mui/material";
import React, {useState} from "react";
import {AnswerBlock} from "./AnswerBlock/AnswerBlock";

export const LearningWindow = () => {

    const dispatch = useAppDispatch()
    const card = useAppSelector(state => state.learning.data)
    const packName = useAppSelector(state => state.learning.packName)
    const [answerBlock, setAnswerBlock] = useState(false)

    const answerButtonHandler = () => {
        setAnswerBlock(true)
    }

    return (
        <div className={style.container}>
            <h3>Learn "{packName}"</h3>
            <div className={style.block}>
                <div className={style.question}>
                    <span>Question: </span>
                    {card.length === 0
                        ? <div>oops</div>
                        : card[0].question}
                </div>
                <div className={style.attempts}>
                    Number of attempts:
                    <span>{card[0].shots}</span>
                </div>
                {!answerBlock
                ?<Button variant='contained'
                         className={style.button}
                         onClick={answerButtonHandler}
                    >Show answer</Button>
                :<AnswerBlock setAnswerBlock={setAnswerBlock}/>
                }

            </div>

        </div>
    )

}