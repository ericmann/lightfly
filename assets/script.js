$( document.getElementById( 'controls' ) ).on( 'click', 'button', function( e ) {
	var action = $( this ).text().toLowerCase();

	$.ajax( {
		'url': '/e11i0t',
		'method': 'post',
		'data': {
			'action': action
		}
	} );
} );