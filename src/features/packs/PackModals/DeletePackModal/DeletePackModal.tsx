import { BasicModal } from "../../../../components/BasicModal/BasicModal"
import style from './deletePackModal.module.scss'
import { FC } from 'react';
import { validateImage } from "../../../../common/utils/validator";
export const DeletePackModal: FC<DeletePackModalPropsType> = ({ packName, isOpen, onClose, onDeletePack, isLoading, cover }) => {
   return (
      <BasicModal
         className={style.deletePack}
         open={isOpen}
         title='Delete Pack'
         onClose={onClose}
         cancelButton={{ title: 'Cancel', buttonProps: { onClick: onClose, disabled: isLoading } }}
         confirmButton={{ title: 'Delete', buttonProps: { onClick: onDeletePack, disabled: isLoading } }}
         isLoading={isLoading}
      >
         <div className={style.cover}>
            {cover && <img src={validateImage(cover)} alt="" />}
         </div>
         <div className={style.text}>
            Do you really want to remove <span className={style.pack_name}>{packName}?</span>
            <div>All cards will be deleted.</div>
         </div>
      </BasicModal>
   )
}
type DeletePackModalPropsType = {
   isLoading: boolean
   packName: string
   isOpen: boolean
   onClose: () => void
   onDeletePack: () => void
   cover: string | null
}