import { BasicModal } from "../../BasicModal/BasicModal"
import style from './deletePackModal.module.scss'
import { FC } from 'react';
import { StatusType } from "../../../../common/types";
export const DeletePackModal: FC<DeletePackModalPropsType> = ({ packName, isOpen, onClose, onDeletePack, status }) => {
   return (
      <BasicModal
         className={style.deletePack}
         open={isOpen}
         title='Delete Pack'
         onClose={onClose}
         cancelButton={{ title: 'Cancel', buttonProps: { onClick: onClose, disabled: status === 'pending' } }}
         confirmButton={{ title: 'Delete', buttonProps: { onClick: onDeletePack, disabled: status === 'pending' } }}
         isLoading={status === 'pending'}
      >
         <div className={style.text}>
            Do you really want to remove <span className={style.pack_name}>{packName}?</span>
            <div>All cards will be deleted.</div>
         </div>
      </BasicModal>
   )
}
type DeletePackModalPropsType = {
   packName: string
   isOpen: boolean
   onClose: () => void
   onDeletePack: () => void
   status: StatusType
}