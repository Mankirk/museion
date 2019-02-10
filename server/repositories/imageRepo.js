const multer = require( "multer" );

const saveCategoryImage = ( req, res, next ) => {
    const upload = multer( {
        dest: "/public/images/categories",
    } );

    upload.single( "file" );

    return next();
};

module.exports = {
    saveCategoryImage,
};
