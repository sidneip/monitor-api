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
	fs.writeFile(filename, JSON.stringify(data, null, 4), function(err){
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