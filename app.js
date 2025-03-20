const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// parse application/json
app.use(bodyParser.json());

app.set("port", process.env.PORT || 8080);

// Serve the custom activity's interface, config, etc.
app.use(express.static(path.join(__dirname, "customactivity-sendsms")));

//Called when a journey is saving the activity.
app.post("/save", function (req, res) {
  console.log("debug: /save");
  return res.status(200).json({});
});

//Called when a Journey has been published.
app.post("/publish", function (req, res) {
  console.log("debug: /publish");
  return res.status(200).json({});
});

//Called when Journey Builder wants you to validate the configuration to ensure the configuration is valid.
app.post("/validate", function (req, res) {
  console.log("debug: /validate");
  return res.status(200).json({});
});

//Called when a Journey is stopped.
app.post("/stop", function (req, res) {
  console.log("debug: /stop");
  return res.status(200).json({});
});

//Called when a contact is flowing through the Journey.
app.post("/execute", function (req, res) {
  // all dynamodb logic here //
  console.log("debug: /execute");
  return res.status(200).json({});
});

// route to handle all requests and display page
app.get("*", function (req, res) {
  res.sendfile("./customactivity-sendsms/index.html");
});

app.listen(app.get("port"), function () {
  console.log(`Custom Activity is running at localhost: ${app.get("port")}`);
});
