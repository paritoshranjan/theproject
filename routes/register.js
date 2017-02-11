exports.openregistration = function(req, res) {
	res.render('register', {});
};

exports.saveregistration = function(req,res) {	
	console.log("Saving registration for user");
	
	var path = require('path');
	var pathToMainContractorsJson = 'data/maincontractors.json';
	var pathToSubContractorsJson = 'data/subcontractors.json';
	var pathToJson;
	
	if(req.body.type == "maincontractor"){
		pathToJson = pathToMainContractorsJson;
	}else{
		pathToJson = pathToSubContractorsJson;
	}

	var users = require(path.resolve(pathToJson))	
	
	var user = {};
	user.name = req.body.name;
	user.company = req.body.company;
	user.address = req.body.address;
	user.email = req.body.email;
	user.phone = req.body.phone;
	user.logo = req.body.logo;		
	user.type = req.body.type;
	user.category = req.body.category;
	user.password = req.body.password;

	users.push(user);

	var fs = require('fs');

	fs.writeFile(pathToJson, JSON.stringify(users, null, 4), function (err) {					
		console.log('writing to ' + user)
		if(user.type == "maincontractor"){
			req.session.loggedIn = true;
			res.redirect("/maincontractor");
		}else{
			req.session.loggedIn = true;
			res.redirect("/subcontractor");
		}
	}); 		
}