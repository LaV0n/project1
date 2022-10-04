import TableCell from '@mui/material/TableCell';
import { FC } from 'react';
import teach from '../../../../assets/icons/packs/teach.svg'
import edit from '../../../../assets/icons/packs/edit.svg'
import trash from '../../../../assets/icons/packs/trash.svg'
import style from './actionTableCell.module.scss'
import { StatusType } from '../../../../common/types';
export const ActionTableCell: FC<ActionTableCellPropsType> = ({ packID, authUserID, packUserID, onDeleteClick, onEditClick, status , onLearnClick}) => {
   return (
      <TableCell align="center" className={style.action}>
         <button onClick={() => { onLearnClick(packID) }} className={style.action__button}
                 disabled={status === 'pending'}>
            <img src={teach} alt="learn pack" />
         </button>
         {
            authUserID === packUserID &&
            <>
               <button onClick={() => { onEditClick(packID) }} disabled={status === 'pending'}
                  className={style.action__button}>
                  <img src={edit} alt="edit pack" />
               </button>
               <button onClick={() => { onDeleteClick(packID) }} disabled={status === 'pending'}
                  className={style.action__button}>
                  <img src={trash} alt="delete pack" />
               </button>
            </>
         }
      </TableCell>
   )
}
type ActionTableCellPropsType = {
   status: StatusType
   packUserID: string
   packID: string
   authUserID: string
   onDeleteClick: (packID: string) => void
   onEditClick: (packID: string) => void
   onLearnClick:(packID: string) => void
}