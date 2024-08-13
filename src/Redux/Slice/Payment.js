import { createSlice } from "@reduxjs/toolkit";

export const PaymentSlice = createSlice({
    name: "payment",
    initialState: {
        payment: null,
    },

    reducers: {
        Add_Payment: (state, action) => {
            state.payment = action.payload;
        },

        // Clear_ClientID: (state, action) => {
        //     state.payment = null;
        // },
    },
});

export const { Add_Payment } = PaymentSlice.actions;
// Selector to get dispatched Data
export const selectPayment = (state) => state.payment.payment;
export default PaymentSlice.reducer;