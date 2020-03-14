
let express = require("express");
let app = express();

app.use(express.static("./static"));

app.listen(81, function() {
    console.log("Listening on port 81");
});

//https://teachablemachine.withgoogle.com/models/YZIWGg6E/