import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface User {
    username: string;
}

interface UserState {
    users: User[];
    activeUser: User | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    users: [],
    activeUser: null,
    status: 'idle',
    error: null,
};

const USER_API = import.meta.env.VITE_USER_API || 'http://localhost:8081/api/users';

export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const response = await fetch(USER_API);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return (await response.json()) as User[];
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action: PayloadAction<User>) => {
            state.activeUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch users.';
            });
    },
});

export const { setActiveUser } = userSlice.actions;
export default userSlice.reducer;