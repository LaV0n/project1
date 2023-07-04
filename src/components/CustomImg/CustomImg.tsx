import React, {FC, useState} from 'react';
import brokenImg from '../../assets/icons/broken-image.png'

type CustomImgType ={
    url:string | null
    style:any
}
export const CustomImg:FC<CustomImgType> = ({url,style}) => {

    const [path,setPath] = useState(url)

    return (
        <img src={path!} alt={'0'} className={style} onError={()=>setPath(brokenImg)}/>
    );
};

