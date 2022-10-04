import { Checkbox, TextField } from "@mui/material"
import { ChangeEvent, FC, SyntheticEvent, useState } from "react"
import { BasicModal } from "../../../../components/BasicModal/BasicModal"
import style from './editPackModal.module.scss'
export const EditPackModal: FC<EditPackModal> = ({ isOpen, onClosehandler, isLoading, packName, onChangeHandler, onEditPack }) => {
   const [errorMessage, setErrorMessage] = useState('')
   const [isPrivate, setIsPrivate] = useState(false)
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setErrorMessage('')
      onChangeHandler(e.currentTarget.value)
   }
   const onChangeCheckbox = (_: SyntheticEvent<Element, Event>, isPrivate: boolean) => {
      setIsPrivate(isPrivate)
   }
   const onClose = () => {
      setErrorMessage('')
      setIsPrivate(false)
      onClosehandler()
   }
   const setEditedPack = () => {
      if (!!packName.trim()) {
         onEditPack(isPrivate)
         setIsPrivate(false)
      } else {
         onChangeHandler('')
         setErrorMessage('enter a pack name')
      }
   }
   return (
      <BasicModal
         className={style.editPack}
         open={isOpen}
         title='Edit pack'
         onClose={onClose}
         cancelButton={{ title: 'Cancel', buttonProps: { onClick: onClose, disabled: isLoading } }}
         confirmButton={
            {
               title: 'Save',
               buttonProps: { onClick: setEditedPack, disabled: isLoading || !!errorMessage }
            }
         }
         isLoading={isLoading}
      >
         <div className={style.input}>
            <TextField
               className={style.input__value}
               error={!!errorMessage}
               color={errorMessage ? 'error' : 'info'}
               value={packName}
               onChange={onChange}
               id="outlined-basic" label="Name pack"
               variant="standard"
            />
            {!!errorMessage && <div className={style.input__error}>{errorMessage}</div>}
         </div>
         <div className={style.control}>
            <Checkbox onChange={onChangeCheckbox} id='private' className={style.control__checkbox} checked={isPrivate} />
            <label className={`${style.control__label}${isPrivate ? ` ${style.checked}` : ''}`} htmlFor="private">Private pack</label>
         </div>
      </BasicModal>
   )
}
type EditPackModal = {
   isLoading: boolean
   isOpen: boolean
   onClosehandler: () => void
   packName: string
   onChangeHandler: (value: string) => void
   onEditPack: (isPrivate: boolean) => void
}