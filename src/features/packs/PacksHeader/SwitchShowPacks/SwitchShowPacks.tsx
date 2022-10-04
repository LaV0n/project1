import { Button } from "@mui/material"
import { useSearchParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../app/store"
import { auth, packsParams } from "../../../../common/selectors/selectors"
import { setUserPacksId } from "../../packsReducer"
import style from "./switchShowPacks.module.scss"
import "./switchShowPacks.scss"
export const SwitchShowPacks = () => {
   const dispatch = useAppDispatch()
   const authUserId = useAppSelector(auth).data._id
   const { user_id } = useAppSelector(packsParams)
   const isMyPacks = user_id === authUserId
   const [searchParams, setSearchParams] = useSearchParams()
   const onMyPacks = () => {
      setSearchParams({ userPack: authUserId })
      dispatch(setUserPacksId(authUserId))
   }
   const onAllPacks = () => {
      dispatch(setUserPacksId(null))
      setSearchParams({ userPack: 'all' })
   }
   return (
      <div className={`${style.switcher} packs-switcher`}>
         <div className={style.switcher__title}>Show packs cards</div>
         <div className={style.switcher__buttons}>
            <Button className={isMyPacks ? 'active' : ''} onClick={onMyPacks} color="primary" variant={isMyPacks ? "contained" : "text"}>My</Button>
            <Button className={!isMyPacks ? 'active' : ''} onClick={onAllPacks} color="primary" variant={!isMyPacks ? "contained" : "text"}>All</Button>
         </div>
      </div>
   )
}