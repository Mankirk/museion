import types from "./types";

const fetchProducts = params => ( {
    type: types.FETCH_PRODUCTS,
    async: true,
    generalFetching: true,
    payload: {
        path: "/getProducts",
        method: "GET",
        headers: params,
    },
} );

export default {
    fetchProducts,
};
