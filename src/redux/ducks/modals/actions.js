import types from "./types";

const openModal = ( modalType, prefilledData ) => ( {
    type: types.OPEN_MODAL,
    payload: { modalType, prefilledData },
} );

const closeModal = () => ( {
    type: types.CLOSE_MODAL,
    payload: {},
} );

export default {
    openModal,
    closeModal,
};
