
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const cors = require('cors');
//import cors from 'cors';


//var express = require('express')
//var cors = require('cors')
//var app = express()

app.use(cors())

/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  
/*
app.use(cors({
    origin: 'https://github.com/NigthDragon5000'
  }));

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://github.com/NigthDragon5000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 


 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://github.com/NigthDragon5000/deep_learning_js/blob/master/model.json"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
/*
 var corsOptions = {
    origin: 'https://github.com/NigthDragon5000/deep_learning_js/blob/master/model.json',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
*/

app.get('/', (req, res,next) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

