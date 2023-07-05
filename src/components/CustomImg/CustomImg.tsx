import React, {FC, useEffect, useState} from 'react';
import brokenImg from '../../assets/icons/broken-image.png'

type CustomImgType ={
    url:string | null
    style:string
}
export const CustomImg:FC<CustomImgType> = ({url,style}) => {

    const [path,setPath] = useState(url)
    useEffect(()=>{setPath(url)},[url])

    return (
        <img src={path!} alt={'0'} className={style} onError={()=>setPath(brokenImg)}/>
    );
};

