var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");


var app = express();
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "client"));


app.listen(PORT, function() {
    console.log("Server listening on port " + PORT);
});
