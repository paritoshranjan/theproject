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
	var inviteFile = "/data/" + mc + "/" + project + "/inivitations.json" ;
	fs.readFile(inviteFile)
	console.log("")
	res.render("viewInviteForSubcontract",{});
}