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
        TAMBAH_DUIT: (state: any, action: PayloadAction<number>) => {
            state.tabungan += action.payload
        },
        KURANGI_DUIT: (state: any, action: PayloadAction<number>) => {
            state.tabungan -= action.payload
        },
    },
});

export const { KURANGI_DUIT } = TabunganSlice.actions;
export const selectTabungan = (state: RootState) => state.tabungan.tabungan;