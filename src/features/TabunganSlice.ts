import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../redux/redux";

interface TabunganState {
    tabungan: number;
}

const initialState: TabunganState = {
    tabungan: 0,
};

export const TabunganSlice = createSlice({
    name: 'tabungan',
    initialState,
    reducers: {
        TAMBAH_TABUNGAN: (state: any, action: PayloadAction<number>) => {
            state.tabungan += action.payload
        },
        KURANGI_TABUNGAN: (state: any, action: PayloadAction<number>) => {
            state.tabungan -= action.payload
        },
    },
});

export const { TAMBAH_TABUNGAN, KURANGI_TABUNGAN } = TabunganSlice.actions;
export const selectTabungan = (state: RootState) => state.tabungan.tabungan;