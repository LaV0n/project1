import { Checkbox, TextField } from "@mui/material"
import { ChangeEvent, FC, SyntheticEvent, useEffect, useState } from "react"
import { useAppDispatch } from "../../../../app/store"
import { StatusType } from "../../../../common/types"
import { BasicModal } from "../../BasicModal/BasicModal"
import { editPackName } from "../../packsReducer"
import style from './editPackModal.module.scss'
export const EditPackModal: FC<AddNewPackModalPropsType> = ({ isOpen, onClosehandler, status, packName, onChangeHandler, id }) => {
   const dispatch = useAppDispatch()
   const [errorMessage, setErrorMessage] = useState('')
   const [checked, setChecked] = useState(false)
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setErrorMessage('')
      onChangeHandler(e.currentTarget.value)
   }
   const onChangeCheckbox = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
      setChecked(checked)
   }
   const onClose = () => {
      setErrorMessage('')
      onClosehandler()
   }
   const onCancel = () => {
      onChangeHandler('')
      setErrorMessage('')
      setChecked(false)
      onClosehandler()
   }
   const setEditedPack = async () => {
      if (!!packName.trim()) {
         const action = await dispatch(editPackName({ name: packName.trim(), _id: id, private: checked }))
         if (editPackName.fulfilled.match(action)) {
            onCancel()
         }
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
         cancelButton={{ title: 'Cancel', buttonProps: { onClick: onCancel, disabled: status === 'pending' } }}
         confirmButton={
            {
               title: 'Save',
               buttonProps: { onClick: setEditedPack, disabled: status === 'pending' || !!errorMessage }
            }
         }
         isLoading={status === 'pending'}
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
            <Checkbox onChange={onChangeCheckbox} id='private' className={style.control__checkbox} checked={checked} />
            <label className={`${style.control__label}${checked ? ` ${style.checked}` : ''}`} htmlFor="private">Private pack</label>
         </div>
      </BasicModal>
   )
}
type AddNewPackModalPropsType = {
   status: StatusType
   isOpen: boolean
   onClosehandler: () => void
   packName: string
   onChangeHandler: (value: string) => void
   id: string
}