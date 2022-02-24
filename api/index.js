const express = require("express");
const mongoose = require('mongoose');
const  bodyParser = require('body-parser');

const app = express();

const DB_URI = 'mongodb+srv://admin:admin123@cluster0.gqru4.mongodb.net/cnp-portal?retryWrites=true&w=majority'
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(app.listen(PORT))
  .then(console.log("Connected to DB\nListening to port " + PORT))
  .catch((err) => console.log(err));


app.get("/", function (req, res) {
  res.send("Great World!");
});

