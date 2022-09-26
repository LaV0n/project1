import { PacksTable } from "./PacksTable/PacksTable"
import { useEffect } from 'react';
import { useAppDispatch } from "../../app/store";
import { getPacks, setNotice } from "./packsReducer";
import { useAppSelector } from './../../app/store';
import { CustomizedSnackbars } from "../../components/CustomizedSnackbars/CustomizedSnackbars";
import style from './packs.module.scss'
import { LoaderFullSize } from "../../components/LoaderFullSize/LoaderFullSize";
import { PacksHeader } from "./PacksHeader/PacksHeader";
export const Packs = () => {
   const dispatch = useAppDispatch()
   const packsState = useAppSelector(state => state.packs)
   const onCloseSnackbar = () => { dispatch(setNotice('')) }
   useEffect(() => {
      dispatch(getPacks())
   }, [dispatch, packsState.data.page, packsState.data.pageCount, packsState.params])
   return (
      <div className={style.packs}>
         {packsState.isInitialized &&
            <>
               <PacksHeader />
               <PacksTable packs={packsState.data.cardPacks} sortPacksValue={packsState.params.sortPacks} />
            </>
         }
         {packsState.status === 'pending' && <LoaderFullSize />}
         <CustomizedSnackbars message={packsState.notice} isOpen={!!packsState.notice} isError={true} onClose={onCloseSnackbar} />
      </div>
   )
}