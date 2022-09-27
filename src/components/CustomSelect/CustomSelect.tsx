import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FC } from 'react';
import './customSelect.scss'
export const CustomSelect: FC<SelectPacksCountPropsType> = ({ defaultValue, onChange, title }) => {
   const value = defaultValue === 5 || defaultValue === 10 || defaultValue === 15 ? defaultValue : 5
   const onChangehandler = (value: string) => {
      const valueAsNumber = +value
      onChange(valueAsNumber)
   }
   return (
      <div className='custom-select'>
         <div className='custom-select__text'>Show</div>
         <FormControl variant="standard">
            <Select
               onChange={(event: SelectChangeEvent, child: React.ReactNode) => { onChangehandler(event.target.value); }}
               value={value.toString()}
            >
               <MenuItem value={5}>5</MenuItem>
               <MenuItem value={10}>10</MenuItem>
               <MenuItem value={15}>15</MenuItem>
            </Select>
         </FormControl>
         <div className='custom-select__title'>{title}</div>
      </div>
   )
}
type SelectPacksCountPropsType = {
   defaultValue: number
   onChange: (value: number) => void
   title: string
}