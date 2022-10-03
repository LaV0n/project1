import { TextField } from "@mui/material"
import { ChangeEvent, FC, useState } from "react"
import { useAppDispatch } from "../../../../app/store"
import { BasicModal } from "../../../../components/BasicModal/BasicModal"
import style from './addNewCardModal.module.scss'
import { addNewCardTC } from './../../cardsReducer';
export const AddNewCardModal: FC<AddNewCardModalPropsType> = (
   { isOpen, onClosehandler, isLoading, packId }
) => {
   const dispatch = useAppDispatch()
   const [question, setQuestion] = useState('')
   const [answer, setAnswer] = useState('')
   const [questionError, setQuestionError] = useState('')
   const [answerError, setAnswerError] = useState('')
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
   }

   return (
      <BasicModal
         className={style.addCard}
         open={isOpen}
         title='Edit card'
         onClose={onClose}
         cancelButton={{ title: 'Cancel', buttonProps: { onClick: onClose, disabled: isLoading } }}
         confirmButton={
            {
               title: 'Save',
               buttonProps: { onClick: setEditedCard, disabled: isLoading || !!questionError || !!answerError }
            }
         }
         isLoading={isLoading}
      >
         <div className={style.question}>
            <TextField
               className={style.question__value}
               error={!!questionError}
               color={questionError ? 'error' : 'info'}
               value={question}
               onChange={onChangeQuestion}
               id="outlined-basic" label="Question"
               variant="standard"
            />
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