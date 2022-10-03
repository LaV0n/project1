import { TableBody, TableCell, TableRow } from "@mui/material";
import { RatingStars } from "../../../../components/RatingStars/RatingStars";
import styles from "../cardsTable.module.scss";
import editIcon from "../../../../assets/icons/packs/edit.svg";
import deleteIcon from "../../../../assets/icons/packs/trash.svg";
import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { deleteCardTC, editCardTC } from "../../cardsReducer";
import { DeleteCardModal } from "../../CardsModals/DeleteCardModal/DeleteCardModal";

type TableCardBodyType = {
   isOwner: boolean
}
type SelectedCardType = { cardId: string, packId: string, cardQuestion: string, cardAnswer: string }
const formatDate = (dateCard: string) => {
   const date = new Date(dateCard)
   const yyyy = date.getFullYear();
   let mm: any = date.getMonth() + 1;
   let dd: any = date.getDate();
   if (dd < 10) {
      dd = '0' + dd
   }
   if (mm < 10) {
      mm = '0' + mm
   }
   return `${dd}.${mm}.${yyyy}`
}


export const TableCardBody: FC<TableCardBodyType> = ({ isOwner }) => {

   const dispatch = useAppDispatch()
   const cards = useAppSelector(state => state.cards.data.cards)
   const status = useAppSelector(state => state.cards.status)
   //actions 
   const [selectedCard, setSelectedCard] = useState<SelectedCardType>({ cardId: '', packId: '', cardAnswer: '', cardQuestion: '' })
   //delete card
   const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
   const openDeleteModal = (data: SelectedCardType) => {
      setSelectedCard(data)
      setIsOpenDeleteModal(true)
   }
   const deleteCardHandler = async () => {
      const action = await dispatch(deleteCardTC(selectedCard.cardId, selectedCard.packId))
      if (action) { setIsOpenDeleteModal(false) }
   }
   //edit card
   const editCardHandler = (cardId: string, packId: string) => {
      //   dispatch(editCardTC(cardId, packId))
   }
   return (
      <TableBody>
         {cards.length === 0
            ? <TableRow>
               <TableCell style={{
                  paddingTop: '20px',
                  height: '50px',
                  display: "flex",
                  justifyContent: 'center',
                  marginLeft: "400px"
               }}>no cards</TableCell>
            </TableRow>
            : cards.map((card) => (
               <TableRow
                  key={card._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'white' }}
               >
                  <TableCell component="th" scope="row">
                     {card.question}
                  </TableCell>
                  <TableCell align="right">{card.answer}</TableCell>
                  <TableCell align="right">
                     {formatDate(card.updated)}
                  </TableCell>
                  <TableCell align="right">
                     <RatingStars stars={card.grade} />
                  </TableCell>
                  {isOwner &&
                     <TableCell align="right" style={{ width: '60px' }}>
                        <div className={styles.toolsIcon}>
                           <button onClick={() => editCardHandler(card._id, card.cardsPack_id)}
                              disabled={status} style={{ backgroundColor: 'white' }}
                           >
                              <img src={editIcon} alt={'0'} className={styles.Icon} />
                           </button>
                           <button
                              onClick={() => {
                                 openDeleteModal(
                                    { cardId: card._id, packId: card.cardsPack_id, cardQuestion: card.question, cardAnswer: card.answer }
                                 )
                              }}
                              disabled={status} style={{ backgroundColor: 'white' }}
                           >
                              <img src={deleteIcon} alt={'0'} className={styles.Icon} />
                           </button>
                        </div>
                     </TableCell>
                  }
               </TableRow>
            ))}
         <DeleteCardModal
            cardName={selectedCard.cardQuestion}
            isOpen={isOpenDeleteModal}
            onClose={() => { setIsOpenDeleteModal(false) }}
            onDeleteCard={deleteCardHandler}
            isLoading={status}
         />
      </TableBody>
   )
}