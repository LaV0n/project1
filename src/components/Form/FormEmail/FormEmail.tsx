import { TextField } from '@mui/material';
import { FieldInputProps } from 'formik';
import { FC } from 'react';
import style from './formEmail.module.scss'
export const FormEmail: FC<FormEmailPropsType> = ({ isError, errorText, onFocus, fieldProps, className }) => {
   return (
      <div className={`${className ? `${className} ` : ''} ${style.email}`}>
         <TextField
            className={style.email__input}
            label="Email"
            variant="standard"
            type="text"
            error={isError}
            onFocus={() => { onFocus && onFocus() }}
            {...fieldProps}
         />
         {isError && <span className={style.email__error}>{errorText}</span>}
      </div>
   )
}
type FormEmailPropsType = {
   isError: boolean | undefined
   errorText: string | undefined
   onFocus?: () => void
   fieldProps: FieldInputProps<any>
   className?: string
}