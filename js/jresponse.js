const crc=require('crc');
$("#e1label").click(function() {
    alert( "Handler for btndiv1 .click() called." );
    $("#e1label").text("clicked!");
});  
$("button").click(function(e) {
	var b_id = $(e.target).attr('id'); 
	// alert(b_id)
	byte1 = get_byte1(b_id);
	message = get_message(byte1);
});

function get_message(byte1){
	//construct Bytes for Click Events
	byte0 = new Buffer('11','hex');
	byte234 = new Buffer('00','hex');
	byte6 = new Buffer('0a','hex');
	byte5 = crc.crc8(byte0,byte1,byte234,byte234,byte234);
	message = Buffer.concat([byte0,byte1,byte234,byte234,byte234,byte5,byte6]);
	return message;
}

//Get byte1
function get_byte1(b_id){
	id_array = [
	'e1po','e1no','e1pm','e1nm',
	'e2po','e2no','e2pm','e2nm',
	's1on','s1off','s2on','s2off','s3on','s3off',
	'e1rst','e2rst',
	'd1p','d1n','d2p','d2n','d3p','d3n','d4p','d4n','d5p','d5n',
	'd1r','d2r','d3r','d4r','d5r'
	]
	id_index = id_array.indexOf(b_id)
	console.log(id_index)
	if (id_index >= 0){
		event_order = id_index+1;
		byte1 = new Buffer(event_order.toString(),'hex');
	}else{
		alert('id not found!');
		byte1 = new Buffer('00','hex');
	}
	return byte1;
}