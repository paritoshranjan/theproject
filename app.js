var express = require('express')
, http = require('http')
, path = require('path');

var login = require("./routes/login");
var register = require("./routes/register");
var maincontractor = require("./routes/maincontractor");
var subcontractor = require("./routes/subcontractor");


var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');

var session = require('express-session');
var cookieParser = require('cookie-parser'); 

var app = express();
var fileUpload = require('express-fileupload');

app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(session({
	secret: 'thisisasecretkey',
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false }
}));
app.use(fileUpload());

if ('development' === app.get('env')) {
	app.use(errorhandler());
}

app.get("/login", login.login);
app.get("/register", register.openregistration);
app.post("/saveregistration", register.saveregistration);

app.get("/maincontractor",maincontractor.maincontractor);
app.get("/mcnewproject",maincontractor.mcnewproject);
app.post("/savemcnewproject",maincontractor.savemcnewproject);
app.post("/inviteSubcontracts", maincontractor.inviteSubcontracts);

app.get("/subcontractor",subcontractor.subcontractor);
app.get("/sclist",subcontractor.sclist);
app.get("/viewInviteForSubcontract",subcontractor.viewInviteForSubcontract);

app.all("/*", requireLogin, function(req, res, next) {
	next(); 
});


http.createServer(app).listen(3000, function(){
	console.log('Express server listening on port ' + 3000);
});

function requireLogin(req, res, next) {	
	console.log("Hello");
	console.log(req.url);
	console.log("Is " + req.session.email+ " logged in : " + req.session.loggedIn);
	if (req.session.loggedIn) {
		next(); 
	} else {		
		res.redirect("/login"); 
	}
}
