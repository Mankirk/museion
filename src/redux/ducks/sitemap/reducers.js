import { combineReducers } from "redux";
import types from "./types";

const sitemapReducer = ( state = {}, action ) => {
    switch ( action.type ) {
        case types.GET_SITEMAP_COMPLETED:
            return action.payload.sitemap;
        default:
            return state;
    }
};

const reducer = combineReducers( {
    sitemap: sitemapReducer,
} );

export default reducer;