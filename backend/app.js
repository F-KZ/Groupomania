require("dotenv").config();
//const
const express = require("express");
const path = require("path");
const app = express();

//securité
const helmet = require("helmet");
const session = require("express-session");

//routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

//
let datecookie = new Date(Date.now() + 60 * 60 * 1000);
app.use(
  session({
    secret: process.env.cookieSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, httpOnly: true, expires: datecookie },
  })
);

//CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content, Accept, Content-type, Authorization"
  );
  next();
});

app.use(helmet());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/users", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
