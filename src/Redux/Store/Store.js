import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import userReducer from "../Slice/UserSlice";
import ProductListReducer from "../Slice/ProductList";
import ClientReducer from "../Slice/ClientsDetails";
import bedReducer from "../Slice/BedAllocation";
import deceasedReducer from "../Slice/DeceasedDetails";
import clientidReducer from "../Slice/Clientid";
import deceasedidReducer from "../Slice/Deceasedid";
import sectionsReducer from "../Slice/sections";
import paymentReducer from "../Slice/Payment";


const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  user: userReducer,
  productlist: ProductListReducer,
  client: ClientReducer,
  bed: bedReducer,
  deceased: deceasedReducer,
  clientid: clientidReducer,
  deceasedid: deceasedidReducer,
  sections: sectionsReducer,
  payment: paymentReducer

});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});