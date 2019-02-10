import { combineReducers } from "redux";
import types from "./types";

const modalReducer = ( state = { open: false }, action ) => {
    switch ( action.type ) {
        case types.OPEN_MODAL:
            return { open: true, type: action.payload };
        case types.CLOSE_MODAL:
            return { open: false };
        default:
            return state;
    }
};

const reducer = combineReducers( {
    modalState: modalReducer,
} );

export default reducer;
