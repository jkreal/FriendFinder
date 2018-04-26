var people = require('./data.js');


function difference(compareArray) {

    var peopleArray = [];
    for (var i = 0; i < people.people.length; ++i) {
        var differenceArray = [];
        for (var j = 0; j < people.people[i].scores.length; ++j) {
            differenceArray.push(Math.abs(compareArray[j] - people.people[i].scores[j]));
        }

        var total = 0;
        for (var j = 0; j < differenceArray.length; ++j) {
           total += differenceArray[j];
        }


        peopleArray.push(total);

        total = 0;

    }

    var lowest = 1000;
    var lowestPos = 0;
    for (var i = 0; i < peopleArray.length; ++i) {
        if (peopleArray[i] < lowest) {
            lowest = peopleArray[i];
            lowestPos = i;
        }
    }

    return people.people[lowestPos];
}


module.exports = function (app) {


    app.get("/api/friends", function (req, res) {
        res.json(JSON.stringify(people));
    });


    app.post("/api/friends/match", function (req, res) {
        var data = JSON.parse(req.body.scores);
        res.send(JSON.stringify(difference(data)));
    });


}