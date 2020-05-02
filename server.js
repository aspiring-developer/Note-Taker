// Importing and setting up modules and app
const express = require("express"); 
const app = express(); 
const db = require("./db/db.json");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;  

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

/* HTML ROUTES */
// Returns index.html file
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
// Returns notes.html file
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

/* API ROUTES */
app.get('/api/notes', function(req, res) {
  return res.json(db);
});

// db.json file stores user entered note title and texts
app.post('/api/notes', function(req, res) {
  var enteredNote = req.body;
  enteredNote.id = Math.round(Math.random() * 555)
  db.push(enteredNote);
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(db, null, 1), 'utf-8') 
  res.json(enteredNote);
  if (error) throw error;
});

// Reads notes and deletes selected for deletion
app.delete("/api/notes/:id", function (req, res) {
  var selectedNote = db.find(function({id}) {id === JSON.parse(req.params.id)
  });
  db.splice(db.indexOf(selectedNote));
  fs.writeFileSync('./db/db.json', JSON.stringify(db, null, 1), 'utf-8')
    res.end();
});
// Starts the server to begin listening
app.listen(3000, function(req, res) {   
  console.log("App listening on PORT " + PORT + ".");    // This result is seen on terminal
  });