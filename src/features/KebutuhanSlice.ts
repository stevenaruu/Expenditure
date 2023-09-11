import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../redux/redux";

interface KebutuhanState {
    kebutuhan: number;
}

const initialState: KebutuhanState = {
    kebutuhan: 0,
};

export const KebutuhanSlice = createSlice({
    name: 'kebutuhan',
    initialState,
    reducers: {
        TAMBAH_DUIT: (state: any, action: PayloadAction<number>) => {
            state.kebutuhan += action.payload
        },
        KURANGI_DUIT: (state: any, action: PayloadAction<number>) => {
            state.kebutuhan -= action.payload
        },
    },
});

export const { KURANGI_DUIT } = KebutuhanSlice.actions;
export const selectKebutuhan = (state: RootState) => state.kebutuhan.kebutuhan;