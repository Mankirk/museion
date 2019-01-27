const express = require( "express" );

const controllers = require( "../controllers" );
const repos = require( "../repositories" );
const middlewares = require( "../middlewares" );

const router = express.Router();

router.get( "/", ( req, res ) => {
    res.json( { success: true, baseRoute: "This is Base Route!" } );
} );

router.get( "/test", ( req, res ) => {
    res.send( { succcess: true, mess: "test is working" } );
} );

router.get( "/getProducts", repos.product.getProducts, controllers.product.getProducts );
router.post( "/createProduct", repos.product.createProduct, controllers.product.create );
router.post( "/editProduct", repos.product.editProduct );
router.delete( "/deleteProduct", repos.product.deleteProduct );

module.exports = app => {
    app.use( "/", router );
};
