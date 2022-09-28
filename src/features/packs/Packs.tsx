import { PacksTable } from "./PacksTable/PacksTable"
import { useEffect } from 'react';
import { useAppDispatch } from "../../app/store";
import { getPacks, initSettings, setNotice, setPage, setPageCount } from "./packsReducer";
import { useAppSelector } from './../../app/store';
import { CustomizedSnackbars } from "../../components/CustomizedSnackbars/CustomizedSnackbars";
import style from './packs.module.scss'
import { LoaderFullSize } from "../../components/LoaderFullSize/LoaderFullSize";
import { PacksHeader } from "./PacksHeader/PacksHeader";
import { PacksFooter } from "./PacksFooter/PacksFooter";
import { Navigate, useSearchParams } from 'react-router-dom';
import { appPath } from "../../common/path/appPath";
export const Packs = () => {

   const dispatch = useAppDispatch()
   const { isAuth } = useAppSelector(state => state.auth)
   const [searchParams, setSearchParams] = useSearchParams()
   const packsState = useAppSelector(state => state.packs)
   const onCloseSnackbar = () => { dispatch(setNotice('')) }
   const onChangePage = (page: number) => { dispatch(setPage(page)) }
   const onChangePageCount = (pageCount: number) => { dispatch(setPageCount(pageCount)) }
   const params: ParamsType = {};
   searchParams.forEach((value, key) => {
      params[key] = value;
   });
   useEffect(() => {
      if (packsState.params.user_id && !params.userPack) {
         setSearchParams({ userPack: packsState.params.user_id })
      }
      if (!packsState.isSettings) {
         if (params.userPack === 'all') {
            setSearchParams({ userPack: 'all' })
            dispatch(initSettings({ user_id: null }))
         } else {
            dispatch(initSettings({ ...params, user_id: params.userPack }))
         }
         return
      }
      dispatch(getPacks())
   }, [dispatch, packsState.data.page, packsState.data.pageCount, packsState.params, packsState.isSettings])
   if (!isAuth) { return <Navigate to={appPath.LOGIN} /> }
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
type ParamsType = {
   [key: string]: string
}