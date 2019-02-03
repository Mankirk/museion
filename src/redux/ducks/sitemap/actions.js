import types from "./types";

const getSitemap = () => ( {
    type: types.GET_SITEMAP,
    async: true,
    generalFetching: true,
    payload: {
        path: "/getSitemap",
        method: "GET",
    },
} );

export default {
    getSitemap,
};
