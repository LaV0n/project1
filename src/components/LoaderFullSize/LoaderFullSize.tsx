import { CircularProgress } from "@mui/material";
import { FC } from 'react';
import style from './loaderFullSize.module.scss'
export const LoaderFullSize: FC<LoaderFullSizePropsType> = ({ color }) => <div className={style.loader}><CircularProgress color={color} /></div>
type LoaderFullSizePropsType = {
    color?: "secondary" | "primary" | "error" | "info" | "success" | "warning" | "inherit" | undefined
}