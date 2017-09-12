$("#btn1div").click(function() {
    alert( "Handler for btndiv1 .click() called." );
});  
$("#btn2").click(function() {
    alert( "Handler for bnt2 .click() called." );
});
$("td").click(function() {
	alert( "Handler for TD .click() called." );
	$( this ).slideUp();
});   