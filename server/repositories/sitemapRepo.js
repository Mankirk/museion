const mongoose = require( "mongoose" );

const Sitemap = mongoose.model( "Sitemap" );

const getSitemap = ( req, res ) => {
    Sitemap.find( {}, ( err, docs ) => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }
        return res.success( docs[ 0 ] );
    } );
};

const updateSitemap = ( req, res ) => {
    const { categories, subcategories, sections } = req;

    const updatedSitemap = buildSitemap( categories, subcategories, sections );

    Sitemap.deleteMany( {}, err => {
        if ( err ) {
            console.log( "err", err );
            return res.serverError();
        }

        const newSitemap = new Sitemap( updatedSitemap );

        newSitemap.save( ( err1, savedSitemap ) => {
            if ( err ) {
                console.log( "err", err1 );
                return res.serverError();
            }

            return res.success( savedSitemap );
        } );
    } );
};

function buildSitemap( categoriesDoc, subcategoriesDoc, sectionsDoc ) {
    const categories = categoriesDoc.map( item => item._doc );
    const subcategories = subcategoriesDoc.map( item => item._doc );
    const sections = sectionsDoc.map( item => item._doc );
    // console.log( "categories", categories );
    // console.log( "subfcategories", subcategories );
    // console.log( "sections", sections );
    const newSitemap = categories.map( category => {
        const gatheredSubs = subcategories
            .filter( sub => sub.parentKey === category.key )
            .map( sub => {
                const gatheredSections = sections.filter( section => section.parentKey === sub.key );
                const updatedSub = Object.assign( {}, sub, { sections: gatheredSections } );
                return updatedSub;
            } );

        const updatedCategory = Object.assign( {}, category, { subcategories: gatheredSubs } );
        return updatedCategory;
    } );

    return { categories: newSitemap };
}

module.exports = {
    getSitemap,
    updateSitemap,
};
