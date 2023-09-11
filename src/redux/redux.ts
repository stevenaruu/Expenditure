
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { KebutuhanSlice } from '../features/KebutuhanSlice';
import { KeinginanSlice } from '../features/KeinginanSlice';
import { TabunganSlice } from '../features/TabunganSlice';

const rootReducer = combineReducers({
    kebutuhan: KebutuhanSlice.reducer,
    keinginan: KeinginanSlice.reducer,
    tabungan: TabunganSlice.reducer
});

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage
    },
    rootReducer,
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;