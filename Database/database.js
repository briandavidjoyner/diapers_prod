//For Local Testing, $rhc port-forward diapers

//Modules
var Promise = require('promise');
var mongoose = require('mongoose');
mongoose.Promise = require('promise');

//Creds
var username = process.env.MONGODB_USER;
var key = process.env.MONGODB_PASSWORD;
var ip = '127.0.0.1';
var port = 27017;
var database = process.env.MONGODB_DATABASE || 'datastore';

//connect to DB
mongoose.connect('mongodb://' + username + ':' + key + '@' + ip + ':' + port + '/' + database);
var db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('db connected');
});

//model Schema
var item = mongoose.model('item',{
  vendor: {type: String, required: true},
  brand: {type: String, required: true},
  url: {type: String, required: true},
  image: {type: String, required: true},
  price: {type: String, required: true},
  units: {type: String, required: true},
  pricePerUnit: {type: String, required: true},
  size: {type: String, required: true},
  time: {type: Date, default: Date.now}
});

//retrieve
exports.retrieve = function(){
  return new Promise(function(resolve,reject){
    item.find(function(err,docs){
      if (err) {
        reject (err);
      } else {
        resolve (docs);
      }
    });
  });
};

exports.search = function(type,query){
  return new Promise(function(resolve,reject){
    var _query;
    if (type === 'brand'){
      _query = { brand: query };
    } else if (type === 'size') {
      _query = { size: query };
    } else if (type === 'both') {
      _query = query;
    } else {
      reject ('undefined type of query');
    }

    item.find(_query,function(err,docs){
      if (err) {
        reject (err);
      } else {
        resolve (docs);
      }
    });
  });
};

//add
exports.add = function(items){
  return new Promise(function(resolve,reject){
   if (items.length > 0){ 
    item.insertMany(items)
      .then(function(docs) {
         resolve(docs);
    }).catch(function(err) {
        reject (err);
    });
  } else {
    //console.log('no addition');
    resolve ();
  }
  });
};

//delete
exports.remove = function(){
  return new Promise(function(resolve,reject){
    item.remove({})
      .then(function(result){
        resolve();
      }).catch(function(err){
        reject (err);
      });
  });
}

//return unique values from a collection
exports.unique_field_value = function(field){
  return new Promise(function(resolve,reject){
    item.distinct(field)
      .then(function(result){
        resolve(result);
      }).catch(function(err){
        reject(err);
      });
  });
}