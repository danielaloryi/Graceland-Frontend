import { createSlice } from "@reduxjs/toolkit";

export const ClientIDSlice = createSlice({
    name: "clientid",
    initialState: {
        clientid: null,
    },

    reducers: {
        Add_ClientID: (state, action) => {
            state.clientid = action.payload;
        },

        Clear_ClientID: (state, action) => {
            state.clientid = null;
        },
    },
});

export const { Add_ClientID, Clear_ClientID } = ClientIDSlice.actions;
// Selector to get dispatched Data
export const selectClientID = (state) => state.clientid.clientid;
export default ClientIDSlice.reducer;