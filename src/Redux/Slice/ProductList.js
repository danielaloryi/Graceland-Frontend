import { createSlice } from "@reduxjs/toolkit";

export const productlistSlice = createSlice({
    name: "productlist",
    initialState: {
        productlist: null,
    },

    reducers: {
        Add_Productlist: (state, action) => {
            state.productlist = action.payload;
        },

        Clear_Productlist: (state, action) => {
            state.productlist = null;
        },
    },
});

export const { Add_Productlist, Clear_Productlist } = productlistSlice.actions;

export const selectProductlist = (state) => state.productlist.productlist;

export default productlistSlice.reducer;