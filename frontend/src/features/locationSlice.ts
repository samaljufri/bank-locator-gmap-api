import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Location {
    id?: number,
    username: string;
    name: string; // location name
    address: string;
    latitude: number;
    longitude: number;
}

interface LocationState {
    locations: Location[];
    activeLocation: google.maps.places.Place | undefined;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialLocationState: LocationState = {
    locations: [],
    activeLocation: undefined,
    status: 'idle',
    error: null,
};

const LOCATION_API = import.meta.env.VITE_LOCATION_API || 'http://localhost:8081/api/locations';

export const fetchLocations = createAsyncThunk(
    'location/fetchLocations',
    async (username: string, { getState }) => {
        const state: any = getState();
        const activeUser = state.user.activeUser;
        if (!activeUser) {
            throw new Error("No active user");
        }

        const response = await fetch(LOCATION_API, {
            headers: {
                Authorization: `Basic ${btoa(`${activeUser.username}:${activeUser.username}`)}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch locations');
        }
        return (await response.json()) as Location[];
    }
);

export const addLocation = createAsyncThunk(
    'location/addLocation',
    async (location: Omit<Location, 'id'>, { getState }) => {
        const state: any = getState();
        const activeUser = state.user.activeUser;
        if (!activeUser) {
            throw new Error("No active user");
        }

        const response = await fetch(LOCATION_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`${activeUser.username}:${activeUser.username}`)}`,
            },
            body: JSON.stringify(location),
        });
        if (!response.ok) {
            throw new Error('Failed to add location');
        }
        return (await response.json()) as Location;
    }
);

const locationSlice = createSlice({
    name: 'location',
    initialState: initialLocationState,
    reducers: {
        setActiveLocation: (state, action: PayloadAction<google.maps.places.Place | undefined>) => {
            state.activeLocation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.locations = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch locations.';
            })
            .addCase(addLocation.fulfilled, (state, action) => {
                state.locations.push(action.payload);
            });
    },
});
export const { setActiveLocation } = locationSlice.actions;
export default locationSlice.reducer;