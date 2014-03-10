var request = require("request"),
	mongoose = require('mongoose'),
	dbURI = 'mongodb://localhost/websites',
	fs = require('fs'),
	website1 = require('../model/website');

mongoose.set('debug', true);


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.add = function(req, res){
	var url = req.param('website');
	website1.checkExist(url, function(err, count){
	if(count === 0){
		website1.adduri(url);
		console.log("URL ADICIONADA AO MONITOR: "+url);
		res.json('index',{msg: 'URL Adicionada ao monitor: '+url});
	}else{
		console.log("URL JA EXISTE: "+url);
		res.json('index',{msg: 'URL JA CADASTRADA: '+url});
	}
});
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

exports.todos = function(req, res){
	website1.findall(function(err, websites){
		res.json('index', {websites:websites})
	});
}

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