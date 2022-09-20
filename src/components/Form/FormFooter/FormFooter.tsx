import { FC } from 'react';
import { Button } from "@mui/material";
import { NavLink } from 'react-router-dom';
import style from './formFooter.module.scss'
export const FormFooter: FC<FormFooterPropsType> = ({ buttonTitle, onClick, linkTitle, pathTo, children, className, disabled }) => {
   return (
      <div className={`${className ? `${className} ` : ''}${style.footer}`}>
         {buttonTitle && onClick && <Button disabled={disabled} variant='contained' className={style.footer__button} onClick={onClick}>{buttonTitle}</Button>}
         {children && <span className={style.footer__text}>{children}</span>}
         {pathTo && linkTitle && <NavLink className={style.footer__link} to={pathTo}>{linkTitle}</NavLink>}
      </div>
   )
}
type FormFooterPropsType = {
   buttonTitle?: string
   onClick?: () => void
   linkTitle?: string
   pathTo?: string
   children?: React.ReactNode
   className?: string
   disabled?: boolean
}