import { Button, ButtonProps, Modal } from "@mui/material";
import { FC, ReactNode } from "react"
import { ReactComponent as Cross } from '../../assets/icons/cross.svg'
import { LoaderFullSize } from "../LoaderFullSize/LoaderFullSize";
import style from './basicModal.module.scss'
export const BasicModal: FC<BasicModalPropsType> = (
   { children, cancelButton, confirmButton, title, open, className, onClose, isLoading }
) => {
   return (
      <Modal
         open={open}
         onClose={onClose}
      >
         <div className={`${style.modal} ${className}`}>
            <div className={style.modal__header}>
               <h3 className={style.modal__title}>{title}</h3>
               <button onClick={onClose} className={style.modal__close}><Cross /></button>
            </div>
            <div className={style.modal__body}>
               {children}
            </div>
            <div className={style.modal__footer}>
               {
                  cancelButton &&
                  <Button className={style.cancel_button} variant="outlined" {...cancelButton.buttonProps}>
                     {cancelButton.title}
                  </Button>
               }
               {
                  confirmButton &&
                  <Button className={style.confirm_button} variant="contained" {...confirmButton.buttonProps}>
                     {confirmButton.title}
                  </Button>
               }
            </div>
            {isLoading && <LoaderFullSize />}
         </div>
      </Modal>
   );
}
type BasicModalPropsType = {
   className: string
   open: boolean
   title: string
   children: ReactNode
   cancelButton?: { title: string, buttonProps: ButtonProps }
   confirmButton?: { title: string, buttonProps: ButtonProps }
   onClose: () => void
   isLoading?: boolean
}