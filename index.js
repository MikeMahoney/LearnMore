var request = require("request");

//Returns all info as JSON
exports.getInfoAsJson = function(title, iLimit, callback) {
	
	exports.getBasicInfo(title, true, function(info){
		
		exports.getImages(title, iLimit, function(images) {
		
			var infoJSON = {
	
				"basicInfo": "",
				"images" : []
			
			}
			
			infoJSON.basicInfo = info;
			
			for(var i = 0; i < images.length; i++) {
				
				infoJSON.images.push(images[i]);
			
			}
		
			callback(infoJSON);
		
		});
		
	});
	
};

//Returns all info as HTML string
exports.getInfoContainer = function(title, iLimit, callback) {
	
	exports.getBasicInfo(title, false, function(info){
		
		exports.getImages(title, iLimit, function(images) {
		
			var imageUrl = images[0];
			
			var htmlString = "<div id='infoContainer'>";
			htmlString += "<h2>" + title + "</h2>";
			htmlString += "<img src='" + imageUrl + "'/>";
			htmlString += info;
			htmlString += "</div>";
		
			callback(htmlString);
		
		});
		
	});
	
};

//Returns basic info
exports.getBasicInfo = function(title, stripTags, callback) {

	var searchTitle = title.replace(/ /g,"_");
	var basicInfo = "No info found!";

	request("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=" + searchTitle, function(error, response, body) {
	
		if (!error && response.statusCode == 200) {
		
			var infoJSON = JSON.parse(body);
			
			//Getting the key of the object that contains the extract because the key is dynamic
			var pagesArray = Object.keys(infoJSON.query.pages);
			var key = pagesArray[0];
			var info = infoJSON.query.pages[key].extract;
			
			if(info && stripTags == true) {
			
				//Strip html tags from extract
				info = info.replace(/<(?:.|\n)*?>/gm, '');
			
			}
			
			callback(info);
		
		} else {
		
			console.log("ERROR: " + response.statusCode);
		
		}
		
	});
	
};

//Returns an array of image URLs
exports.getImages = function(title, iLimit, callback) {

	var searchTitle = title.replace(/ /g,"_");

	request("https://en.wikipedia.org/w/api.php?action=query&list=allimages&ailimit=" + iLimit + "&aifrom=" + title + "&aiprop=url&format=json", function(error, response, body) {
	
		if (!error && response.statusCode == 200) {
			
			var images = [];
			var infoJSON = JSON.parse(body);
			var allImages = infoJSON.query.allimages;
			
			for(var i = 0; i < allImages.length; i++) {
			
				var url = allImages[i].url;
				console.log(url);
				
				images.push(url);
			
			}
			
			callback(images);
			
		} else {
		
			console.log("ERROR: " + response.statusCode);
		
		}
		
	});
	
};