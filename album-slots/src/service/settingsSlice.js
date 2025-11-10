import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genres: [],
    descriptors: [],
    showArt: true,
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        addGenre: (state, action) => {
            state.genres.push(action.payload);
        },
        removeGenre: (state, action) => {
            state.genres = state.genres.filter(genre => genre !== action.payload);
        },
        addDescriptor: (state, action) => {
           state.descriptors.push(action.payload);
        },
        removeDescriptor: (state, action) => {
            state.descriptors = state.descriptors.filter(descriptor => descriptor !== action.payload);
        },
        toggleShowArt: (state) => {
            state.showArt = !state.showArt;
        },
        reset: () => initialState,
        
    }
});

export const { addGenre, removeGenre, addDescriptor, removeDescriptor, toggleShowArt, reset } = settingsSlice.actions;

export default settingsSlice.reducer;