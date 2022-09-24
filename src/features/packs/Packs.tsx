import { PacksTable } from "./PacksTable/PacksTable"
import { useEffect, useState } from 'react';
import { useAppDispatch } from "../../app/store";
import { addNewPack, getPacks } from "./packsReducer";
import { useAppSelector } from './../../app/store';
import { CustomizedSnackbars } from "../../components/CustomizedSnackbars/CustomizedSnackbars";
import style from './packs.module.scss'
import { Button, TextField } from "@mui/material";
export const Packs = () => {
   const dispatch = useAppDispatch()
   const packsState = useAppSelector(state => state.packs)
   useEffect(() => {
      dispatch(getPacks())
   }, [])
   if (!packsState.isInitialized) {
      return <></>
   }
   return (
      <div className={style.packs}>
         <NewPack />
         <PacksTable packs={packsState.data.cardPacks} />
         <CustomizedSnackbars message="" isOpen={true} isError={false} onClose={() => { }} />
      </div>
   )
}

const NewPack = () => {
   const dispatch = useAppDispatch()
   const [isOpen, setOpen] = useState(false)
   const [value, setValue] = useState('')
   const addNewPackHandler = () => {
      dispatch(addNewPack({ name: value }))
   }
   return (
      <div>
         {
            !isOpen ? <Button onClick={() => { setOpen(open => !open) }}>Add new pack</Button> :
               <div>
                  <Button onClick={() => { setOpen(false) }}>X</Button>
                  <TextField value={value} onChange={(e) => { setValue(e.currentTarget.value) }} />
                  <Button onClick={addNewPackHandler}>Add</Button>
               </div>
         }
      </div>
   )
}