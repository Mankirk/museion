import { combineReducers } from "redux";
import types from "./types";

const heightReducer = ( state = 0, action ) => {
    switch ( action.type ) {
        case types.SET_WINDOW_HEIGHT:
            return action.payload;
        default:
            return state;
    }
};

const widthReducer = ( state = 0, action ) => {
    switch ( action.type ) {
        case types.SET_WINDOW_WIDTH:
            return action.payload;
        default:
            return state;
    }
};

const languageReducer = ( state = "en", action ) => {
    switch ( action.type ) {
        case types.SET_LANGUAGE:
            window.userLang = action.payload;
            return action.payload;
        default:
            return state;
    }
};

const applicationReducer = combineReducers( {
    screenHeight: heightReducer,
    screenWidth: widthReducer,
    language: languageReducer,
} );

export default applicationReducer;
