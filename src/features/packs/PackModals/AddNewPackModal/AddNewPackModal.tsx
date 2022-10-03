import { Checkbox, TextField } from "@mui/material"
import { ChangeEvent, FC, SyntheticEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/store"
import { packs } from "../../../../common/selectors/selectors"
import { BasicModal } from "../../../../components/BasicModal/BasicModal"
import { addNewPack } from "../../packsReducer"
import style from './addNewPackModal.module.scss'
export const AddNewPackModal: FC<AddNewPackModalPropsType> = ({ isOpen, onClosehandler }) => {
   const { status } = useAppSelector(packs)
   const dispatch = useAppDispatch()
   const [value, setValue] = useState('')
   const [errorMessage, setErrorMessage] = useState('')
   const [checked, setChecked] = useState(false)
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setErrorMessage('')
      setValue(e.currentTarget.value)
   }
   const onChangeCheckbox = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
      setChecked(checked)
   }
   const onAddNewPack = async () => {
      if (!!value.trim()) {
         const action = await dispatch(addNewPack({ name: value.trim(), private: checked }))
         if (addNewPack.fulfilled.match(action)) {
            onCancel()
         }
      } else {
         setValue('')
         setErrorMessage('enter a pack name')
      }
   }
   const onClose = () => {
      setErrorMessage('')
      onClosehandler()
   }
   const onCancel = () => {
      setValue('')
      setErrorMessage('')
      setChecked(false)
      onClosehandler()
   }
   return (
      <BasicModal
         className={style.addNewPack}
         open={isOpen}
         title='Add new pack'
         onClose={onClose}
         cancelButton={{ title: 'Cancel', buttonProps: { onClick: onCancel, disabled: status === 'pending' } }}
         confirmButton={
            {
               title: 'Save',
               buttonProps: { onClick: onAddNewPack, disabled: status === 'pending' || !!errorMessage }
            }
         }
         isLoading={status === 'pending'}
      >
         <div className={style.input}>
            <TextField
               className={style.input__value}
               error={!!errorMessage}
               color={errorMessage ? 'error' : 'info'}
               value={value} onChange={onChange}
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
   isOpen: boolean
   onClosehandler: () => void
}