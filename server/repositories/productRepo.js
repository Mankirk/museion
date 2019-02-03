const mongoose = require( "mongoose" );

const Product = mongoose.model( "Product" );

const getProducts = ( req, res ) => {
    const { selectionfield, selectionvalue } = req.headers;

    const queryParams = {};
    queryParams[ selectionfield ] = selectionvalue;

    Product.find( queryParams, ( err, docs ) => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }
        return res.success( docs );
    } );
};

const createProduct = ( req, res ) => {
    const product = new Product( req.body.payload );

    product.setId();
    product.setSlug();
    product.save( ( err, savedProduct ) => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        req.savedProduct = savedProduct;
        return res.success( savedProduct );
    } );
};

const editProduct = ( req, res ) => {
    const editedProduct = req.body.payload;

    const queryParams = {};
    queryParams.sku = editedProduct.sku;

    Product.updateMany( queryParams, editedProduct, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        return res.success( editedProduct );
    } );
};

const deleteProduct = ( req, res ) => {
    const { sku } = req.body.payload;

    const queryParams = {};
    queryParams.sku = sku;

    Product.deleteMany( queryParams, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        return res.success( {} );
    } );
};

module.exports = {
    getProducts,
    createProduct,
    editProduct,
    deleteProduct,
};
