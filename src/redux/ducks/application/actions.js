import types from "./types";

const setWindowHeight = height => ( {
    type: types.SET_WINDOW_HEIGHT,
    payload: height,
} );

const setWindowWidth = width => ( {
    type: types.SET_WINDOW_WIDTH,
    payload: width,
} );

const setLanguage = language => ( {
    type: types.SET_LANGUAGE,
    payload: language,
} );

export default {
    setWindowHeight,
    setWindowWidth,
    setLanguage,
};
