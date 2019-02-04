const mongoose = require( "mongoose" );

const Category = mongoose.model( "Category" );
const uid = require( "uid" );
//
// const buildUrl = product => {
//     if ( product.category && product.subcategory && product.section ) {
//         return `products/${ product.category }/${ product.subcategory }/${ product.section }`;
//     }
//
//     if ( product.category && product.subcategory ) {
//         return `products/${ product.category }/${ product.subcategory }`;
//     }
//
//     return `products/${ product.category }`;
// };

const getCategories = ( req, res, next ) => {
    let selectionField = req.headers.selectionField;
    let selectionValue = req.headers.selectionValue;
    const product = req.body.payload;

    if ( product ) {
        selectionField = "title";
        selectionValue = product.category;
    }

    const queryParams = {};
    queryParams[ selectionField ] = selectionValue;

    console.log( "queryParams", queryParams );

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
    const category = req.category;
    const product = req.body.payload;

    if ( category.length === 0 ) {
        const newCategory = new Category();

        newCategory.setKey();
        newCategory.title = product.category;
        newCategory.url = `${ product.category }`;
        const categoryKey = uid( 10 );
        newCategory.subcategories = [
            {
                title: product.subcategory,
                key: categoryKey,
                url: `products/${ product.category }`,
                image: "",
                subcategories: product.subcategory
                    ? [
                        {
                            title: product.section,
                            url: `products/${ product.category }/${ product.subcategory }/${
                                product.section
                            }`,

                            image: "",
                            sections: product.section
                                ? [
                                    {
                                        title: product.section,
                                        url: `products/${ product.category }/${
                                            product.subcategory
                                        }/${ product.section }`,
                                    },
                                ]
                                : null,
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

const editCategory = ( req, res, next ) => {
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

const deleteCategory = ( req, res ) => {};

module.exports = {
    getCategories,
    createCategory,
    editCategory,
    deleteCategory,
};
