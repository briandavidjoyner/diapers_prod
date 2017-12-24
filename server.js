var express = require('express');
var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

//Get Environmental

app.get('*', function(req,res){
	res.send(process.env);
});

//App Start
app.listen(port, ipaddress, function(){
	console.log('listening on port: ' + port + ' and IP: ' + ipaddress);	
});