import {IconButton} from "@mui/material";
import {ChangeEvent, useState} from "react";
import defaultImg from "../../../../../assets/icons/broken-image.png"
import { convertFileToBase64 } from "../../../../../common/utils/convertToBase64";
import styles from "./imageInput.module.scss"

type ImageInputType={
    image:string
    setImage:(value:string)=>void
}

export const ImageInput = ({image,setImage}:ImageInputType) =>{

    const [isImgBroken, setIsImgBroken] = useState(false)

    const setQuestionImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 4000000) {
                convertFileToBase64(file, (file64: string) => {
                    setImage(file64)
                })
            } else {
                console.error('Error: ', 'Файл слишком большого размера')
            }
        }
    }

    const errorHandler = () => {
        setIsImgBroken(true)
        alert('Broken image')
    }
    return(
        <div>
            {image && <img src={isImgBroken? defaultImg :image} alt={'0'} onError={errorHandler} className={styles.image}/>}
            <IconButton component="label">
                <div>Question Image</div>
                <input type={'file'} hidden onChange={setQuestionImgHandler}/>
            </IconButton>
        </div>
    )
}