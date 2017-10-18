var Promise = require('promise');
//


//Cleaning Function

exports.clean = function(input){
	return new Promise(function(resolve,reject){
		var toReturn = [];
		var length = input.length;
		try {
			for (i = 0; i < length; i++){
				var _data = input[i];
				var item = {
					vendor : _data.vendor,
					brand :	_data.brand,
					url : _data.url,
					image : _data.image,
					price : _data.price,
					units : _data.units,
					pricePerUnit : _data.pricePerUnit,
					size : _data.size
				}
				if (item.vendor !=undefined &&
					item.brand !=undefined &&
					item.url !=undefined && 
					item.image !=undefined && 
					item.price !=undefined &&
					item.size !=undefined && 
					item.size != 'unknown' && 
					isNaN(item.size) != true && 
					item.units > 10){

					toReturn.unshift(item);

				} else {
					//console.log(item);
				}
				if (i === length - 1) {
					resolve (toReturn);
				}
			}
		}
		catch (err) {
			reject (err);
		}
	});
};

//Standarizing Functions

exports.amazon = function(input){
	return new Promise(function(resolve,reject){

		var time = new Date();
		var array = input;
		var end = array.length;
		var _array = [];
		var processed = 0;
		try {
			for (var i in array){
			//array.forEach(function(value, index){
				if ( array[i].ItemAttributes != undefined &&
					 array[i].ItemAttributes.Title.match(/wipes/gi) == null && 
					 array[i].DetailPageURL != undefined && 
					 array[i].ImageSets != undefined &&
					 array[i].ImageSets.ImageSet != undefined  && 
					 array[i].ImageSets.ImageSet[0] != undefined &&
					 array[i].OfferSummary != undefined &&
					 array[i].OfferSummary.LowestNewPrice != undefined ) {
					_array.push({
						vendor: 'Amazon',
						brand : array[i].ItemAttributes.Brand,
						url : array[i].DetailPageURL,
						image : array[i].ImageSets.ImageSet[0].MediumImage.URL,
						price : array[i].OfferSummary.LowestNewPrice.FormattedPrice,
						units : parseInt(array[i].ItemAttributes.Title.match(/\d+(?=\s)/)),
						pricePerUnit : ((array[i].OfferSummary.LowestNewPrice.Amount)/(parseInt(array[i].ItemAttributes.Title.match(/\d+(?=\s)/)))/(100)).toFixed(2),
						size : parseInt(array[i].ItemAttributes.Size),
						time : time
					});
				}
			processed++;

			if (processed === end && _array.length > 0){
				//console.log('done');
				resolve (_array);
			} else if (processed === end){
				resolve ([{ size : 'unknown'}]);
			}

			}
			//});
		} catch (err){
			console.log('index = ' + i + 'error = ' + err);
			reject(err);
		}
	});
};

exports.walmart = function(input){
	return new Promise(function(resolve,reject){
		
		var time = new Date();
		var array = input;
		var end = array.length;
		var _array = [];
		var processed = 0;
		try {
			for (var i in array){
				if ( array[i].imageEntities != undefined && array[i].imageEntities[0] != undefined &&
					 array[i].attributes != undefined &&  array[i].attributes.numberOfPieces != undefined) {
			//array.forEach(function(value, index){
					//console.log(i);
					_array.push({ 
						vendor: 'Walmart',
						brand : array[i].brandName,
						url : array[i].productTrackingUrl,
						image : array[i].imageEntities[0].mediumImage,
						price : '$' + (array[i].salePrice).toFixed(2),
						units : array[i].attributes.numberOfPieces.match(/^(\d+)/)[0],
						pricePerUnit : ((array[i].salePrice) / (parseInt(array[i].attributes.numberOfPieces.match(/^(\d+)/)[0]))).toFixed(2),
						//size : parseInt(array[i].name.match(/\d+(?=\s)/)), Quick Fix For Walmart Size Issue | Did They Clean Up Their Data? 5.13.2017
						size : parseInt(array[i].size.split(' ')[1]),
						time : time
					});
				}
			processed++;

			if (processed === end){
				//console.log('done')
				resolve (_array);
			} else if (processed === end && _array.length > 0){
				resolve ([{ size : 'unknown'}]);
			}

			}
			//});
		} catch (err){
			console.log('index = ' + i + 'error = ' + err);
			reject(err);
		}
	});
};
