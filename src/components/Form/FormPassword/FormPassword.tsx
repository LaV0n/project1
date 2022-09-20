import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { TextField } from '@mui/material';
import { IconButton } from '@mui/material';
import { FC } from 'react';
import { useState } from 'react';
import style from "./formPassword.module.scss"
import { FieldInputProps } from 'formik';
export const FormPassword: FC<FormPasswordPropsType> = ({ isError, errorText, onFocus, fieldProps, className, label }) => {
   const [isShowPass, setIsShowPass] = useState(false)
   return (
      <div className={`${className ? `${className} ` : ''}${style.password}`}>
         <TextField
            className={style.password__input}
            label={label ? label : "Password"}
            variant="standard"
            type={!isShowPass ? "password" : "text"}
            error={isError}
            onFocus={() => { onFocus && onFocus() }}
            {...fieldProps}
         />
         {isError && <span className={style.password__error}>{errorText}</span>}
         <span className={style.password__icon}>
            {
               !isShowPass ?
                  <IconButton onClick={() => { setIsShowPass(true) }}>
                     <RemoveRedEyeIcon color={isError ? 'error' : 'action'} />
                  </IconButton> :
                  <IconButton onClick={() => { setIsShowPass(false) }}>
                     <VisibilityOffIcon color={isError ? 'error' : 'action'} />
                  </IconButton>
            }
         </span>
      </div>
   )
}
type FormPasswordPropsType = {
   isError: boolean | undefined
   errorText: string | undefined
   onFocus?: () => void
   fieldProps: FieldInputProps<any>
   className?: string
   label?: string
}