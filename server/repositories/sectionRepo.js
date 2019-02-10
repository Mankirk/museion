const mongoose = require( "mongoose" );

const Section = mongoose.model( "Section" );

const getAll = ( req, res, next ) => {
    Section.find( {}, ( err, docs ) => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        req.sections = docs;
        return next();
    } );
};

const getSection = ( req, res, next ) => {
    const section = req.body.section;

    const queryParams = {};
    queryParams.key = section.key;

    Section.find( queryParams, ( err, docs ) => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        req.section = docs;
        return next();
    } );
};

const createSection = ( req, res, next ) => {
    const sectionToCreate = req.body.section;
    const foundSection = req.section;

    if ( foundSection.length === 0 ) {
        const newSection = new Section();
        // newSection.setKey();
        newSection.title = sectionToCreate.title;
        newSection.url = `products/${ sectionToCreate.gParentTitle }/${ sectionToCreate.parentTitle }/${
            sectionToCreate.title
        }`;
        newSection.key = sectionToCreate.key;
        newSection.parentKey = sectionToCreate.parentKey;
        newSection.parentTitle = sectionToCreate.parentTitle;
        newSection.gParentKey = sectionToCreate.gParentKey;
        newSection.gParentTitle = sectionToCreate.gParentTitle;

        newSection.save( ( err, savedSection ) => {
            if ( err ) {
                console.log( "err", err );
                return res.serverError();
            }

            req.section = savedSection;
            return next();
        } );
    } else {
        return res.preconditionFailed( "item already exists" );
    }
};

const editSection = ( req, res, next ) => {
    const sectionToEdit = req.body.section;

    const queryParams = {};
    queryParams.key = sectionToEdit.key;

    sectionToEdit.url = `products/${ sectionToEdit.gParentTitle }/${ sectionToEdit.parentTitle }/${
        sectionToEdit.title
    }`;

    Section.updateOne( queryParams, sectionToEdit, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        req.section = sectionToEdit;
        return next();
    } );
};

const deleteSection = ( req, res, next ) => {
    const sectionToDelete = req.body.section;

    const queryParams = {};
    queryParams.key = sectionToDelete.key;

    Section.deleteMany( queryParams, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }
        return next();
    } );
};

const deleteByCategory = ( req, res, next ) => {
    const deletedCategory = req.body.category;

    const queryParams = {};
    queryParams.gParentKey = deletedCategory.key;

    Section.deleteMany( queryParams, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }
        return next();
    } );
};

const deleteBySubcategory = ( req, res, next ) => {
    const deletedSubcategory = req.body.subcategory;

    const queryParams = {};
    queryParams.parentKey = deletedSubcategory.key;

    Section.deleteMany( queryParams, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }
        return next();
    } );
};

module.exports = {
    getAll,
    getSection,
    createSection,
    editSection,
    deleteSection,
    deleteByCategory,
    deleteBySubcategory,
};
