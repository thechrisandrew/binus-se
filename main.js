const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
var cors = require("cors");

// require .env file for secrets and configuration
require("dotenv").config();

// initialize express app
const app = express();
const port = 3000;

// cors needed since 2 servers are used.
app.use(cors());
// morgan for logging
app.use(morgan("tiny"));
// set view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Set public folder for static files
app.use(express.static("public"));
// parse urlencoded payloads
app.use(express.urlencoded({ extended: true }));
// parse json payloads
app.use(express.json());

// Application Routes
app.use("/auth/register", require("./routes/registerRoute"));

app.use("/auth/login", require("./routes/loginRoute"));

app.use("/staff", require("./routes/staffRoute"));

app.use("/product", require("./routes/productRoute"));

app.use("/checkout", require("./routes/checkoutRoute"));

app.use("/history", require("./routes/transactionRoute"));

app.use("/dashboard", require("./routes/dashboardRoute"));
// app.use("/", require("./routes/mainRoute"));

// 404 Page Route
app.use((req, res) => {
	res.status(404).send("404 Not Found");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
