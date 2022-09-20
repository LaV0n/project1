import axios from "axios";

export const _instance = axios.create({
   baseURL: 'http://localhost:7542/2.0/',
   withCredentials: true
})

//    'https://neko-back.herokuapp.com/2.0/'
//    'http://localhost:7542/2.0/'





//process.env.REACT_APP_BACK_URL
//process.env.REACT_APP_LOCAL_HOST 