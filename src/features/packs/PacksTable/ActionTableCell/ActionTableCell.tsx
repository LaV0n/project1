import TableCell from '@mui/material/TableCell';
import { FC } from 'react';
import teach from '../../../../assets/icons/packs/teach.svg'
import edit from '../../../../assets/icons/packs/edit.svg'
import trash from '../../../../assets/icons/packs/trash.svg'
import style from './actionTableCell.module.scss'
export const ActionTableCell: FC<ActionTableCellPropsType> = ({ packID, authUserID, packUserID, onDeleteClick, onEditClick }) => {
   return (
      <TableCell align="center" className={style.action}>
         <button className={style.action__button}><img src={teach} alt="learn pack" /></button>
         {
            authUserID === packUserID &&
            <>
               <button onClick={() => { onEditClick(packID) }}
                  className={style.action__button}><img src={edit} alt="edit pack" /></button>
               <button onClick={() => { onDeleteClick(packID) }}
                  className={style.action__button}><img src={trash} alt="delete pack" /></button>
            </>
         }
      </TableCell>
   )
}
type ActionTableCellPropsType = {
   packUserID: string
   packID: string
   authUserID: string
   onDeleteClick: (packID: string) => void
   onEditClick: (packID: string) => void
}