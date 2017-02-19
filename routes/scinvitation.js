var fs = require("fs");
var path = require("path");
var mc = "";
var project = "";
var email = "";

exports.viewInviteForSubcontract = function(req, res){
	mc = req.query.mc;
	project = req.query.project;
	email = req.query.email;

	var inviteFile = "data" + path.sep + "mc" + path.sep + mc + path.sep + project + path.sep + "invitations.json" ;

	fs.readFile(inviteFile, function read(err, data) {
		if (err) {
			throw err;
		}
		inviteeJson = JSON.parse(data);
		parseLineItemsforEmail(inviteeJson[email], res);
	});
	
}

function parseLineItemsforEmail(lineitems, res){	

	var tenderFile = "data" + path.sep + "mc" + path.sep + mc + path.sep + project + path.sep + "tender.json" ;

	fs.readFile(tenderFile, function read(err, data) {
		if (err) {
			throw err;
		}
		var tenderJson = JSON.parse(data);
		getLineItemsFromTender(tenderJson, lineitems, res);
	});
	
}

function getLineItemsFromTender(tenderJson, lineitems, res){		
	var	subcontracts = {}
	for(var item in lineitems){
		
		var lineitem = lineitems[item];		
		var categoryAndItem = lineitem.split(":");
		var category = categoryAndItem[0];
		var item = categoryAndItem[1];		

		if(!subcontracts[category]){
			var selectedItemsForCategory = [];				
			subcontracts[category] = selectedItemsForCategory;
		}

		var itemsForCategory = tenderJson[category];
		
		for(var lineItemInTendor in itemsForCategory){			
			var itemInTendor = itemsForCategory[lineItemInTendor]
			console.log(item + " : " + itemInTendor["Line Item"]);			
			if(itemInTendor["Line Item"] == item){
				console.log("Selected")
				selectedItemsForCategory.push(itemInTendor)		
				subcontracts[category] = selectedItemsForCategory;										
			}			
		}				
	}	
	
	res.render("viewInviteForSubcontract",{"subcontracts":subcontracts});

}