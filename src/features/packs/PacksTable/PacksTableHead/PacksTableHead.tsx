import { TableHead, TableRow } from "@mui/material"
import { SortByType, SortFrom, TableCellSort } from "./TableCellSort/TableCellSort"
import TableCell from '@mui/material/TableCell';
import { useAppDispatch } from "../../../../app/store";
import { useAppSelector } from './../../../../app/store';
import { setSortPacks } from "../../packsReducer";
import { SortType } from "../../../../common/types";
import { packsParams } from "../../../../common/selectors/selectors";
export const PacksTableHead = () => {
   const dispatch = useAppDispatch()
   const { sortPacks } = useAppSelector(packsParams)
   const sortPacksHandler = (sortBy: SortByType) => {
      if (sortPacks === null || sortPacks.slice(1, sortPacks.length) !== sortBy) {
         dispatch(setSortPacks(`${SortFrom.largest}${sortBy}`))
      } else {
         const sortValue: SortType = sortPacks === `${SortFrom.smallest}${sortBy}` ?
            `${SortFrom.largest}${sortBy}` :
            `${SortFrom.smallest}${sortBy}`
         dispatch(setSortPacks(sortValue))
      }
   }
   return (
      <TableHead>
         <TableRow style={{ height: '48px' }}>
            <TableCell align="center">Cover</TableCell>
            <TableCell style={{ padding: '10px' }}>Name</TableCell>
            <TableCellSort
               onClick={() => { sortPacksHandler('cardsCount') }}
               showArrow={true} currentSort={sortPacks}
               sortBy={'cardsCount'}
               title='Cards' align="center"
            />
            <TableCellSort
               onClick={() => { sortPacksHandler('updated') }}
               showArrow={true} currentSort={sortPacks}
               sortBy={'updated'} title='Last Updated'
               align="center"
            />
            <TableCellSort
               onClick={() => { sortPacksHandler('created') }}
               title='Created by'
               align="center"
            />
            <TableCell align="center">Actions</TableCell>
         </TableRow>
      </TableHead>
   )
}