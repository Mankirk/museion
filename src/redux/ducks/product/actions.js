import types from "./types";

const fetchProducts = params => {
    console.log( "params", params );

    return {
        type: types.FETCH_PRODUCTS,
        async: true,
        generalFetching: true,
        payload: {
            path: "/getProducts",
            method: "GET",
            // body,
        },
    };
};

export default {
    fetchProducts,
};
