require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/router');

var cookieParser = require('cookie-parser')

let middlewareLocale = function(req,res,next){
   let lang = req.cookies.lang;
   if(lang === undefined){
      lang = "id";
   }
   const fs = require('fs-extra')
   const locales = fs.readJsonSync('./locales/'+ lang +'.json')
   //const locales = localesId;
   req.locales = locales;
   req.lang = lang;
   next();
}


const app = express();

//MIDDLEWARE REQUEST
// gunakan body parser sebgai middleware
app.use(bodyParser.json());
//console.log(process.env.NODE_ENV);
app.use(bodyParser.urlencoded({ extended: true}));
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));
app.use(cookieParser())
app.use(middlewareLocale);


console.log(process.env.SERVER)
app.use(router); 


var server = app.listen(8965, function () {
   //var host = "10.144.250.10"
   var host = "localhost"
   var port = server.address().port
   
   console.log("app listening at http://%s:%s", host, port)
})
