const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"..", "data", "restaurants.json");

function getStoredRestaurants() {

	const fileData = fs.readFileSync(filePath);
	const storedRestaurants = JSON.parse(fileData);
	
	return storedRestaurants;
}

function storeRestaurants (storableRestaurants){
	fs.writeFileSync(filePath, JSON.stringify((storableRestaurants)));
}

module.exports={
	getStoredRestaurants: getStoredRestaurants,
	// 다른 파일에서 사용할 이름: 이 파일에서 함수 이름
	storeRestaurants: storeRestaurants
}  