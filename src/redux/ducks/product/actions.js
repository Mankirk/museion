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

const createProduct = newProduct => ( {
    type: types.CREATE_PRODUCT,
    async: true,
    generalFetching: true,
    payload: {
        path: "/createProduct",
        method: "POST",
        body: newProduct,
    },
} );

export default {
    fetchProducts,
    createProduct,
};
