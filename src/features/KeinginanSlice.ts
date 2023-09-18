import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../redux/redux";

interface KeinginanState {
    keinginan: number;
}

const initialState: KeinginanState = {
    keinginan: 0,
};

export const KeinginanSlice = createSlice({
    name: 'keinginan',
    initialState,
    reducers: {
        TAMBAH_KEINGINAN: (state: any, action: PayloadAction<number>) => {
            state.keinginan += action.payload
        },
        KURANGI_KEINGINAN: (state: any, action: PayloadAction<number>) => {
            state.keinginan -= action.payload
        },
    },
});

export const { TAMBAH_KEINGINAN, KURANGI_KEINGINAN } = KeinginanSlice.actions;
export const selectKeinginan = (state: RootState) => state.keinginan.keinginan;