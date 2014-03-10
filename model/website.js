var mongoose = require('mongoose');

exports.websitelist = function websitelist(urlname,callback){
	var Website = mongoose.model( 'Website' );
	Website.find({'website':urlname}, function (err, websites) {
		if(err){
			console.log(err);
		}else{
			console.log(websites);
			callback("",websites);
		}
 })// end Team.find
}// end exports.teamlist

exports.findall = function findall(callback){
	var Website = mongoose.model( 'Website' );
	Website.find(function(err, websites){
		if(err){
			console.log(err);
		}else{
			console.log(websites);
			callback("",websites);
		}
	});
}

exports.adduri = function adduri(urilink){
	var Website = mongoose.model( 'Website' );
	var website1 = new Website({uri:urilink});
	website1.save(function(err){
		if (err) {
			throw err;
		}else{
			console.log('sucesso:'+website1);
		}

	});
}
exports.checkExist = function checkExist(urilink,callback){
	var Website = mongoose.model( 'Website' );
	Website.count({'uri':urilink}, function(err, count){
		console.log("Total encontrado: "+count);
		if(err){
			console.log(err);
		}else{
			callback("",count);
		}
	});
}

exports.deleteItem = function deleteItem(urilink){
	var Website = mongoose.model('Website');
	Website.find({'uri':urilink},function(err, websites){
		console.log("URI DELETADAS: "+ websites);
	}).remove().exec();
}

