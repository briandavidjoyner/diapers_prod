var express = require('express');
var app = express();
var Promise = require('promise');
//var db = require('./Database/database.js');
//var start = require('./API/interval.js');
//var email = require('./API/email/mailchimp.js');
var bodyParser = require('body-parser');
var sm = require('sitemap');


//OpenShift Settings
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

/*
/////////////////////////////////////
Routing
//////////////////////////////////////
*/

//App Configurations

//App Middleware
app.use(require('prerender-node').set('prerenderToken', 'LKwpFQIjf1P3WG8uNEnD'));

var sitemap = sm.createSitemap({
	hostname: 'http://www.diapersdiapers.com',
	cacheTime: 600000,
	urls: [
		{url: '/', changefreq: 'daily', priority: 1},
		{url: '/about', changefreq: 'monthly', priority: .9},
		{url: '/brand/Pampers', changefreq: 'daily', priority: .9},
		{url: '/brand/Huggies', changefreq: 'daily', priority: .9},
		{url: '/brand/Luvs', changefreq: 'daily', priority: .9},
		{url: '/guide/amazon_diaper_deals', changefreq: 'daily', priority: .9}
	]		
});

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /9b1722d.html");
});


//Body Parsing For Data
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));


//Testing functions

//Static Files
app.use('/public', express.static(__dirname + '/ClientSide'));

//App Sitemap
app.get('/sitemap.xml', function(req,res){
	sitemap.toXML( function(err,xml){
		if (err) {
			return res.status(500).end();
		}
		res.header('Content-Type','application/xml');
		res.send(xml);
	});
});

//Removed For Migration
//App Database API
/*	app.get('/api/remove', function(req,res){
		db.remove().then(function(result){
			res.send('removed');
		}).catch(function(err){
			res.send(err);
		});
	});

	app.get('/api/getitems', function(req,res){
		var items = db.retrieve().then(function(result){
			res.send(result);
		});
	});

	app.get('/api/getitemsbybrand/:brand', function(req,res){
		var items = db.search('brand', req.params.brand).then(function(result){
			res.send(result);
		});
	});

	app.get('/api/getitemsbysize/:size', function(req,res){
		var items = db.search('size', req.params.size).then(function(result){
			res.send(result);
		});
	});

	app.get('/api/getitemsbyboth/:brand/:size', function(req,res){
		var items = db.search('both', {
			brand : req.params.brand, 
			size : req.params.size 
		}).then(function(result){
			res.send(result);
		});
	});

	app.get('/api/getsizes/:query', function(req,res){
		var sizes = db.unique_field_value(req.params.query).then(function(result){
			res.send(result);
		});
	})

	app.get('/api/random', function(req,res){
		var number = parseFloat((Math.random()*100).toFixed(2));
		var y_n  = (number > 50) ? ('yes') : ('no');
		var toSend = {'show' : y_n, 'score' : number};
		res.append('Access-Control-Allow-Origin','*');
		res.json(toSend);
	});

	app.get('/api/wm', function(req,res){
		var wally = require('./API/lookups/walmart.js');
		wally.search().then(function(results){
			res.json(results);
		});
	});

	app.get('/api/am/brand/:brand/title/:title/page/:page', function(req,res){
		var amazon = require('./API/lookups/amazon.js');
		amazon.NewLookup(req.params.brand,req.params.title,req.params.page).then(function(results){
			console.log(req.params.title);
			res.json(results);
		}).catch(function(err){
			console.log(req.params.title);
			res.json(err);
		});
	});

	app.get('/api/am/:brand', function(req,res){
		var amazon = require('./API/lookups/amazon.js');
		amazon.Lookup(req.params.brand,1).then(function(results){
			res.json(results);
		});
	});
*/

//App Email Submit API
//		app.post('/api/email', function(req,res){
//			console.log(req.body.address + ' ' + req.body.brand + ' ' + req.body.size);
//			email.subscribe(req.body.address, req.body.brand, req.body.size).then(function(result){
//				res.json(result);
//			});
//		});

//App Frontend Routes
app.get('/19b1722d.html', function(req, res){
	res.sendFile(__dirname + '/ClientSide/views/content/verification.html'), function(err){
		console.log('Oh boy - this failed!');
	}
});

app.get('*', function(req,res){
	res.sendFile(__dirname + '/ClientSide/views/redesign/index.html'), function(err){
		console.log('Oh boy - this failed!');
	}
});

//App Start
app.listen(port, ipaddress, function(){
	console.log('listening on port: ' + port + ' and IP: ' + ipaddress);	
});