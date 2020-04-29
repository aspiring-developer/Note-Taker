const express = require("express");  // Dependency
const app = express();   // Sets up the Express App

app.get('/', function(req, res) {
  res.send('Welcome to my web page!');  // This result is seen on browser
});

app.listen(3000, function(req, res) {   // Starts the server to begin listening
  console.log("App listening on PORT 3000."); // This result is seen on terminal
  });