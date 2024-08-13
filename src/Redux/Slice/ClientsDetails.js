import { createSlice } from "@reduxjs/toolkit";

export const ClientDetailsSlice = createSlice({
    name: "client",
    initialState: {
        client: null,
    },

    reducers: {
        Add_Client: (state, action) => {
            state.client = action.payload;
        },

        Clear_Client: (state, action) => {
            state.client = null;
        },
    },
});

export const { Add_Client, Clear_Client } = ClientDetailsSlice.actions;
// Selector to get dispatched Data
export const selectClient = (state) => state.client.client;
export default ClientDetailsSlice.reducer;