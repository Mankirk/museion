const mongoose = require( "mongoose" );

const Subcategory = mongoose.model( "Subcategory" );

const getAll = ( req, res, next ) => {
    Subcategory.find( {}, ( err, docs ) => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        req.subcategories = docs;
        return next();
    } );
};

const getSubcategory = ( req, res, next ) => {
    const subcategory = req.body.subcategory;

    const queryParams = {};
    queryParams.key = subcategory.key;

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
    const subcategoryToCreate = req.body.subcategory;
    const foundSubcategory = req.subcategory;

    if ( foundSubcategory.length === 0 ) {
        const newSubcategory = new Subcategory();
        // newSubcategory.setKey();
        newSubcategory.title = subcategoryToCreate.title;
        newSubcategory.url = `products/${ subcategoryToCreate.parentTitle }/${
            subcategoryToCreate.title
        }`;
        newSubcategory.key = subcategoryToCreate.key;
        newSubcategory.parentKey = subcategoryToCreate.parentKey;
        newSubcategory.parentTitle = subcategoryToCreate.parentTitle;
        newSubcategory.image = subcategoryToCreate.image;

        newSubcategory.save( ( err, savedSubcategory ) => {
            if ( err ) {
                console.log( "err", err );
                return res.serverError();
            }

            req.subcategory = savedSubcategory;
            console.log( "SUV", savedSubcategory );

            return next();
        } );
    } else {
        return res.preconditionFailed( "item already exists" );
    }
};

const editSubcategory = ( req, res, next ) => {
    const subcategoryToEdit = req.body.subcategory;
    // const foundCategory = req.category;

    const queryParams = {};
    queryParams.key = subcategoryToEdit.key;

    subcategoryToEdit.url = `products/${ subcategoryToEdit.parentTitle }/${ subcategoryToEdit.title }`;

    Subcategory.updateOne( queryParams, subcategoryToEdit, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        req.subcategory = subcategoryToEdit;
        return next();
    } );
};

const deleteSubcategory = ( req, res, next ) => {
    const subcategoryToDelete = req.body.subcategory;

    const queryParams = {};
    queryParams.key = subcategoryToDelete.key;

    Subcategory.deleteMany( queryParams, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }
        return next();
    } );
};

const editByCategory = ( req, res, next ) => {
    const editedCategory = req.body.category;

    const queryParams = {};
    queryParams.parentKey = editedCategory.key;

    Subcategory.find( queryParams, ( err, docs ) => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        docs.forEach( doc => {
            const docUrl = doc.url.split( "/" );
            docUrl[ 1 ] = editedCategory.title;
            const newUrl = docUrl.join( "/" );

            doc.parentTitle = editedCategory.title;
            doc.url = newUrl;
            doc.save();
        } );

        return next();
    } );
};

const deleteByCategory = ( req, res, next ) => {
    const deletedCategory = req.body.category;

    const queryParams = {};
    queryParams.parentKey = deletedCategory.key;

    Subcategory.deleteMany( queryParams, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }
        return next();
    } );
};

module.exports = {
    getAll,
    getSubcategory,
    createSubcategory,
    editSubcategory,
    deleteSubcategory,
    deleteByCategory,
    editByCategory,
};
