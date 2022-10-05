import {useAppDispatch} from "../../../../app/store";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import style from "../LearningWindow.module.scss";
import {ChangeEvent, useState} from "react";
import {changeGradeCardTC} from "../../learningReducer";

type AnswerBlockType ={
    setAnswerBlock:(value:boolean)=>void
    cardId:string
    answer:string
}

export const AnswerBlock =({setAnswerBlock, cardId, answer}:AnswerBlockType)=>{

    const [rating,setRating]=useState('1')
    const dispatch=useAppDispatch()

    const nextButtonHandler=()=>{
        setAnswerBlock(false)
        dispatch(changeGradeCardTC({idCard:cardId,grade:Number(rating)}))
    }
    const setRatingHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setRating(e.target.value)
    }

    return(
        <div className={style.answerBlock}>
            <div className={style.question}>
                <span>Answer:</span> {answer}
            </div>
            <div className={style.rateBlock}>
                <FormControl>
                    <FormLabel id="controlled-radio-buttons-group">Rate yourself:</FormLabel>
                    <RadioGroup
                        aria-labelledby="controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={rating}
                        onChange={setRatingHandler}
                    >
                        <FormControlLabel value='1' control={<Radio />} label="Did not know" />
                        <FormControlLabel value='2' control={<Radio />} label="Forgot" />
                        <FormControlLabel value='3' control={<Radio />} label="A lot of thought" />
                        <FormControlLabel value='4' control={<Radio />} label="Confused" />
                        <FormControlLabel value='5' control={<Radio />} label="Knew the answer" />
                    </RadioGroup>
                </FormControl>
            </div>
            <Button variant='contained'
                className={style.button}
                onClick={nextButtonHandler}
            >Next
            </Button>
        </div>
    )
}