const fs = require("fs");
const path = require("path");

const express = require("express");

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public")); // css, js file request solution
app.use(express.urlencoded({extended: false}));

app.use("/", defaultRoutes);
// '/'를 가지고 있으면 다 일로 들가고 그 안에서 해당되는 것이 없으면 밑으로 다시 감
app.use("/", restaurantRoutes);

app.use(function(req,res) {
	res.status(404).render("404");
});

app.use(function(error, req, res, next) {
	res.status(500).render("500");
});

app.listen(3000);