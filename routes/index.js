var request = require("request");
var fs = require('fs');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.add = function(req, res){
	var data = {website: req.param('website')};
	var filename = './sites.json';
	fs.appendFile(filename, JSON.stringify(data, null, 4), function(err){
		if(err){
			console.log(err);
			res.json('index', {error: 'Não conseguimos salvar a url'});
		}else{
			console.log("URL ADICIONADA AO MONITOR");
			res.json('index',{msg: 'URL Adicionada ao monitor'});
		}
	})
};

exports.test = function(req, res){
  website = "http://"+req.param('website');
  console.log(website);
  request(website, function(error, response, body){
  	if(res.statusCode === 404){
  		res.json('index', {error: 'Url Incorreta', msg: 'utilize http://localhost/test/link'});
  	}else{
  		res.json('index', { webaddress: website, status: response.statusCode });
 	} 
  })
};

exports.all = function(req, res){
	var file = fs.readFile('./sites.json', function(err, data){
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