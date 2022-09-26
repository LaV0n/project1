import TableCell from '@mui/material/TableCell';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState, FC } from 'react';
import { useAppDispatch } from '../../../../app/store';
import { setSortPacks } from '../../packsReducer';
import style from './tableCellSort.module.scss'
import { useAppSelector } from './../../../../app/store';
export const TableCellSort: FC<TableCellSortPropsType> = ({ title, align }) => {
   const dispatch = useAppDispatch()
   const sortValue = useAppSelector(state => state.packs.params.sortPacks)
   const isDown = sortValue === null || sortValue.charAt(0) === '1'
   // const isUp = sortValue.charAt(0) === '0'
   console.log(isDown);
   const [drop, setDrop] = useState<'up' | 'down'>('down')
   const onClickHandler = () => {

      dispatch(setSortPacks('1cardsCount'))
      setDrop(drop === 'down' ? 'up' : 'down')
   }
   return (
      <TableCell align={align} onClick={onClickHandler}>
         {title}
         <ArrowDropDownIcon className={`${style.arrow} ${drop === 'up' ? `${style.up}` : `${style.down}`}`} />
      </TableCell>
   )
}
type TableCellSortPropsType = {
   title: string
   align: "left" | "center" | "right" | "justify" | "inherit" | undefined
}