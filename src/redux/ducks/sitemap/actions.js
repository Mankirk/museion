import types from "./types";
import uid from "uid";

const getSitemap = () => ( {
    type: types.GET_SITEMAP,
    async: true,
    generalFetching: true,
    payload: {
        path: "/getSitemap",
        method: "GET",
    },
} );

const createCategory = data => {
    const categoryBody = {
        category: data,
    };
    categoryBody.category.key = uid( 10 );

    return {
        type: types.ADD_CATEGORY,
        async: true,
        generalFetching: true,
        payload: {
            path: "/uploadImg",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: data, // categoryBody,
        },
    };
};

export default {
    getSitemap,
    createCategory,
};
