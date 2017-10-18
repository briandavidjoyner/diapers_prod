//Dependencies
var walmartAPIKey = process.env.walmartAPIKey;
var walmart = require('walmart')(walmartAPIKey);
var Promise = require('promise');

//Hardcoding Queries
var query = 'Diapers';
var extras = {
		lsPublisherId : 'pmU8BlTkv30',
		format : 'json',
		categoryId : '5427_486190_1101406',
		numItems : '25',
		responseGroup : 'full'
	};

exports.search = function(){
	return new Promise(function(resolve,reject){
		walmart.search(query,extras).then(function(data){
			//console.log('2');
			resolve (data.items);
		}).catch(function(err){
			console.log(err);
			reject (err);
		});
	});
}