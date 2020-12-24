// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Reservations/Wait List (DATA)
// =============================================================
const reservations = [];
const waitList = [];

// Routes
// =============================================================

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/makeReservation", function (req, res) {
  res.sendFile(path.join(__dirname, "makeReservation.html"));
});

app.get("/viewTables", function (req, res) {
  res.sendFile(path.join(__dirname, "viewTables.html"));
});

// Displays all reservations
app.get("/api/reservations", function (req, res) {
  return res.json(reservations);
});

// Displays the waitlist
app.get("/api/waitlist", function (req, res) {
  return res.json(waitList);
});


app.post("/api/reservations", function (req, res) {
  var newReservation = req.body;

  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  if (reservations.length >= 5) {
    waitList.push(newReservation);
  } else {
    reservations.push(newReservation);
  }
  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
