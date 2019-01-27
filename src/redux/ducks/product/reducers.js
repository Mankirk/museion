import { combineReducers } from "redux";
import types from "./types";

const productListReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case types.FETCH_PRODUCTS_COMPLETED:
            return action.payload;
        default:
            return state;
    }
};

const reducer = combineReducers( {
    list: productListReducer,
} );

export default reducer;
