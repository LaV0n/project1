import {FC} from "react";
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

type RatingStarsType={
    stars:number
}

export const RatingStars: FC<RatingStarsType> = ({stars})=>{
    return(
        <div>
            {[0,1,2,3,4].map(s=>s<stars? <StarIcon color='warning'/>:<StarOutlineIcon color={'disabled'}/>)
            }
        </div>
    )
}