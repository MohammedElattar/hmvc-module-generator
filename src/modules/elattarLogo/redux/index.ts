import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    defaultCrudInitialState,
    setPaginationAction
} from "../../../utility/helpers/reduxHelper";
import ElattarLogoState from "../interfaces/elattarLogoState.ts";
import PaginationMetaObject from "../../../interfaces/paginationObject.ts";
import ElattarLogoObject from "../interfaces/elattarLogoObject.ts";

const initialState: ElattarLogoState = defaultCrudInitialState()

export const elattarLogoSlice = createSlice({
    name: 'elattarLogos',
    initialState,
    reducers: {
        setAllElattarLogosMetaAction: (state, action: PayloadAction<PaginationMetaObject>) => {
            state.all.meta = setPaginationAction(action.payload)
        },
        setAllElattarLogosAction: (state, action: PayloadAction<ElattarLogoTableObject[]>) => {
            state.all.data = action.payload;
        },
        setAllElattarLogosLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.all.loading = action.payload;
        },
        setOneElattarLogoAction: (state, action:  PayloadAction<ElattarLogoObject>) => {
            state.show.data = action.payload;
        },
        setOneElattarLogoLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.show.loading = action.payload;
        }
    }
})

export default elattarLogoSlice.reducer;
export const {
    setAllElattarLogosAction,
    setAllElattarLogosMetaAction,
    setAllElattarLogosLoadingAction,
    setOneElattarLogoAction,
    setOneElattarLogoLoadingAction,
} = elattarLogoSlice.actions;