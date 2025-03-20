import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to get user's location
export const getLocation = createAsyncThunk(
    "latlong/getLocation",
    async (_, { rejectWithValue }) => {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lon: position.coords.longitude
                        });
                    },
                    (error) => {
                        reject(rejectWithValue(error.message));
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 30000,
                        maximumAge: 0,
                    }
                );
            } else {
                reject(rejectWithValue("Geolocation not supported by your browser."));
            }
        });
    }
);

const latlongSlice = createSlice({
    name: "latlong",
    initialState: {
        lon: 0,
        lat: 0,
        error: null,
        loading: false
    },
    reducers: {
        setLatLon: (state, action) => {   // ✅ Adding setLatLon Reducer
            state.lat = action.payload.lat;
            state.lon = action.payload.lon;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLocation.fulfilled, (state, action) => {
                state.lat = action.payload.lat;
                state.lon = action.payload.lon;
                state.loading = false;
            })
            .addCase(getLocation.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

// ✅ Exporting setLatLon to use in your components
export const { setLatLon } = latlongSlice.actions;
export default latlongSlice.reducer;
