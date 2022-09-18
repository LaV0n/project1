import { FC } from "react";
import style from "./formTitle.module.scss"
export const FormTitle: FC<FormTitlePropsType> = ({ title }) => <h3 className={style.title}>{title}</h3>
type FormTitlePropsType = {
   title: string
}