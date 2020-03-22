
let express = require("express");
let app = express();

app.use(express.static("./static"));

app.listen(8080, function() {
    console.log("Listening on port 8080");
});

//https://teachablemachine.withgoogle.com/models/YZIWGg6E/