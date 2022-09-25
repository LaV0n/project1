import { Button, TextField } from "@mui/material"
import { useAppDispatch } from "../../../app/store"
import { addNewPack } from "../packsReducer"
import { useState } from 'react';
export const AddNewPack = () => {
   const dispatch = useAppDispatch()
   const [isOpen, setOpen] = useState(false)
   const [value, setValue] = useState('')
   const addNewPackHandler = () => {
      dispatch(addNewPack({ name: value }))
   }
   return (
      <div>
         {
            !isOpen ? <Button color="primary" variant="contained" onClick={() => { setOpen(open => !open) }}>Add new pack</Button> :
               <div>
                  <Button onClick={() => { setOpen(false) }}>X</Button>
                  <TextField value={value} onChange={(e) => { setValue(e.currentTarget.value) }} />
                  <Button color="primary" variant="contained" onClick={addNewPackHandler}>Add</Button>
               </div>
         }
      </div>
   )
}