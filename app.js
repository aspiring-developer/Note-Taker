// Importing and setting up modules and app
const express = require("express"); 
const app = express(); 
const db = require("./db/db.json");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;  

app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

/* HTML ROUTES */
// Returns note.html file
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
// Returns index.html file
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

/* API ROUTES */
app.get('/api/notes', function(req, res) {
  return res.json(db);
});

// db.json file stores user entered note title and texts
app.post('/api/notes', function(req, res) {
  var newNote = req.body;
  db.push(newNote);
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(db), 
  function (error) {
    if (error) throw error;
  });
  res.json(newNote);
});

// Reads notes and deletes selected for deletion
app.delete("/api/notes/:id", function (req, res) {
  var selectedNote = req.params.id;
  fs.readFile('./db/db.json', function(error, data) {
    if (error) throw error;
var notes = JSON.parse(data);
var notesArray = function() {
  for (let i = 0; i < notes.length; i++)
  if(selectedNote === notes[i].id) {
let addedNotes = notes.splice(i, 1);
return addedNotes;
  }
}
notesArray();
  })

  fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(req.params.id), "UTF8", function(error) {
    if (error) throw error;
    
  });
});
// Starts the server to begin listening
app.listen(3000, function(req, res) {   
  console.log("App listening on PORT" + PORT + "."); // This result is seen on terminal
  });