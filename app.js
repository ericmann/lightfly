/**
 * LightFly Application for web-controlled Christmas lights
 *
 * @author Eric Mann <eric@eamann.com>
 */

/**
 * Module dependencies
 */
var express = require( 'express' ),
	parser = require( 'body-parser' ),
	Sparky = require( 'sparky' );

// Load environment
require( 'dotenv' ).load();

/**
 * General application
 */
var app = express();
app.use( parser.json() );
app.use( parser.urlencoded( { extended: true } ) );

/**
 * Particle setup
 */
var minibug = new Sparky( {
	deviceId: process.env.DEVICE_ID,
	token: process.env.DEVICE_TOKEN
} );

/**
 * Module variables
 */
var router = express.Router(),
	path = __dirname + '/views/',
	state = 'off';

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

	var controller = new Promise( function( fulfill, reject ) {
		switch( action ) {
			case 'on':
				if ( 'off' !== state ) {
				console.log( 'I think the lights are already on!' );
				}

				// Turn 'em on!
				minibug.run( 'led', 'on', function() {
					state = 'on';
					fulfill();
				} );
				break;
			case 'off':
				if ( 'on' !== state ) {
					console.log( 'I think the lights are already off!' );
				}

				// Turn 'em off!
				minibug.run( 'led', 'off', function() {
					state = 'off';
					fulfill();
				} );
				break;
			default:
				console.log( 'invalid command' );
				fulfill();
		}
	} );

	controller.then( function() {
		res.sendStatus( 200 );
	} );
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