import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC } from 'react';
import { PackType } from '../../../api/packs-api';
import { dateFormat } from '../../../common/utils/dateFormat';
import { useAppDispatch, useAppSelector } from './../../../app/store';
import teach from '../../../assets/icons/packs/teach.svg'
import edit from '../../../assets/icons/packs/edit.svg'
import trash from '../../../assets/icons/packs/trash.svg'
import style from './packsTable.module.scss';
import { deletePack } from '../packsReducer';
import { editPackName } from './../packsReducer';
import { TableCellSort } from './TableCellSort/TableCellSort';
export const PacksTable: FC<PacksTablePropsType> = ({ packs }) => {
   const authUserID = useAppSelector(state => state.auth.data._id)
   const dispatch = useAppDispatch()
   const deletePackHandler = (id: string) => {
      dispatch(deletePack(id))
   }
   const editPackNameHandler = (_id: string) => {
      dispatch(editPackName({ _id, name: 'updated' }))
   }
   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} size="small" >
            <TableHead>
               <TableRow style={{ height: '48px' }}>
                  <TableCell>Name</TableCell>
                  <TableCellSort title='Cards' align="center" />
                  <TableCellSort title='Last Updated' align="center" />
                  <TableCellSort title='Created by' align="center" />
                  <TableCell align="center">
                     Actions
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {packs.map((pack) => (
                  <TableRow
                     key={pack._id}
                     sx={{ 'height:48px ,&:last-child td, &:last-child th': { border: 0 } }}
                     style={{ height: '48px' }}
                  >
                     <TableCell component="th" scope="row">
                        {pack.name}
                     </TableCell>
                     <TableCell align="center">
                        {pack.cardsCount}
                     </TableCell>
                     <TableCell align="center">
                        {dateFormat(pack.updated)}
                     </TableCell>
                     <TableCell align="center">
                        {pack.user_name}
                     </TableCell>
                     <TableCell align="center">
                        <button className={style.action__button}><img src={teach} alt="learn pack" /></button>
                        {
                           authUserID === pack.user_id &&
                           <>
                              <button onClick={() => { editPackNameHandler(pack._id) }}
                                 className={style.action__button}><img src={edit} alt="edit pack" /></button>
                              <button onClick={() => { deletePackHandler(pack._id) }}
                                 className={style.action__button}><img src={trash} alt="delete pack" /></button>
                           </>
                        }
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
type PacksTablePropsType = {
   packs: PackType[]
}

