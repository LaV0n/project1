import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackType } from '../../../api/packs-api';
import { appPath } from '../../../common/path/appPath';
import { StatusType } from '../../../common/types';
import { dateFormat } from '../../../common/utils/dateFormat';
import { DeletePackModal } from '../PackModals/DeletePackModal/DeletePackModal';
import { EditPackModal } from '../PackModals/EditPackModal/EditPackModal';
import { deletePack, editPackName } from '../packsReducer';
import { useAppDispatch, useAppSelector } from './../../../app/store';
import { auth } from './../../../common/selectors/selectors';
import { ActionTableCell } from './ActionTableCell/ActionTableCell';
import style from './packsTable.module.scss';
import { PacksTableHead } from './PacksTableHead/PacksTableHead';
export const PacksTable: FC<PacksTablePropsType> = ({ packs, status }) => {
   const authUserID = useAppSelector(auth).data._id
   const navigate = useNavigate()
   const dispatch = useAppDispatch()
   const [selectedPack, setSelectedPack] = useState<SelectedPackType>({ packName: '', id: '', deckCover: null })
   //delete pack
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
   const openDeleteModal = (data: SelectedPackType) => {
      setSelectedPack(data)
      setIsOpenDeleteModal(true)
   }
   const learnPackHandler = (id: string) => {
      navigate(appPath.LEARNINGDEFAULT + id)
   }
   const onDeletePack = async () => {
      const action = await dispatch(deletePack(selectedPack.id))
      if (deletePack.fulfilled.match(action)) {
         setIsOpenDeleteModal(false)
      }
      setSelectedPack({ packName: '', id: '', deckCover: null })
   }
   //edit pack name
   const [isOpenEditModal, setIsOpenEditModal] = useState(false)
   const openEditModal = (data: SelectedPackType) => {
      setSelectedPack(data)
      setIsOpenEditModal(true)
   }
   const onCloseEditModal = () => { setIsOpenEditModal(false) }
   const onUpdatePackHandler = (value: { [key: string]: string | null }) => { setSelectedPack(data => ({ ...data, ...value })) }
   const setEditPack = async (isPrivate: boolean) => {
      const { packName, id, deckCover } = selectedPack
      const action = await dispatch(editPackName(
         { name: packName.trim(), _id: id, private: isPrivate, deckCover }
      ))
      if (editPackName.fulfilled.match(action)) {
         onCloseEditModal()
      }
   }






   //
   const navigateToCards = (id: string) => { navigate(`${appPath.CARDSDEFAULT}${id}`) }

   const validateImage = (cover: string | null) => {
      const regexBase64 = /^data:image\/(?:gif|png|jpeg|bmp|webp|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/;
      if (cover) {
         return regexBase64.test(cover) ? cover : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBB7mlN1ig5dMMIyIH6By55HE-WueNoR4sUhwA7LiSpCYvXHSICslhLsWd-A9abLaAb3U&usqp=CAU'
      } else {
         return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBB7mlN1ig5dMMIyIH6By55HE-WueNoR4sUhwA7LiSpCYvXHSICslhLsWd-A9abLaAb3U&usqp=CAU'
      }
   }
   return (
      <TableContainer component={Paper}>
         <Table sx={{ minWidth: 650 }} size="small" >
            <PacksTableHead />
            <TableBody>
               {packs.map((pack) => (
                  <TableRow key={pack._id} sx={{ 'height:48px ,&:last-child td, &:last-child th': { border: 0 } }} style={{ height: '48px' }} >
                     <TableCell className={style.pack_cover} align="center">
                        <img onError={() => { console.log('object'); }} src={validateImage(pack.deckCover)} alt="" />
                     </TableCell>
                     <TableCell onClick={() => { navigateToCards(pack._id) }} className={style.pack_name} component="th" scope="row">
                        {pack.name}
                     </TableCell>
                     <TableCell align="center">{pack.cardsCount}</TableCell>
                     <TableCell align="center">{dateFormat(pack.updated)}</TableCell>
                     <TableCell className={style.pack_created} align="center">{pack.user_name}</TableCell>
                     <ActionTableCell
                        learnPack={() => { learnPackHandler(pack._id) }}
                        cardsCount={pack.cardsCount}
                        openDeleteModal={() => { openDeleteModal({ packName: pack.name, id: pack._id }) }}
                        openEditModal={() => { openEditModal({ packName: pack.name, id: pack._id, deckCover: pack.deckCover }) }}
                        packUserID={pack.user_id}
                        authUserID={authUserID}
                     />
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <DeletePackModal
            isLoading={status === 'pending'}
            packName={selectedPack.packName}
            isOpen={isOpenDeleteModal}
            onClose={() => { setIsOpenDeleteModal(false) }}
            onDeletePack={onDeletePack}
         />
         <EditPackModal
            cover={selectedPack.deckCover ? selectedPack.deckCover : null}
            isLoading={status === 'pending'}
            packName={selectedPack.packName}
            onClosehandler={onCloseEditModal}
            onChangeHandler={() => { }}
            onUpdatePack={onUpdatePackHandler}
            isOpen={isOpenEditModal}
            setEditedPackHandler={setEditPack}
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
   deckCover?: null | string
}
