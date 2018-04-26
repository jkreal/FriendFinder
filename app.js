var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/static', express.static('app/public'));
app.use('/data', express.static('app/data'));


require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);
app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
});
