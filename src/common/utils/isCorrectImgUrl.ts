import axios from "axios";
export const isCorrectImgUrl=  (url:string|null)=>{
    if (!url) return false
     axios
        .get(url)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
}