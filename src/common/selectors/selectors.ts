import { AppRootStateType } from "../../app/store";

export const auth = (state: AppRootStateType) => state.auth
export const packs = (state: AppRootStateType) => state.packs
export const packsParams = (state: AppRootStateType) => state.packs.params