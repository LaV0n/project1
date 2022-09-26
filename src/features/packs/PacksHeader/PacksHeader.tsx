import { AddNewPack } from "../AddNewPack/AddNewPack"
import { PacksFilterCount } from "../PacksCountFilter/PacksCountFilter"
import { SearchPacks } from "../SearchPacks/SearchPacks"
import { SwitchShowPacks } from "../SwitchShowPacks/SwitchShowPacks"
import style from './packsHeader.module.scss'
import { PacksResetSettings } from './../PacksResetSettings/PacksResetSettings';
import { useAppDispatch } from "../../../app/store"
import { resetParams } from "../packsReducer"
export const PacksHeader = () => {
   const dispatch = useAppDispatch()
   return (
      <div className={style.header}>
         <div className={style.header__head}>
            <h1 className={style.header__title}>Packs list</h1>
            <div><AddNewPack /></div>
         </div>
         <div className={style.header__row}>
            <SearchPacks />
            <SwitchShowPacks />
            <PacksFilterCount />
            <PacksResetSettings onClick={() => { dispatch(resetParams()) }} />
         </div>
      </div>
   )
}