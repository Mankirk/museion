const express = require( "express" );

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
    repos.category.getCategories,
    repos.category.createCategory,
    repos.category.editCategory,
    repos.product.createProduct
);
router.post( "/editProduct", repos.product.editProduct );
router.delete( "/deleteProduct", repos.product.deleteProduct );

router.get( "/getSitemap", repos.category.getCategories, ( req, res ) => {
    res.success( { sitemap: req.category } );
} );

module.exports = app => {
    app.use( "/", router );
};
