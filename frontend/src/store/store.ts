import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import locationReducer from '../features/locationSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        location: locationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
