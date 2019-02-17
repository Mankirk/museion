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

const createCategory = ( data, imageType ) => {
    const categoryBody = {
        category: data,
    };
    categoryBody.category.image = `/images/categories/${ categoryBody.category.key }.${ imageType }`;
    return {
        type: types.ADD_CATEGORY,
        async: true,
        generalFetching: true,
        payload: {
            path: "/createCategory",
            method: "POST",
            body: categoryBody,
        },
    };
};

const createSubcategory = ( data, imageType ) => {
    const categoryBody = {
        subcategory: data,
    };
    categoryBody.subcategory.image = `/images/subcategories/${
        categoryBody.subcategory.key
    }.${ imageType }`;
    return {
        type: types.ADD_SUBCATEGORY,
        async: true,
        generalFetching: true,
        payload: {
            path: "/createSubcategory",
            method: "POST",
            body: categoryBody,
        },
    };
};

const createSection = ( data, imageType ) => {
    const categoryBody = {
        section: data,
    };
    categoryBody.section.image = `/images/sections/${ categoryBody.section.key }.${ imageType }`;
    return {
        type: types.ADD_SECTION,
        async: true,
        generalFetching: true,
        payload: {
            path: "/createSection",
            method: "POST",
            body: categoryBody,
        },
    };
};

const editCategory = data => {
    const categoryBody = {
        category: data,
    };
    return {
        type: types.EDIT_CATEGORY,
        async: true,
        generalFetching: true,
        payload: {
            path: "/editCategory",
            method: "POST",
            body: categoryBody,
        },
    };
};

const editSubcategory = data => {
    const categoryBody = {
        subcategory: data,
    };
    return {
        type: types.EDIT_SUBCATEGORY,
        async: true,
        generalFetching: true,
        payload: {
            path: "/editSubcategory",
            method: "POST",
            body: categoryBody,
        },
    };
};

const removeCategory = data => {
    const categoryBody = {
        category: data,
    };
    return {
        type: types.REMOVE_CATEGORY,
        async: true,
        generalFetching: true,
        payload: {
            path: "/deleteCategory",
            method: "DELETE",
            body: categoryBody,
        },
    };
};

const removeSubcategory = data => {
    const categoryBody = {
        subcategory: data,
    };
    return {
        type: types.REMOVE_SUBCATEGORY,
        async: true,
        generalFetching: true,
        payload: {
            path: "/deleteSubcategory",
            method: "DELETE",
            body: categoryBody,
        },
    };
};

const editSection = data => {
    const categoryBody = {
        section: data,
    };
    return {
        type: types.EDIT_SECTION,
        async: true,
        generalFetching: true,
        payload: {
            path: "/editSection",
            method: "POST",
            body: categoryBody,
        },
    };
};

const removeSection = data => {
    const categoryBody = {
        section: data,
    };
    return {
        type: types.REMOVE_CATEGORY,
        async: true,
        generalFetching: true,
        payload: {
            path: "/deleteSection",
            method: "DELETE",
            body: categoryBody,
        },
    };
};

const uploadImg = data => {
    const formData = new FormData();
    formData.append( "myImage", data );
    return {
        type: "noType",
        async: true,
        generalFetching: true,
        payload: {
            path: "/uploadImg",
            method: "POST",
            headers: {
                // "content-type": "multipart/form-data",
                multerHint: "fixLater",
            },
            body: data,
        },
    };
};

const removeImage = imagePath => ( {
    type: types.REMOVE_IMAGE,
    async: true,
    generalFetching: true,
    payload: {
        path: "/removeImage",
        method: "DELETE",
        body: { path: imagePath },
    },
} );

export default {
    getSitemap,
    createCategory,
    editCategory,
    removeCategory,
    createSubcategory,
    editSubcategory,
    removeSubcategory,
    createSection,
    editSection,
    uploadImg,
    removeImage,
    removeSection,
};
