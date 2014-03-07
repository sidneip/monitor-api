var request = require("request"),
	mongoose = require('mongoose'),
	dbURI = 'mongodb://localhost/websites',
	fs = require('fs');

var websiteSchema = mongoose.Schema({
	url: String
});
var Website = mongoose.model('Website', websiteSchema);

function getdb(){
	mongoose.connect(dbURI);
	return mongoose.connection;
}

function disconect(){mongoose.disconect};

exports.testdb = function(req, res){
	db = getdb();
	db.on('error', function(){
		console.error.bind(console, 'connection error:');
		res.end('falha');
	});
	db.once('open', function callback(){
		res.JSON('success');
	});
}





/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.add = function(req, res){
	var url = req.param('website'),
		db = getdb();
	var newEntry = new Website({url: url});
	disconect();
	Website.findOne({url:'google.com.br'});
	console.log(Website);
	res.json('index', newEntry);
	// fs.appendFile(filename, JSON.stringify(url, null, 4), function(err){
	// 	if(err){
	// 		console.log(err);
	// 		res.json('index', {error: 'Não conseguimos salvar a url'});
	// 	}else{
	// 		console.log("URL ADICIONADA AO MONITOR");
	// 		res.json('index',{msg: 'URL Adicionada ao monitor'});
	// 	}
	// })
};

exports.test = function(req, res){
  website = "http://"+req.param('website');
  console.log(website);
  var start = new Date();
  request(website, function(error, response, body){
  	responseTime = new Date() - start;
  	if(typeof response === 'undefined') {
  		res.json('index', {error: 'Endereço não responde'});
  	}else if(res.statusCode === 404){
  		res.json('index', {error: 'Url Incorreta', msg: 'utilize http://localhost/test/link'});
  	}else{
  		res.json('index', { webaddress: website, status: response.statusCode, timeRespose: responseTime });
 	} 
  })
};

exports.all = function(req, res){
	var file = fs.readFile(filename, function(err, data){
		if(err) throw err;
		var json = JSON.parse(data),
			sites = json.website,
			resJson = JSON.parse('{"status": "success", "websites" : []}');

		for(var i = 0; i < sites.length; i++){
			(function(){
				var _website = sites[i];
				console.log(_website);
				request("http://"+_website, function(error, response, body){
					var website = {};
					website.url = "http://"+_website;
					if(error) website.error = error
					else website.status = response.statusCode
					resJson.websites.push(website);
					if(sites.length === resJson.websites.length){
						res.json('index', resJson);
					}
				});
			})();
		}
	});
};