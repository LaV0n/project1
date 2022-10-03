import { useAppDispatch, useAppSelector } from '../../../../app/store';
import { useState, ChangeEvent, useEffect } from 'react';
import { setSearchPacksName } from '../../packsReducer';
import { ReactComponent as SearchIcon } from "../../../../assets/icons/packs/searchIcon.svg"
import style from './searchPacks.module.scss'
export const SearchPacks = () => {
   const { searchPacksName } = useAppSelector(state => state.packs.params)
   const [value, setValue] = useState<string>('')
   const [isSearching, setIsSearching] = useState(false)
   const dispatch = useAppDispatch()
   useEffect(() => {
      if (!isSearching) return
      const id = setTimeout(() => {
         search(value)
      }, 1000)
      return () => { clearTimeout(id) }
   }, [value, isSearching])
   useEffect(() => {
      setValue(searchPacksName ? searchPacksName : '')
   }, [searchPacksName])
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value
      setValue(value)
      setIsSearching(true)
   }
   const search = (value: string) => {
      if (!value.trim()) {
         dispatch(setSearchPacksName(null))
         setValue('')
         setIsSearching(false)
         return
      } else {
         dispatch(setSearchPacksName(value.trim()))
         setIsSearching(false)
      }

   }
   return (
      <div className={style.search}>
         <div className={style.search__title}>Search</div>
         <div className={style.search__container}>
            <SearchIcon className={style.search__icon} />
            <input className={style.search__value} type="text" value={value} onChange={onChangeHandler} placeholder='Provide your text' />
         </div>
      </div>
   )
}