import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatchType, AppRootStateType } from "../../app/store";
import { CardGetType, cardsAPI, EditCardRequestType } from "../../api/cards-api";
import { AxiosError } from "axios";
import { packsAPI, UpdatePackNameRequestType } from "../../api/packs-api";

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
    pageCount: 5,
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
    allCards: [] as CardsType[],
    page: 1,
    pageCount: 5
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
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        }
    }
})

export const cardsReducer = slice.reducer

export const { getCardsData, setStatus, setErrorNotice, setPageCount, setPage } = slice.actions

export const getCardsTC = (data: CardGetType) => async (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
    dispatch(setStatus({ status: true }))
    try {
        const state = getState()
        const response = await cardsAPI.getCards({ ...data, pageCount: state.cards.pageCount, page: state.cards.page })
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
        dispatch(getCardsTC({ cardsPack_id: packId }))
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
        dispatch(getCardsTC({ cardsPack_id: packId }))
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
        dispatch(getCardsTC({ cardsPack_id: packId }))
        dispatch(setStatus({ status: false }))
    } catch (err: any) {
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        dispatch(setErrorNotice({ notice: error }))
    }
}

export const dataSortTC = (packId: string, direction: number, value: string) => async (dispatch: AppDispatchType) => {
    dispatch(setStatus({ status: true }))
    try {
        await dispatch(getCardsTC({ cardsPack_id: packId, direction: direction, value: value }))
        dispatch(setStatus({ status: false }))
    } catch (err: any) {
        const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
        dispatch(setErrorNotice({ notice: error }))
    }
}

export const editPackNameFromCards = createAsyncThunk<unknown, UpdatePackNameRequestType, { rejectValue: { error: string } }>(
    'cards/editPackName',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            await packsAPI.updatePackName(data)
        } catch (err: any) {
            const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
            dispatch(setErrorNotice({ notice: error }))
            return rejectWithValue({ error })
        }
    }
)
export const deletePackFromCards = createAsyncThunk<unknown, string, { rejectValue: { error: string } }>(
    'cards/deletePack',
    async (id, { dispatch, rejectWithValue }) => {
        try {
            await packsAPI.deletePack(id)
        } catch (err: any) {
            const error: string = (err as AxiosError).response?.data ? err.response.data.error : ''
            dispatch(setErrorNotice({ notice: error }))
            return rejectWithValue({ error })
        }
    }
)