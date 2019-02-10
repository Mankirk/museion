const mongoose = require( "mongoose" );

const Category = mongoose.model( "Category" );

// const getCategories = ( req, res, next ) => {
//     let selectionField = req.headers.selectionField;
//     let selectionValue = req.headers.selectionValue;
//     const product = req.body.payload;
//
//     if ( product ) {
//         selectionField = "title";
//         selectionValue = product.category;
//     }
//
//     const queryParams = {};
//     queryParams[ selectionField ] = selectionValue;
//
//     console.log( "queryParams", queryParams );
//
//     Category.find( queryParams, ( err, docs ) => {
//         if ( err ) {
//             console.log( "err", err );
//             return res.serverError();
//         }
//
//         req.category = docs;
//         return next();
//     } );
// };

const getAll = ( req, res, next ) => {
    Category.find( {}, ( err, docs ) => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }
        req.categories = docs;
        return next();
    } );
};

const getCategory = ( req, res, next ) => {
    const category = req.body.category;

    const queryParams = {};
    queryParams.key = category.key;

    Category.find( queryParams, ( err, docs ) => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        req.category = docs;
        return next();
    } );
};

const createCategory = ( req, res, next ) => {
    const categoryToCreate = req.body.category;
    const foundCategory = req.category;

    if ( foundCategory.length === 0 ) {
        const newCategory = new Category();
        // newCategory.setKey();
        newCategory.title = categoryToCreate.title;
        newCategory.url = `products/${ categoryToCreate.title }`;
        newCategory.key = categoryToCreate.key;

        newCategory.save( ( err, savedCategory ) => {
            if ( err ) {
                console.log( "err", err );
                return res.serverError();
            }

            req.category = savedCategory;
            return next();
        } );
    } else {
        return res.preconditionFailed( "item already exists" );
    }
};

const editCategory = ( req, res, next ) => {
    const categoryToEdit = req.body.category;
    // const foundCategory = req.category;

    const queryParams = {};
    queryParams.key = categoryToEdit.key;

    categoryToEdit.url = `products/${ categoryToEdit.title }`;

    Category.updateOne( queryParams, categoryToEdit, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        req.category = categoryToEdit;
        return next();
    } );
};

const deleteCategory = ( req, res, next ) => {
    const categoryToDelete = req.body.category;

    const queryParams = {};
    queryParams.key = categoryToDelete.key;

    Category.deleteMany( queryParams, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }
        return next();
    } );
};

module.exports = {
    getAll,
    getCategory,
    createCategory,
    editCategory,
    deleteCategory,
};

/*
const createCategory2 = ( req, res, next ) => {
    const category = req.category;
    const product = req.body.payload;

    if ( category.length === 0 ) {
        const newCategory = new Category();
        console.log( "section", product.section );
        newCategory.setKey();
        newCategory.title = product.category;
        newCategory.url = `products/${ product.category }`;
        const categoryKey = uid( 10 );
        newCategory.subcategories = [
            {
                title: product.subcategory,
                key: categoryKey,
                url: `products/${ product.category }/${ product.subcategory }`,
                image: "",
                sections: product.section
                    ? [
                        {
                            title: product.section,
                            url: `products/${ product.category }/${ product.subcategory }/${
                                product.section
                            }`,
                        },
                    ]
                    : null,
            },
        ];
        newCategory.save( ( err, savedCategory ) => {
            if ( err ) {
                console.log( "err", err );
                return res.serverError();
            }

            req.category = savedCategory;
            return next();
        } );
    }
    return next();
};
*/

/*
const editCategory2 = ( req, res, next ) => {
    const category = req.category[ 0 ];
    const product = req.body.payload;

    if ( category ) {
        const newSubcategories = getNewSubCategories( category.subcategories, product );
        category.subcategories = newSubcategories;

        const queryParams = {};
        queryParams.key = category.key;

        Category.updateOne( queryParams, category, err => {
            if ( err ) {
                console.log( "err", err );
                return res.serverError();
            }

            req.category = category;
            return next();
        } );
    }
};

function getNewSubCategories( subcategories, product ) {
    const subcategoryIndex = subcategories.findIndex( sub => sub.title === product.subcategory );

    if ( subcategoryIndex === -1 ) {
        const newSubcategory = {
            title: product.subcategory,
            image: "",
            url: `products/${ product.category }/${ product.subcategory }`,
            sections: product.section
                ? [
                    {
                        title: product.section,
                        url: `products/${ product.category }/${ product.subcategory }/${
                            product.section
                        }`,
                    },
                ]
                : null,
            key: uid( 10 ),
        };
        const newSubcategories = subcategories.push( newSubcategory );

        return newSubcategories;
    }
    const sectionIndex = subcategories[ subcategoryIndex ].sections.findIndex( section => section.title === product.section );

    if ( sectionIndex !== -1 ) {
        return subcategories;
    }
    const newSection = {
        title: product.section,
        url: `products/${ product.category }/${ product.subcategory }/${ product.section }`,
    };
    const newSections = subcategories[ subcategoryIndex ].sections.push( newSection );
    subcategories[ subcategoryIndex ].sections = newSections;

    return subcategories;
}
*/
