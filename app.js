/**
 * LightFly Application for web-controlled Christmas lights
 *
 * @author Eric Mann <eric@eamann.com>
 */

/**
 * Module dependencies
 */
var express = require( 'express' ),
	parser = require( 'body-parser');

/**
 * General application
 */
var app = express();
app.use( parser.json() );
app.use( parser.urlencoded( { extended: true } ) );

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

router.post( '/control', function( req, res ) {
	var action = req.body.action;
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