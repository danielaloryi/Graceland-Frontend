import { createSlice } from "@reduxjs/toolkit";

export const SectionsSlice = createSlice({
    name: "sections",
    initialState: {
        sections: null,
    },

    reducers: {
        Add_Sections: (state, action) => {
            state.sections = action.payload;
        },

        // Clear_Bed: (state, action) => {
        //     state.bed = null;
        // },
    },
});

export const { Add_Sections} = SectionsSlice.actions;
// Selector to get dispatched Data
export const selectsection = (state) => state.sections.sections;
export default SectionsSlice.reducer;