import { ChangeEvent, FC, useState } from "react"
import { useAppDispatch } from "../../../../app/store"
import { BasicModal } from "../../../../components/BasicModal/BasicModal"
import style from './editCardModal.module.scss'
import { TextField } from '@mui/material';
import { editCardTC } from "../../cardsReducer";

export const EditCardModal: FC<EditCardModal> = (
   { isOpen, onClosehandler, isLoading, cardQuestion, cardAnswer, onChangeQuestionHandler, onChangeAnswerHandler, cardId, packId }
) => {
   const dispatch = useAppDispatch()
   const [questionError, setQuestionError] = useState('')
   const [answerError, setAnswerError] = useState('')
   const onClose = () => {
      onClosehandler()
      setQuestionError('')
      setAnswerError('')
   }
   const setEditedCard = async () => {
      if (!cardQuestion.trim()) {
         setQuestionError('enter a question')
      }
      if (!cardAnswer.trim()) {
         setAnswerError('enter answer')
      }
      if (!!cardQuestion.trim() && !!cardAnswer.trim()) {
         const card = {
            _id: cardId,
            question: cardQuestion,
            answer: cardAnswer
         }
         const action = await dispatch(editCardTC(card, packId))
         if (action) {
            onClosehandler()
         }
      }
   }
   const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
      setQuestionError('')
      onChangeQuestionHandler(e.currentTarget.value)
   }
   const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
      setAnswerError('')
      onChangeAnswerHandler(e.currentTarget.value)
   }
   return (
      <BasicModal
         className={style.editCard}
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
               value={cardQuestion}
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
               value={cardAnswer}
               onChange={onChangeAnswer}
               id="outlined-basic" label="Name pack"
               variant="standard"
            />
            {!!answerError && <div className={style.answer__error}>{answerError}</div>}
         </div>
      </BasicModal>
   )
}
type EditCardModal = {
   isLoading: boolean
   isOpen: boolean
   onClosehandler: () => void
   cardQuestion: string
   cardAnswer: string
   onChangeQuestionHandler: (value: string) => void
   onChangeAnswerHandler: (value: string) => void
   cardId: string
   packId: string
}