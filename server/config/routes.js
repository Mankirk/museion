const express = require( "express" );
const multer = require( "multer" );
const path = require( "path" );
const fs = require( "fs" );

const controllers = require( "../controllers" );

const repos = require( "../repositories" );
const middlewares = require( "../middlewares" );
const sitemap = require( "./sitemapTemplate" ).sitemap;

const router = express.Router();

router.get( "/", ( req, res ) => {
    res.json( { success: true, baseRoute: "This is Base Route!" } );
} );

router.get( "/test", ( req, res ) => {
    res.send( { succcess: true, mess: "test is working" } );
} );

router.get( "/getProducts", repos.product.getProducts, controllers.product.getProducts );
router.post(
    "/createProduct",

    repos.product.createProduct
);
router.post( "/editProduct", repos.product.editProduct );
router.delete( "/deleteProduct", repos.product.deleteProduct );

// category

const storage = multer.diskStorage( {
    destination: ( req, file, cb ) => {
        const dest = req.headers.imagedestination ? req.headers.imagedestination : "";

        cb( null, path.join( __dirname, `../../public/images/${ dest }` ) );
    },
    filename( req, file, cb ) {
        console.log( "multer file", file );
        const multerHint = req.headers.multerhint ? req.headers.multerhint : file.originalname;
        cb( null, `${ multerHint }.${ file.mimetype.split( "/" )[ 1 ] }` );
    },
} );

const upload = multer( {
    storage,
    limits: { fileSize: 1000000 },
} );

router.post( "/uploadImg", upload.single( "myImage" ), ( req, res, next ) => {
    console.log( "img", req.file );
    console.log( "body", req.body );

    return res.success( { ms: "added IMG" } );
} );

router.post(
    "/uploadImages",
    ( req, res, next ) => {
        console.log( "req", req.files );
        return next();
    },
    upload.array( "myImage", 10 ),
    ( req, res, next ) => {
        console.log( "img", req.files );
        return res.success( { images: req.files.map( file => file.filename ) } );
    }
);

router.delete( "/removeImage", ( req, res ) => {
    const imagePath = req.body.path;
    fs.unlink( path.join( __dirname, `../../public/${ imagePath }` ), () =>
        res.success( { mss: "file deleted" } ) );
} );

router.post(
    "/createCategory",
    ( req, res, next ) => {
        console.log( "body", req.body );

        return next();
    },
    repos.category.getCategory,
    repos.category.createCategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.post(
    "/editCategory",
    repos.category.editCategory,
    repos.section.editByCategory,
    repos.subcategory.editByCategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.delete(
    "/deleteCategory",
    repos.section.deleteByCategory,
    repos.subcategory.deleteByCategory,
    repos.category.deleteCategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);

// subcategory

router.post(
    "/createSubcategory",
    repos.subcategory.getSubcategory,
    repos.subcategory.createSubcategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.post(
    "/editSubcategory",
    repos.subcategory.editSubcategory,
    repos.section.editBySubcategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.delete(
    "/deleteSubcategory",
    repos.section.deleteBySubcategory,
    repos.subcategory.deleteSubcategory,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);

// section

router.post(
    "/createSection",
    repos.section.getSection,
    repos.section.createSection,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.post(
    "/editSection",
    repos.section.editSection,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);
router.delete(
    "/deleteSection",
    repos.section.deleteSection,
    repos.category.getAll,
    repos.subcategory.getAll,
    repos.section.getAll,
    repos.sitemap.updateSitemap
);

router.get( "/getSitemap", repos.sitemap.getSitemap );

// router.get( "/getSitemap2", repos.category.getCategories, ( req, res ) => {
//     res.success( { sitemap: req.category } );
// } );

module.exports = app => {
    app.use( "/", router );
};
