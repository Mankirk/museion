import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import * as reducers from "./ducks";

export default function configureStore( initialState ) {
    const rootReducer = combineReducers( reducers );

    const composeEnhancers = devToolsInstalled()
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers( applyMiddleware( thunkMiddleware ) )
    );
}

function devToolsInstalled() {
    return (
        typeof window === "object" &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function"
    );
}
