import { Button } from "@mui/material"
import { useState } from 'react';
import { AddNewPackModal } from "../../PackModals/AddNewPackModal/AddNewPackModal";
export const AddNewPack = () => {
   const [isOpen, setIsOpen] = useState(false)
   const onClosehandler = () => {
      setIsOpen(false)
   }
   return (
      <>
         <Button style={{ borderRadius: '30px', minWidth: '175px' }} color="primary" variant="contained" onClick={() => { setIsOpen(true) }}>Add new pack</Button>
         <AddNewPackModal onClosehandler={onClosehandler} isOpen={isOpen} />
      </>
   )
}