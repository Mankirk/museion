import types from "./types";

const openModal = modalType => ( {
    type: types.OPEN_MODAL,
    payload: modalType,
} );

const closeModal = () => ( {
    type: types.CLOSE_MODAL,
    payload: {},
} );

export default {
    openModal,
    closeModal,
};
