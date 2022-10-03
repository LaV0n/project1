import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatchType } from "../../app/store";
import { cardsAPI, EditCardRequestType } from "../../api/cards-api";
import { AxiosError } from "axios";


const Data = {
    cards: [] as CardsType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packCreated: '',
    packDeckCover: null,
    packName: '',
    packPrivate: false,
    packUpdated: '',
    packUserId: '',
    page: 0,
    pageCount: 0,
    token: '',
    tokenDeathTime: 0
}
export type DataType = {
    cards: CardsType[],
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packCreated: string
    packDeckCover: null
    packName: string
    packPrivate: boolean
    packUpdated: string
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

const initialState = {
    data: Data,
    status: false,
    notice: '',
    allCards: [] as CardsType[]
}

export type CardsType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

export type InitialStateType = typeof initialState

const slice = createSlice({
    name: 'cards',
    initialState: initialState,
    reducers: {
        getCardsData(state, action: PayloadAction<{ data: DataType }>) {
            state.data = action.payload.data
        },
        setStatus(state, action: PayloadAction<{ status: boolean }>) {
            state.status = action.payload.status
        },
        setErrorNotice(state, action: PayloadAction<{ notice: string }>) {
            state.notice = action.payload.notice
        },
    }
})

export const cardsReducer = slice.reducer

export const { getCardsData, setStatus, setErrorNotice } = slice.actions

export const getCardsTC = (id: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({ status: true }))
    try {
        const response = await cardsAPI.getCards(id)
        dispatch(getCardsData({ data: response.data }))
        dispatch(setStatus({ status: false }))
    } catch (err: any) {
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        dispatch(setErrorNotice({ notice: error }))
    }
}

export const addNewCardTC = (packId: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({ status: true }))
    try {
        await cardsAPI.addCard(packId)
        dispatch(getCardsTC(packId))
        dispatch(setStatus({ status: false }))
    } catch (err: any) {
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        dispatch(setErrorNotice({ notice: error }))
    }
}

export const deleteCardTC = (cardId: string, packId: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({ status: true }))
    try {
        await cardsAPI.deleteCard(cardId)
        dispatch(getCardsTC(packId))
        dispatch(setStatus({ status: false }))
        return true
    } catch (err: any) {
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        dispatch(setErrorNotice({ notice: error }))
        return false
    }
}

export const editCardTC = (card: EditCardRequestType, packId: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({ status: true }))
    try {
        await cardsAPI.editCard(card)
        dispatch(getCardsTC(packId))
        dispatch(setStatus({ status: false }))
    } catch (err: any) {
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        dispatch(setErrorNotice({ notice: error }))
    }
}

export const dataSortTC = (packId: string, direction: number, value: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({ status: true }))
    try {
        const response = await cardsAPI.sortData(packId, direction, value)
        dispatch(getCardsData({ data: response.data }))
        dispatch(setStatus({ status: false }))
    } catch (err: any) {
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        dispatch(setErrorNotice({ notice: error }))
    }
}

export const findCardTC = (packId: string, cardQuestion: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({ status: true }))
    try {
        const response = await cardsAPI.findQuestion(packId, cardQuestion)
        dispatch(getCardsData({ data: response.data }))
        dispatch(setStatus({ status: false }))
    } catch (err: any) {
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        dispatch(setErrorNotice({ notice: error }))
    }
}