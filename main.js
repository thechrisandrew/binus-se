const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// initialize express app
const app = express();
const port = 3000;

// morgan for logging
app.use(morgan("tiny"));
// set view engine to ejs
app.set("view engine", "ejs");
// Set public folder for static files
app.use(express.static("public"));
// parse urlencoded payloads
app.use(express.urlencoded({ extended: true }));
// use cookie-parser
app.use(cookieParser());

// Application Routes

app.use("/auth/register", require("./routes/registerRoute"));

app.use("/auth/login", require("./routes/loginRoute"));

app.use("/", require("./routes/mainRoute"));

// 404 Page Route
app.use((req, res) => {
	res.status(404).send("404 Not Found");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
