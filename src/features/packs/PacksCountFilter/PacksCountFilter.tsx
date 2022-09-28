import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setFilterValues } from '../packsReducer';
import style from "./packsCountFilter.module.scss"
import "./thumb.scss"
export const PacksFilterCount = () => {
   const dispatch = useAppDispatch()
   const { minCardsCount, maxCardsCount } = useAppSelector(state => state.packs.data)
   const [values, setValues] = useState({ min: minCardsCount, max: maxCardsCount })
   useEffect(() => {
      setValues({ min: minCardsCount, max: maxCardsCount })
   }, [minCardsCount, maxCardsCount])
   const onChangeHandler = (event: Event, value: number | number[]) => {
      const valuesAsArr = value as number[]
      if (valuesAsArr[1] < 1) return
      setValues({ min: valuesAsArr[0], max: valuesAsArr[1] })
   }
   const setFilterChanges = () => { dispatch(setFilterValues(values)) }
   return (
      <div className={`${style.filter} packs-filter`}>
         <div className={style.filter__title}>Number of cards</div>
         <div className={style.filter__row}>
            <div className={style.filter__display_value}>{values.min}</div>
            <Slider
               value={[minCardsCount === maxCardsCount ? 0 : values.min, values.max]}
               onChange={onChangeHandler}
               min={minCardsCount === maxCardsCount ? 0 : minCardsCount}
               max={maxCardsCount}
               onChangeCommitted={setFilterChanges}
               disabled={minCardsCount === maxCardsCount}
            />

            <div className={style.filter__display_value}>{values.max}</div>
         </div>
      </div>
   )
}