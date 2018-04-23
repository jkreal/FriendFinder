module.exports = function (app) {

    app.get("/api/friends", function (req, res) {

    });

    app.post("/api/friends/post", function (req, res) {
        var friend = req.params.friend;
    });
    
}