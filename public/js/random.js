var result


$( "#randomOne" ).on( "click", "tr", function() {
    console.log( $( this ).text() );
    var startingNbr = $('#startingNumber').val().trim();
    var endingNbr = $('#endingNumber').val().trim();
  });
