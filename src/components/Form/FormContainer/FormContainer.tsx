import { FC } from "react"
import style from "./formContainer.module.scss"
export const FormContainer: FC<FormPropsType> = ({ children }) => {
   return (
      <div className={style.form_container}>
         {children}
      </div>
   )
}
type FormPropsType = {
   children: React.ReactNode
}