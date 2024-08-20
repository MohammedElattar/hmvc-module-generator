import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    defaultCrudInitialState,
    setPaginationAction
} from "../../../utility/helpers/reduxHelper";
import VendorLogoState from "../interfaces/vendorLogoState.ts";
import PaginationMetaObject from "../../../interfaces/paginationObject.ts";
import VendorLogoObject from "../interfaces/vendorLogoObject.ts";

const initialState: VendorLogoState = defaultCrudInitialState()

export const vendorLogoSlice = createSlice({
    name: 'vendorLogos',
    initialState,
    reducers: {
        setAllVendorLogosMetaAction: (state, action: PayloadAction<PaginationMetaObject>) => {
            state.all.meta = setPaginationAction(action.payload)
        },
        setAllVendorLogosAction: (state, action: PayloadAction<VendorLogoTableObject[]>) => {
            state.all.data = action.payload;
        },
        setAllVendorLogosLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.all.loading = action.payload;
        },
        setOneVendorLogoAction: (state, action:  PayloadAction<VendorLogoObject>) => {
            state.show.data = action.payload;
        },
        setOneVendorLogoLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.show.loading = action.payload;
        }
    }
})

export default vendorLogoSlice.reducer;
export const {
    setAllVendorLogosAction,
    setAllVendorLogosMetaAction,
    setAllVendorLogosLoadingAction,
    setOneVendorLogoAction,
    setOneVendorLogoLoadingAction,
} = vendorLogoSlice.actions;