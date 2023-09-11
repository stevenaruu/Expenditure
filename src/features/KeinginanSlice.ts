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
        TAMBAH_DUIT: (state: any, action: PayloadAction<number>) => {
            state.keinginan += action.payload
        },
        KURANGI_DUIT: (state: any, action: PayloadAction<number>) => {
            state.keinginan -= action.payload
        },
    },
});

export const { KURANGI_DUIT } = KeinginanSlice.actions;
export const selectKeinginan = (state: RootState) => state.keinginan.keinginan;