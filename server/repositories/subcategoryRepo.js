const mongoose = require( "mongoose" );

const Subcategory = mongoose.model( "Subcategory" );

const getSubcategories = ( req, res, next ) => {
    const selectionField = req.headers.selectionField;
    const selectionValue = req.headers.selectionValue;
    const category = req.body.category;
    const product = req.body.payload;

    if ( product ) {
        selectionField = "title";
        selectionValue = req.body.subcategory;
    }

    const queryParams = {};
    queryParams[ selectionField ] = selectionValue;
    queryParams.key = category.key;

    Subcategory.find( queryParams, ( err, docs ) => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        req.subcategory = docs;
        return next();
    } );
};

const createSubcategory = ( req, res, next ) => {
    const subcategory = req.subcategory;
    const product = req.body.payload;

    if ( !category ) {
        const newSubcategory = new Subcategory();

        newSubcategory.setKey();
        newSubcategory.title = product.category;
        // newCategory.subcategories = [ product.subcategory ];
        newSubcategory.save( ( err, savedCategory ) => {
            if ( err ) {
                console.log( "err", err );
                return res.serverError();
            }

            req.category = savedCategory;
            return next();
        } );
    }
};

module.exports = {
    getSubcategories,
    createSubcategory,
};
