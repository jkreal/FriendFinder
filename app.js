var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var path = require("path");


var app = express();
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

var PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/public"));


app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
});
