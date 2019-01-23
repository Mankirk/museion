const express = require( "express" );
const bodyParser = require( "body-parser" );
const path = require( "path" );
const config = require( "./config" );

const app = express();
const port = process.env.PORT || config.port;

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( express.static( path.join( __dirname, "../public" ) ) );

require( "./config/routes" )( app );

app.listen( port, console.log( "server online at port:", port ) );
