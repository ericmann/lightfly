$( document.getElementById( 'controls' ) ).on( 'click', 'button', function( e ) {
	var action = $( this ).text().toLowerCase();

	$.ajax( {
		'url': '/control',
		'method': 'post',
		'data': {
			'action': action
		}
	} );
} );