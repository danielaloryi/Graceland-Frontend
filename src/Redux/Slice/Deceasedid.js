import { createSlice } from "@reduxjs/toolkit";

export const DeceasedIDSlice = createSlice({
    name: "deceasedid",
    initialState: {
        deceasedid: null,
    },

    reducers: {
        Add_DeceasedID: (state, action) => {
            state.deceasedid = action.payload;
        },

        Clear_DeceasedID: (state, action) => {
            state.deceasedid = null;
        },
    },
});


export const { Add_DeceasedID, Clear_DeceasedID } = DeceasedIDSlice.actions;
// Selector to get dispatched Data
export const selectDeceasedID = (state) => state.deceasedid.deceasedid;
export default DeceasedIDSlice.reducer;