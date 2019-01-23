const express = require( "express" );

const router = express.Router();

router.get( "/", ( req, res ) => {
    res.json( { success: true, baseRoute: "This is Base Route!" } );
} );

router.get( "/test", ( req, res ) => {
    res.send( { succcess: true, mess: "test is working" } );
} );

module.exports = app => {
    app.use( "/", router );
};
