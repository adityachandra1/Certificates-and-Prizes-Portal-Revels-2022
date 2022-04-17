const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

/*Generate JWT Token Secret, stored as env var
console.log(require('crypto').randomBytes(64).toString('hex'))*/

const uploadRoutes = require("./routes/uploadRoutes");
const authRoutes = require("./routes/authRoutes");
const mailingRoutes = require("./routes/mailingRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const verificationRoutes = require("./routes/verficationRoutes");
const { assertIsOneOf } = require("pdf-lib");
const AWS = require("aws-sdk");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    process.env.DB_URI ||
      "mongodb+srv://admin:admin123@cluster0.gqru4.mongodb.net/cnp-portal",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(app.listen(PORT))
  .then(console.log("Connected to DB\nListening to port " + PORT))
  .catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("Great World!");
});

//Routes
app.use(authRoutes);
app.use(uploadRoutes);
app.use(mailingRoutes);
app.use(certificateRoutes);
app.use(verificationRoutes);
