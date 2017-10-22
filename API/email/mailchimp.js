var MailChimpAPI = require('../../node_modules/mailchimp-api/mailchimp');
var apiKey = process.env.mailchimpAPIKey;
var list_id = process.env.mailchimpListID;
var mailchimp = new MailChimpAPI.Mailchimp(apiKey);
var Promise = require('promise');


exports.subscribe = function(email, brand, size){
  
  return new Promise(function(resolve,reject) {
    
    mailchimp.lists.subscribe({
  		id: list_id, 
  		email:{ email:email },
  		double_optin: false,
  		update_existing: true,
      merge_vars:{
        Size:size, 
        Brand:brand
      }
  	}, function(data) {
      	resolve ({'status':'success'});
    },
    function(error) {
      	if (error.error) {
          resolve (error);
      	} else {
          resolve ({'status':'error'});
    	  }
	  });
  });
};