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
        TAMBAH_KEBUTUHAN: (state: any, action: PayloadAction<number>) => {
            state.kebutuhan += action.payload
        },
        KURANGI_KEBUTUHAN: (state: any, action: PayloadAction<number>) => {
            state.kebutuhan -= action.payload
        },
    },
});

export const { TAMBAH_KEBUTUHAN, KURANGI_KEBUTUHAN } = KebutuhanSlice.actions;
export const selectKebutuhan = (state: RootState) => state.kebutuhan.kebutuhan;