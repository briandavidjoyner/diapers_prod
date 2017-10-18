var amazon = function(brand,page){

	var diaper = {

		SearchIndex: "Baby",
		Brand: brand,
		Keywords: "DISPOSABLE DIAPERS",
		Title: "diaper",
		Availability: "Available", 
		Sort: "psrank", 
		ResponseGroup:"Images,ItemAttributes,Offers,BrowseNodes",
		ItemPage : page

		}

	return diaper;

};

var walmart = function(brand) {

	var diaper = {

		lsPublisherId : 'pmU8BlTkv30',
		format : 'json',
		categoryId : '5427_486190_1101406',
		numItems : '25',
		responseGroup : 'full'

	}

	return diaper;

};

exports.amazon = amazon;
exports.walmart = walmart;