import { Checkbox, TextField } from "@mui/material"
import { ChangeEvent, FC, SyntheticEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/store"
import { packs } from "../../../../common/selectors/selectors"
import { convertImageToBase64 } from "../../../../common/utils/convertImageToBase64"
import { BasicModal } from "../../../../components/BasicModal/BasicModal"
import { addNewPack } from "../../packsReducer"
import style from './addNewPackModal.module.scss'
import { PacksModalCover } from "../PacksModalCover/PacksModalCover"
export const AddNewPackModal: FC<AddNewPackModalPropsType> = ({ isOpen, onClosehandler }) => {
   const { status } = useAppSelector(packs)
   const dispatch = useAppDispatch()
   const [value, setValue] = useState('')
   const [errorMessage, setErrorMessage] = useState('')
   const [isChecked, setIsChecked] = useState(false)
   const [cover, setCover] = useState<null | string>(null)
   const [errorCover, setErrorCover] = useState<string | null>(null)
   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setErrorMessage('')
      setValue(e.currentTarget.value)
   }
   const onChangeCheckbox = (_: SyntheticEvent<Element, Event>, checked: boolean) => {
      setIsChecked(checked)
   }
   const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files
      if (files && files.length) {
         convertImageToBase64(files[0],
            {
               errorHandler: coverErrorHandler,
               successHandler: coverSuccessHandler
            }
         )
      }
   }
   const onDeleteCoverClickHandler = () => {
      setErrorCover(null)
      setCover(null)
   }
   const coverErrorHandler = (error: string) => {
      setErrorCover(error)
   }
   const coverSuccessHandler = (image: string) => {
      setCover(image);
      setErrorCover(null)
   }
   const onAddNewPack = async () => {
      if (!!value.trim()) {
         const action = await dispatch(addNewPack({ name: value.trim(), private: isChecked, deckCover: cover }))
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
      setIsChecked(false)
      onClosehandler()
      setErrorCover(null)
      setCover(null)
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
         <PacksModalCover uploadHandler={uploadHandler} onDeleteClick={onDeleteCoverClickHandler} cover={cover} error={errorCover} />
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
            <Checkbox onChange={onChangeCheckbox} id='private' className={style.control__checkbox} checked={isChecked} />
            <label className={`${style.control__label}${isChecked ? ` ${style.checked}` : ''}`} htmlFor="private">Private pack</label>
         </div>
      </BasicModal>
   )
}
type AddNewPackModalPropsType = {
   isOpen: boolean
   onClosehandler: () => void
}