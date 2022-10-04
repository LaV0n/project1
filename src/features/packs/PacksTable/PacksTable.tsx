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
import style from './packsTable.module.scss';
import { deletePack, setSortPacks } from '../packsReducer';
import { editPackName } from './../packsReducer';
import { SortByType, SortFrom, TableCellSort } from './TableCellSort/TableCellSort';
import { SortType, StatusType } from '../../../common/types';
import { ActionTableCell } from './ActionTableCell/ActionTableCell';
import { useNavigate } from 'react-router-dom';
import { appPath } from '../../../common/path/appPath';
export const PacksTable: FC<PacksTablePropsType> = ({ packs, sortPacksValue, status }) => {
   const authUserID = useAppSelector(state => state.auth.data._id)
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const deletePackHandler = (id: string) => {
      dispatch(deletePack(id))
   }
   const editPackNameHandler = (_id: string) => {
      dispatch(editPackName({ _id, name: 'updated' }))
   }
   const learnPackHandler=(id:string) => {
      navigate(appPath.LEARNINGDEFAULT+id)
   }
   const navigateToCards = (id: string) => {
      navigate(`${appPath.CARDSDEFAULT}${id}`)
   }
   const sortPacks = (sortBy: SortByType) => {
      if (sortPacksValue === null || sortPacksValue.slice(1, sortPacksValue.length) !== sortBy) {
         dispatch(setSortPacks(`${SortFrom.largest}${sortBy}`))
      } else {
         const sortValue: SortType = sortPacksValue === `${SortFrom.smallest}${sortBy}` ? `${SortFrom.largest}${sortBy}` : `${SortFrom.smallest}${sortBy}`
         dispatch(setSortPacks(sortValue))
      }
   }
   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} size="small" >
            <TableHead>
               <TableRow style={{ height: '48px' }}>
                  <TableCell className={style.head_name}>Name</TableCell>
                  <TableCellSort onClick={() => { sortPacks('cardsCount') }} showArrow={true} currentSort={sortPacksValue} sortBy={'cardsCount'} title='Cards' align="center" />
                  <TableCellSort onClick={() => { sortPacks('updated') }} showArrow={true} currentSort={sortPacksValue} sortBy={'updated'} title='Last Updated' align="center" />
                  <TableCellSort onClick={() => { sortPacks('created') }} title='Created by' align="center" />
                  <TableCell align="center">Actions</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {packs.map((pack) => (
                  <TableRow key={pack._id} sx={{ 'height:48px ,&:last-child td, &:last-child th': { border: 0 } }} style={{ height: '48px' }} >
                     <TableCell onClick={() => { navigateToCards(pack._id) }} className={style.pack_name} component="th" scope="row">
                        {pack.name}
                     </TableCell>
                     <TableCell align="center">{pack.cardsCount}</TableCell>
                     <TableCell align="center">{dateFormat(pack.updated)}</TableCell>
                     <TableCell className={style.pack_created} align="center">{pack.user_name}</TableCell>
                     <ActionTableCell status={status} onDeleteClick={deletePackHandler}
                                      onEditClick={editPackNameHandler}
                                      onLearnClick={learnPackHandler}
                                      packID={pack._id} packUserID={pack.user_id} authUserID={authUserID} />
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </TableContainer>
   );
}
type PacksTablePropsType = {
   status: StatusType
   packs: PackType[]
   sortPacksValue: SortType
}

