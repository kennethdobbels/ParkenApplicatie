/*
 * npm init
 * npm install express --save
 * npm install request --save
 * npm install ejs --save
 *
 * node(mon) index.js
 */

var express = require('express');
var request = require('request');
var path = require('path');

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static('public'));

app.listen(3000, function() {
  console.log('Node luistert op poort 3000');
});

console.log("Webserver draait");

var data;
request('https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek6/MapServer/670/query?where=1%3D1&outFields=NAAM,BEHEERDER,SHAPE,SHAPE_Length,SHAPE_Area,POSTCODE,DISTRICT,STRAATNAAM,TYPE,OBJECTID&outSR=4326&f=json',
  function(error, response, body){
    data = JSON.parse(body);
    data = data.features;

    for(var i=0; i < data.length; i++) {
        /*console.log("naam: " + data.features[i].attributes.naam);
        console.log("coord: " + data.features[i].geometry.x + ", " + data.features[i].geometry.y);
        console.log("");*/
        console.log(data[i].attributes.NAAM);
    }

  }
);

app.get('/', function(req, res){
  res.render('parken', {
    parken: data
  });
});

//test famke
