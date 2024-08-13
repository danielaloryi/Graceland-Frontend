import { createSlice } from "@reduxjs/toolkit";

export const DeceasedDetailsSlice = createSlice({
    name: "deceased",
    initialState: {
        deceased: null,
    },

    reducers: {
        Add_Deceased: (state, action) => {
            state.deceased = action.payload;
        },

        Clear_Deceased: (state, action) => {
            state.deceased = null;
        },
    },
});

export const { Add_Deceased,  Clear_Deceased} = DeceasedDetailsSlice.actions;
// Selector to get dispatched Data
export const selectDeceased = (state) => state.deceased.deceased;
export default DeceasedDetailsSlice.reducer;