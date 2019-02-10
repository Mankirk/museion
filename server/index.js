const express = require( "express" );
const bodyParser = require( "body-parser" );
const cors = require( "cors" );
const path = require( "path" );
const config = require( "./config" );
const customResponses = require( "./middlewares/customResponses" );

const app = express();
const port = process.env.PORT || config.port;

app.use( cors( {
    origin: "http://localhost:8080",
    credentials: true,
} ) );

require( "./models/product" );
require( "./models/category" );
require( "./models/subcategory" );
require( "./models/section" );
require( "./models/sitemap" );

// app.use( ( req, res, next ) => {
//     console.log( "REQUEST----------------" );
//     console.log( "url: ", req.url );
//     console.log( "method: ", req.method );
//     console.log( "-----------------------" );
//
//     next();
// } );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( express.static( path.join( __dirname, "../public" ) ) );
app.use( customResponses );

require( "./config/mongoose" )( app );
require( "./config/routes" )( app );

app.get( "/*", function( req, res ) {
    res.sendFile( path.join( __dirname, "../public/index.html" ), function( err ) {
        if ( err ) {
            res.status( 500 ).send( err );
        }
    } );
} );

app.listen( port, console.log( "server online at port:", port ) );
