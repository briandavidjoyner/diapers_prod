var Promise = require('promise');
var aws = require("../../node_modules/aws-lib/lib/aws");
var yourAccessKeyId = process.env.amazonAccessKeyId;
var yourSecretAccessKey = process.env.amazonSecretAccessKey; 
var yourAssociateTag = 'diapersforles-20';
var amazon = require('./item_types.js');  //Expand Item Types

//Indiviual Brand Lookup
var lookup = function(brand,page){
		if (page == undefined){
			var page = '1';
		} else {
			var page = page;
		}
		return new Promise(function(resolve,reject){
		//console.log(page);
		var prodAdv = aws.createProdAdvClient(yourAccessKeyId, yourSecretAccessKey, yourAssociateTag);
		prodAdv.call('ItemSearch', 
		{
			SearchIndex: "Baby",
			Brand: brand,
			Keywords: "DISPOSABLE DIAPERS",
			Title: "diaper",
			Availability: "Available", 
			Sort: "psrank", 
			ResponseGroup:"Images,ItemAttributes,Offers,BrowseNodes",
			ItemPage : page
		}, 
			function(err, result) {
				//console.log('finish');
			  	if (err){
			  		//console.log('amazon error');
			  		reject (err);
			  	} else if (parseInt(result.Items.TotalResults) > 0) {
			  		//console.log(result.Items.TotalResults);
			  			resolve (result.Items.Item);
			  	} else {
			  		//console.log(result.Items.TotalResults);
			  		resolve (['nothing']);
			  		//reject (result.Items.Request.Errors.Error.Message);
			  	}
			});
		})
};

//New Amazon
var lookup_new = function(brand,title,page){

	return new Promise(function(resolve,reject){
		if (brand == undefined && page == undefined && product == undefined && title == undefined){
			reject ('Brand, Page, or Title is not defined');
		} else {
			var prodAdv = aws.createProdAdvClient(yourAccessKeyId, yourSecretAccessKey, yourAssociateTag);
			prodAdv.call('ItemSearch', 
			{
				SearchIndex: "Baby",
				Brand: brand,
				Keywords: "DISPOSABLE DIAPERS",
				Title: title,
				Availability: "Available", 
				Sort: "psrank", 
				ResponseGroup:"Images,ItemAttributes,Offers,BrowseNodes",
				ItemPage : page
			}, 
			function(err, result) {
			  	if (err){
			  		reject (err);
			  	} else if (parseInt(result.Items.TotalResults) > 0) {
			  			resolve (result.Items.Item);
			  	} else {
			  		resolve (result);
			  	}
			});
		}	
	});
};

exports.Lookup = lookup;
exports.NewLookup = lookup_new;
