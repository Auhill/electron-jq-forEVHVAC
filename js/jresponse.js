const crc=require('crc');
const serialport = require('serialport')

//serial port
serialport.list((err, ports) => {
  console.log('ports', ports);
  if (err) {
    document.getElementById('error').textContent = err.message
    return
  } else {
    document.getElementById('error').textContent = ''
  }

  if (ports.length === 0) {
    document.getElementById('error').textContent = 'No ports discovered'
}

//this function is for testing
$("#e1label").click(function() {
    alert( "Handler for btndiv1 .click() called." );
    $("#e1label").text("clicked!");
});  

//on button click
$("button").click(function(e) {
	var b_id = $(e.target).attr('id'); 
	// alert(b_id)
	let byte1 = get_byte1(b_id);
	let message = get_message(byte1);
	alert(message.length)
	ports.forEach(port => message.write(port))
});

setInterval(send_clock(),500)

function get_message(byte1){
	//construct Bytes for Click Events
	const byte0 = new Buffer('11','hex');
	const byte234 = new Buffer('00','hex');
	const byte6 = new Buffer('0a','hex');
	let byte5 = crc.crc8(byte0,byte1,byte234,byte234,byte234);
	let message = Buffer.concat([byte0,byte1,byte234,byte234,byte234,byte5,byte6]);
	return message;
}

//Get byte1
function get_byte1(b_id){
	const id_array = [
	'e1po','e1no','e1pm','e1nm',
	'e2po','e2no','e2pm','e2nm',
	's1on','s1off','s2on','s2off','s3on','s3off',
	'e1rst','e2rst',
	'd1p','d1n','d2p','d2n','d3p','d3n','d4p','d4n','d5p','d5n',
	'd1r','d2r','d3r','d4r','d5r'
	]
	let id_index = id_array.indexOf(b_id)

	const label_list = [
	'l_e1','l_e2','l_s1','l_s2','l_s3','l_d1','l_d2','l_d3','l_d4','ld5'
	]

	//change the label text
	if (id_index >= 0){
		if ((id_index<4)||(id_index==14)){
			label_index = 0
		}else if((id_index<8)||(id_index==15)){
			label_index = 1
		}else if(id_index<10){
			label_index = 2
		}else if(id_index<12){
			label_index = 3
		}else if(id_index<14){
			label_index = 4
		}else if((id_index<18)||(id_index==26)){
			label_index = 5
		}else if((id_index<20)||(id_index==27)){
			label_index = 6
		}else if((id_index<22)||(id_index==28)){
			label_index = 7
		}else if((id_index<24)||(id_index==29)){
			label_index = 8
		}else if((id_index<26)||(id_index==30)){
			label_index = 9
		}else{
			alert("index out of range!")
		}
	$("#"+label_list[label_index]).text(id_array[id_index]+"clicked!");

		let event_order = id_index+1;
		let byte1 = new Buffer(event_order.toString(),'hex');
	}else{
		alert('id not found!');
		let byte1 = new Buffer('00','hex');
	}
	return byte1;
}

//clock
function send_clock(){
	const byte0 = new Buffer('13','hex');
	const byte6 = new Buffer('0a','hex');
	const byte15 = new Buffer('00','hex');	
	const message = Buffer.concat([byte0,byte15,byte15,byte15,byte15,byte15,byte6]);
	ports.forEach(port => message.write(port))
}