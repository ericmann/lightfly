/**
 * LightFly Application for web-controlled Christmas lights
 *
 * @author Eric Mann <eric@eamann.com>
 */

/**
 * Module dependencies
 */
var express = require( 'express' );

/**
 * General application
 */
var app = express();

/**
 * Module variables
 */
var router = express.Router(),
	path = __dirname + '/views/';

/**
 * Configure Routes
 */
router.use( function( req, res, next ) {
	console.log( '/' + req.method );
	next();
} );

router.get( '/', function( req, res ) {
	res.sendFile( path + 'index.html' );
} );

app.use( '/lib', express.static( __dirname + '/bower_components' ) );
app.use( '/css', express.static( __dirname + '/assets' ) );
app.use( '/', router );

app.use( '*', function( req,res ) {
	res.sendFile( path + '404.html' );
} );

app.listen( 3000, function() {
	console.log( 'Live at Port 3000' );
} );