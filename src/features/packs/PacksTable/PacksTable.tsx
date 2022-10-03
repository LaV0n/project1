import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC, ChangeEvent } from 'react';
import { PackType } from '../../../api/packs-api';
import { dateFormat } from '../../../common/utils/dateFormat';
import { useAppDispatch, useAppSelector } from './../../../app/store';
import style from './packsTable.module.scss';
import { deletePack } from '../packsReducer';
import { editPackName } from './../packsReducer';
import { StatusType } from '../../../common/types';
import { ActionTableCell } from './ActionTableCell/ActionTableCell';
import { useNavigate } from 'react-router-dom';
import { appPath } from '../../../common/path/appPath';
import { useState } from 'react';
import { PacksTableHead } from './PacksTableHead/PacksTableHead';
import { DeletePackModal } from '../PackModals/DeletePackModal/DeletePackModal';
import { EditPackModal } from './../PackModals/EditPackModal/EditPackModal';
export const PacksTable: FC<PacksTablePropsType> = ({ packs, status }) => {
   const authUserID = useAppSelector(state => state.auth.data._id)
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const [selectedPack, setSelectedPack] = useState<SelectedPackType>({ packName: '', id: '' })
   //delete pack
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
   const openDeleteModalHandler = (data: SelectedPackType) => {
      setSelectedPack(data)
      setIsOpenDeleteModal(true)
   }
   const onDeletePack = async () => {
      const action = await dispatch(deletePack(selectedPack.id))
      if (deletePack.fulfilled.match(action)) {
         setIsOpenDeleteModal(false)
      }
      setSelectedPack({ packName: '', id: '' })
   }
   //edit pack name
   const [isOpenEditModal, setIsOpenEditModal] = useState(false)
   const onChangePackName = (value: string) => { setSelectedPack(data => ({ ...data, packName: value })) }
   const openEditModalHandler = (data: SelectedPackType) => {
      setSelectedPack(data)
      setIsOpenEditModal(true)
   }
   const navigateToCards = (id: string) => { navigate(`${appPath.CARDSDEFAULT}${id}`) }
   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} size="small" >
            <PacksTableHead />
            <TableBody>
               {packs.map((pack) => (
                  <TableRow key={pack._id} sx={{ 'height:48px ,&:last-child td, &:last-child th': { border: 0 } }} style={{ height: '48px' }} >
                     <TableCell onClick={() => { navigateToCards(pack._id) }} className={style.pack_name} component="th" scope="row">
                        {pack.name}
                     </TableCell>
                     <TableCell align="center">{pack.cardsCount}</TableCell>
                     <TableCell align="center">{dateFormat(pack.updated)}</TableCell>
                     <TableCell className={style.pack_created} align="center">{pack.user_name}</TableCell>
                     <ActionTableCell
                        openDeleteModal={() => { openDeleteModalHandler({ packName: pack.name, id: pack._id }) }}
                        openEditModal={() => { openEditModalHandler({ packName: pack.name, id: pack._id }) }}
                        packUserID={pack.user_id}
                        authUserID={authUserID}
                     />
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <DeletePackModal
            status={status}
            packName={selectedPack.packName}
            isOpen={isOpenDeleteModal}
            onClose={() => { setIsOpenDeleteModal(false) }}
            onDeletePack={onDeletePack}
         />
         <EditPackModal
            status={status}
            packName={selectedPack.packName}
            onClosehandler={() => { setIsOpenEditModal(false) }}
            onChangeHandler={onChangePackName}
            isOpen={isOpenEditModal}
            id={selectedPack.id}
         />
      </TableContainer>
   );
}
type PacksTablePropsType = {
   status: StatusType
   packs: PackType[]
}
type SelectedPackType = {
   packName: string
   id: string
}
