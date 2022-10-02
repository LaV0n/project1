import {useAppSelector} from "../../../../app/store";
import {Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import style from "../LearningWindow.module.scss";
import {ChangeEvent, useState} from "react";

type AnswerBlockType ={
    setAnswerBlock:(value:boolean)=>void
}

export const AnswerBlock =({setAnswerBlock}:AnswerBlockType)=>{

    const answer=useAppSelector(state => state.learning.data[0].answer)
    const [rating,setRating]=useState('1')

    const nextButtonHandler=()=>{
        setAnswerBlock(false)
        alert(rating)
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