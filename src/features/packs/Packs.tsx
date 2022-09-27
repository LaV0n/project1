import { PacksTable } from "./PacksTable/PacksTable"
import { useEffect } from 'react';
import { useAppDispatch } from "../../app/store";
import { getPacks, setNotice, setPage, setPageCount } from "./packsReducer";
import { useAppSelector } from './../../app/store';
import { CustomizedSnackbars } from "../../components/CustomizedSnackbars/CustomizedSnackbars";
import style from './packs.module.scss'
import { LoaderFullSize } from "../../components/LoaderFullSize/LoaderFullSize";
import { PacksHeader } from "./PacksHeader/PacksHeader";
import { PacksFooter } from "./PacksFooter/PacksFooter";
export const Packs = () => {
   const dispatch = useAppDispatch()
   const packsState = useAppSelector(state => state.packs)
   const onCloseSnackbar = () => { dispatch(setNotice('')) }
   const onChangePage = (page: number) => { dispatch(setPage(page)) }
   const onChangePageCount = (pageCount: number) => { dispatch(setPageCount(pageCount)) }
   useEffect(() => {
      dispatch(getPacks())
   }, [dispatch, packsState.data.page, packsState.data.pageCount, packsState.params])
   return (
      <div className={style.packs}>
         {packsState.isInitialized &&
            <>
               <PacksHeader />
               <PacksTable status={packsState.status} packs={packsState.data.cardPacks} sortPacksValue={packsState.params.sortPacks} />
               <PacksFooter
                  onChangePage={onChangePage}
                  onChangePageCount={onChangePageCount}
                  page={packsState.data.page}
                  cardPacksTotalCount={packsState.data.cardPacksTotalCount}
                  pageCount={packsState.data.pageCount} />
            </>
         }
         {packsState.status === 'pending' && <LoaderFullSize />}
         <CustomizedSnackbars message={packsState.notice} isOpen={!!packsState.notice} isError={true} onClose={onCloseSnackbar} />
      </div>
   )
}