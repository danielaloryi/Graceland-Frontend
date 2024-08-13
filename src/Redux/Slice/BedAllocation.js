import { createSlice } from "@reduxjs/toolkit";

export const BedAllocationSlice = createSlice({
    name: "bed",
    initialState: {
        bed: null,
    },

    reducers: {
        Add_Bed: (state, action) => {
            state.bed = action.payload;
        },

        Clear_Bed: (state, action) => {
            state.bed = null;
        },
    },
});

export const { Add_Bed, Clear_Bed } = BedAllocationSlice.actions;
// Selector to get dispatched Data
export const selectBed = (state) => state.bed.bed;
export default BedAllocationSlice.reducer;