import {_instance} from "./_instance"
import { DataType} from "../features/cards/cardsReducer";

export const cardsAPI = {
    getCards(id:string,min?:number,max?:number,page?:number,pageCount?:number,cardQuestion?:string) {
        return _instance.get<DataType>(`cards/card?cardsPack_id=${id}`)
    },
    addCard(id:string){
        const card ={
            cardsPack_id: id,
            question: "34 question" ,
            answer: "22 answer",
            grade: 2,
            shots: 0,
            answerImg: "url or base 64",
            questionImg: "url or base 64",
            questionVideo: "url or base 64",
            answerVideo: "url or base 64" ,
        }
        return _instance.post('cards/card',{card:card})
    },
    deleteCard(id:string){
        return _instance.delete(`cards/card?id=${id}`)
    },
    editCard(id:string){
        const card ={
            _id: id,
            question: 'NEW question',
            comments: "NEW comments"
        }
        return _instance.put(`cards/card`,{card:card})
    },
    sortData(idPack:string,direction:number,value:string){
       return  _instance.get<DataType>(`cards/card?cardsPack_id=${idPack}&sortCards=${direction}${value}`)
    },
    findQuestion(id:string,cardQuestion:string){
        return _instance.get<DataType>(`cards/card?cardsPack_id=${id}&cardQuestion=${cardQuestion}`)
    }
  }