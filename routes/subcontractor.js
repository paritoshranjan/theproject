exports.subcontractor = function(req, res) {
	res.render('subcontractor', {});
};

exports.sclist = function(req, res) {
	res.render('sclist', {});
};

exports.viewInviteForSubcontract = function(req, res){
	var mc = req.query.mc;
	var project = req.query.project;
	var email = req.query.email;

	var fs = require("fs");
	var path = require("path");
	var inviteFile = "data" + path.sep + "mc" + path.sep + mc + path.sep + project + path.sep + "invitations.json" ;

	fs.readFile(inviteFile, function read(err, data) {
		if (err) {
			throw err;
		}
		inviteeJson = JSON.parse(data);
		parseLineItemsforEmail(inviteeJson, email, res);
	});
	
}

function parseLineItemsforEmail(inviteeJson, email, res){
	var lineitems = inviteeJson[email];
	console.log(lineitems);
	res.render("viewInviteForSubcontract",{"lineitems":lineitems});
}