import { combineReducers } from "redux";
import types from "./types";

const sitemapReducer = ( state = [], action ) => {
    switch ( action.type ) {
        case types.GET_SITEMAP_COMPLETED:
        case types.ADD_CATEGORY_COMPLETED:
        case types.EDIT_CATEGORY_COMPLETED:
        case types.REMOVE_CATEGORY_COMPLETED:
        case types.ADD_SUBCATEGORY_COMPLETED:
        case types.EDIT_SUBCATEGORY_COMPLETED:
        case types.REMOVE_SUBCATEGORY_COMPLETED:
        case types.ADD_SECTION_COMPLETED:
        case types.EDIT_SECTION_COMPLETED:
        case types.REMOVE_SECTION_COMPLETED:
            return action.payload.categories;

        default:
            return state;
    }
};

const reducer = combineReducers( {
    sitemap: sitemapReducer,
} );

export default reducer;
