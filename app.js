const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public")); // css, js file request solution
app.use(express.urlencoded({extended: false}));
   
app.get("/", function(req, res) {
	// const htmlFilePath = path.join(__dirname, "views", "index.html");
	// res.sendFile(htmlFilePath);
	
	res.render("index") //ejs ->  html
})

app.get("/restaurants", function(req, res) {
	const filePath = path.join(__dirname, "data", "restaurants.json");
	
	const fileData = fs.readFileSync(filePath);
	const storedRestaurants = JSON.parse(fileData);
	
	res.render("restaurants", { numberOfRestaurants: storedRestaurants.length, 
							   restaurants : storedRestaurants})
} )

app.get("/about", function(req, res) {
	res.render("about");
} )

app.get("/confirm", function(req, res) {
	res.render("confirm");
} )

app.get("/recommend", function(req, res) {
	res.render("recommend");
} )

app.post("/recommend", function(req, res) {
	const restaurant = req.body; //object save
	const filePath = path.join(__dirname, "data", "restaurants.json");
	
	const fileData = fs.readFileSync(filePath);
	const storedRestaurants = JSON.parse(fileData);
	
	storedRestaurants.push(restaurant);
	
	fs.writeFileSync(filePath, JSON.stringify((storedRestaurants)));
	
	res.redirect("/confirm");
	
});

app.listen(3000);