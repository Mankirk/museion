import types from "./types";

const setWindowHeight = height => ( {
    type: types.SET_WINDOW_WIDTH,
    payload: height,
} );

const setWindowWidth = width => ( {
    type: types.SET_WINDOW_WIDTH,
    payload: width,
} );

export default {
    setWindowHeight,
    setWindowWidth,
};
