import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { setFilterValues } from '../packsReducer';
import style from "./packsCountFilter.module.scss"
import "./thumb.scss"
export const PacksFilterCount = () => {
   const dispatch = useAppDispatch()
   const { minCardsCount, maxCardsCount } = useAppSelector(state => state.packs.data)
   const { min, max } = useAppSelector(state => state.packs.params)
   const minValue = min !== null ? min : minCardsCount
   const maxValue = max !== null ? max : maxCardsCount
   const [values, setValues] = useState({ min: minValue, max: maxValue })
   useEffect(() => {
      setValues({ min: minValue, max: maxValue })
   }, [minValue, maxValue])
   const onChangeHandler = (event: Event, value: number | number[]) => {
      const valuesAsArr = value as number[]
      if (valuesAsArr[1] < 1) return
      setValues(values => values = { min: valuesAsArr[0], max: valuesAsArr[1] })
   }
   return (
      <div className={`${style.filter} packs-filter`}>
         <div className={style.filter__title}>Number of cards</div>
         <div className={style.filter__row}>
            {maxCardsCount > 1 &&
               <> <div className={style.filter__display_value}>{values.min}</div>
                  <Slider
                     value={[values.min, values.max]}
                     onChange={onChangeHandler}
                     min={minCardsCount}
                     max={maxCardsCount}
                     onChangeCommitted={() => { dispatch(setFilterValues(values)) }}
                  />
               </>}
            <div className={style.filter__display_value}>{values.max}</div>
         </div>
      </div>
   )
}