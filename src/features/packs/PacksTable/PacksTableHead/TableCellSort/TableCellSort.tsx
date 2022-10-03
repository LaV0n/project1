import TableCell from '@mui/material/TableCell';
import { FC } from 'react';
import style from './tableCellSort.module.scss'
import { ReactComponent as Drop } from '../../../../../assets/icons/packs/drop.svg'
import { SortType } from '../../../../../common/types';
export enum SortFrom {
   smallest = '1',
   largest = '0'
}
export const TableCellSort: FC<TableCellSortPropsType> = ({ title, align, onClick, showArrow, sortBy, currentSort = null }) => {
   const dropUp = currentSort === null || sortBy !== currentSort.slice(1, currentSort.length) || currentSort === `${SortFrom.smallest}${sortBy}`
   const onClickHandler = () => {
      onClick()
   }
   return (
      <TableCell align={align} onClick={onClickHandler} >
         <span className={style.title}>
            {title}
            {showArrow && <Drop className={`${style.arrow}${dropUp ? '' : ` ${style.down}`}`} />}
         </span>
      </TableCell>
   )
}
type TableCellSortPropsType = {
   title: string
   align: "left" | "center" | "right" | "justify" | "inherit" | undefined
   onClick: () => void
   showArrow?: boolean
   sortBy?: SortByType
   currentSort?: SortType
}
export type SortByType = 'cardsCount' | 'updated' | 'created'
