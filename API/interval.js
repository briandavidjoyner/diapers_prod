//lookups
var amazon = require('./lookups/amazon.js').Lookup;
var wally = require('./lookups/walmart.js');

//standardization
var standard = require('./standards.js');
var database = require('../Database/database.js');

//Promise Library
var Promise = require('promise');

//Interval
var interval = 600000;

var amazonL = function(brand,page){
	return new Promise(function(resolve,reject){
		amazon(brand,page)
		.then(function(result){
			//console.log('1');
			return standard.amazon(result);
		}).then(function(result){
			//console.log('2');
			return standard.clean(result);
		}).then(function(result){
			//console.log('3');
			return database.add(result)
		}).then(function(result){
			//console.log('4');
			setTimeout(function(){       //Adding A Way To Control Velocity Of API Calls
				resolve (result);
			},1000);
		}).catch(function(error){
			reject (error);
		});
		setTimeout(function(){
			//reject ('timeout');
			resolve ('timeoutA');
		},20000);
	});
};

var walmart = function(){
	return new Promise(function(resolve,reject){
		wally.search()
		.then(function(result){		
			return standard.walmart(result);
		}).then(function(result){
			return standard.clean(result);
		}).then(function(result){
			return database.add(result)
		}).then(function(result){
			resolve (result);
		}).catch(function(error){
			reject (error);
		});
		setTimeout(function(){
			//reject ('timeout');
			resolve ('timeoutW');
		},20000);
	});
};

var toExecute = function(){
	return new Promise(function(resolve,reject){
		database.remove().then(function(){
			return amazonL('Huggies','1');
		}).then(function(){
			return amazonL('Pampers','1');
		}).then(function(){
			return amazonL('Luvs','1');
		}).then(function(){
			return amazonL('Huggies','2');
		}).then(function(){
			return amazonL('Pampers','2');
		}).then(function(){
			return amazonL('Luvs','2');
		}).then(function(){
			return amazonL('Huggies','3');
		}).then(function(){
			return amazonL('Pampers','3');
		}).then(function(){
			return amazonL('Luvs','3');
		}).then(function(){
			return amazonL('The&20Honest&20Company','1');
		}).then(function(){
			return amazonL('Huggies','4');
		}).then(function(){
			return amazonL('Pampers','4');
		}).then(function(){
			return amazonL('Luvs','4');
		}).then(function(){
			return amazonL('Huggies','5');
		}).then(function(){
			return amazonL('Pampers','5');
		}).then(function(){
			return amazonL('Luvs','5');
		}).then(function(){
			return amazonL('Bambo Nature');
		}).then(function(){
			return walmart();
		}).then(function(){
			resolve ();
		}).catch(function(err){
			console.log('There is an error querying Amazon or Walmart');
			reject(err);
		});
	});
}

//Execute
toExecute().then(function(){
	console.log('started');
}).catch(function(err){
	console.log(err);
});

setInterval(function(){
	toExecute();
}, interval);

module.exports.walmart = walmart;
