

exports.maincontractor = function(req, res) {
	res.render('maincontractor', {});
};

exports.mcnewproject = function(req, res) {
	res.render('mcnewproject', {});
};

exports.savemcnewproject = function(req, res) {
	console.log("Savind new project");

	var tenderFile;  

	if (!req.files) {
		res.send('No files were uploaded.');
		return;
	}

	tenderFile = req.files.tenderFile;
	console.log("File: " + tenderFile);

	tenderFile.mv('tender1.xls', function(err) {
		if (err) {
			res.status(500).send(err);
		}
		else {   	
			console.log("File uploaded successfully.");
			var json = parseFiles(tenderFile);
			res.render('mcassignsc', {tender:json});
		}
	});
};

function parseFiles(){
	var xlsx = require('node-xlsx');	

	var parsedObject = {};
	
	var jsonObj = xlsx.parse('tender1.xls'); 
	for(var item of jsonObj) {		
		
		var data = item.data;
		
		console.log("Headers: " + data[0])
		var headers = data[0];
		for(var count=1;count < data.length;count++){	
			var line = data[count];
			if(line[0]){				
				var category = line[0];								
				if(!parsedObject[category]){
					var categoryJson = [];
					parsedObject[category] = categoryJson;
				}
			}else{
				if(line.length > 0){
					var subcategory = line;
					var columns = subcategory.toString().split(',');					
					var subcategoryfields = columns.slice(1);
					var subcategoryheaders = headers.slice(1);
					var subcategoryjson = {};
					for(var i=0;i<headers.length;i++){			
						if(!subcategoryfields[i]){
							subcategoryfields[i] = "-";
						}				
						subcategoryjson[subcategoryheaders[i]] = subcategoryfields[i];
					}

					var storedCategoryJson = parsedObject[category];
					storedCategoryJson.push(subcategoryjson);
					parsedObject[category] = storedCategoryJson;
				}
			}				
		}		
	}	
	fs = require('fs')
	fs.writeFile('tender.json', JSON.stringify(parsedObject, null, 4), function (err,data) {
		if (err) {
			return console.log(err);
		}
		console.log("File json saved");
	});
	return parsedObject;
}