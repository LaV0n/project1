import {FormControl, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material"
import {ChangeEvent, FC, useState} from "react"
import {useAppDispatch} from "../../../../app/store"
import {BasicModal} from "../../../../components/BasicModal/BasicModal"
import style from './addNewCardModal.module.scss'
import {addNewCardTC} from '../../cardsReducer';
import {ImageInput} from "./ImageInput/imageInput";

export const AddNewCardModal: FC<AddNewCardModalPropsType> = (
    {isOpen, onClosehandler, isLoading, packId}
) => {
    const dispatch = useAppDispatch()
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionError, setQuestionError] = useState('')
    const [answerError, setAnswerError] = useState('')
    const [isImgQuestion, setIsImgQuestion] = useState<QuestionType>('text')
    const [questionImg, setQuestionImg] = useState('')

    const setTypeOfQuestionHandler = (event: SelectChangeEvent) => {
        setIsImgQuestion(event.target.value as QuestionType)
    }

    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestionError('')
        setQuestion(e.currentTarget.value)
    }
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswerError('')
        setAnswer(e.currentTarget.value)
    }
    const onClose = () => {
        setQuestionError('')
        setAnswerError('')
        setAnswer('')
        setQuestion('')
        onClosehandler()
    }
    const setEditedCard = async () => {
        if (isImgQuestion==='text'){
            if (!question.trim()) {
                setQuestionError('enter a question')
            }
            if (!answer.trim()) {
                setAnswerError('enter answer')
            }
            if (!!question.trim() && !!answer.trim()) {
                const card = {
                    cardsPack_id: packId,
                    question: question,
                    answer: answer
                }
                const action = await dispatch(addNewCardTC(card))
                if (action) {
                    onClose()
                }
            }
       }else{
            if (!answer.trim()) {
                setAnswerError('enter answer')
            }
            if (questionImg.length>1 && !!answer.trim()) {
                const card = {
                    cardsPack_id: packId,
                    questionImg: questionImg,
                    answer: answer
                }
                const action = await dispatch(addNewCardTC(card))
                if (action) {
                    onClose()
                }
            }
    }}

    return (
        <BasicModal
            className={style.addCard}
            open={isOpen}
            title='Edit card'
            onClose={onClose}
            cancelButton={{title: 'Cancel', buttonProps: {onClick: onClose, disabled: isLoading}}}
            confirmButton={
                {
                    title: 'Save',
                    buttonProps: {onClick: setEditedCard, disabled: isLoading || !!questionError || !!answerError}
                }
            }
            isLoading={isLoading}
        >
            <FormControl variant={'outlined'} className={style.selector}>
                <Select
                    labelId="ImgOrText"
                    id="demo-simple-select-standard"
                    value={isImgQuestion}
                    onChange={setTypeOfQuestionHandler}
                >
                    <MenuItem value={'text'}>Text</MenuItem>
                    <MenuItem value={'image'}>Image</MenuItem>
                </Select>
            </FormControl>
            <div className={style.question}>
                {isImgQuestion === 'text'
                    ? <TextField
                        className={style.question__value}
                        error={!!questionError}
                        color={questionError ? 'error' : 'info'}
                        value={question}
                        onChange={onChangeQuestion}
                        id="outlined-basic" label="Question"
                        variant="standard"
                    />
                    : <ImageInput image={questionImg} setImage={setQuestionImg}/>
                }
                {!!questionError && <div className={style.question__error}>{questionError}</div>}
            </div>
            <div className={style.answer}>
                <TextField
                    className={style.answer__value}
                    error={!!answerError}
                    color={answerError ? 'error' : 'info'}
                    value={answer}
                    onChange={onChangeAnswer}
                    id="outlined-basic" label="Name pack"
                    variant="standard"
                />
                {!!answerError && <div className={style.answer__error}>{answerError}</div>}
            </div>
        </BasicModal>
    )
}
type AddNewCardModalPropsType = {
    isLoading: boolean
    isOpen: boolean
    onClosehandler: () => void
    packId: string
}
export type QuestionType = 'text' | 'image'