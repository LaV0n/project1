import { Checkbox, TextField } from "@mui/material"
import { ChangeEvent, FC, SyntheticEvent, useState } from "react"
import { convertImageToBase64 } from "../../../../common/utils/convertImageToBase64"
import { BasicModal } from "../../../../components/BasicModal/BasicModal"
import { PacksModalCover } from "../PacksModalCover/PacksModalCover"
import style from './editPackModal.module.scss'
export const EditPackModal: FC<EditPackModal> =
   ({ isOpen, onClosehandler, isLoading, onChangeHandler, setEditedPackHandler, packName, cover, onUpdatePack }) => {
      const [errorCover, setErrorCover] = useState<string | null>(null)
      const [errorMessage, setErrorMessage] = useState('')
      const [isPrivate, setIsPrivate] = useState(false)
      const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
         setErrorMessage('')
         onUpdatePack && onUpdatePack({ packName: e.currentTarget.value })
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
            setEditedPackHandler(isPrivate)
            setIsPrivate(false)
         } else {
            onChangeHandler('')
            setErrorMessage('enter a pack name')
         }
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
      const coverErrorHandler = (error: string) => {
         setErrorCover(error)
      }
      const coverSuccessHandler = (deckCover: string) => {
         onUpdatePack && onUpdatePack({ deckCover });
         setErrorCover(null)
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
            <PacksModalCover cover={cover} error={errorCover} onDeleteClick={() => { }} uploadHandler={uploadHandler} />
            <div className={style.input}>
               <TextField
                  className={style.input__value}
                  error={!!errorMessage}
                  color={errorMessage ? 'error' : 'info'}
                  value={packName}
                  onChange={onChangePackName}
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
   setEditedPackHandler: (isPrivate: boolean) => void
   cover: string | null
   onUpdatePack?: (value: { [key: string]: string | null }) => void
}