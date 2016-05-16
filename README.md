# LearnMore - Easy way to get information

Methods that return information from Wikipedia based on a search query.
Utilises [Request](https://www.npmjs.com/package/request).

## Info as JSON

Just pass a query and the number of images you want back.
The callback will return a JSON object with an array or image URLs and a paragraph of information on the subject.

```js
var assignment2 = require('assignment2dweb4');
assignment2.getInfoAsJson(query, noOfImages, function(json){

	var images = json.images;
	var basicInfo = json.basicInfo;

});
```

## Info as HTML

Just pass a query and the number of images you want back.
The callback will return a HTML string; a div containing a header, the first image and a paragraph of info.

```js
assignment2.getInfoContainer(query, noOfImages, function(html){

	console.log(html);

});
```

## Get Basic Info

Just pass a query and whether you want to strip the HTML tags.
The callback will return a string of text.

```js
assignment2.getBasicInfo(query, stripImages?, function(info){

	console.log(info);

});
```

## Get Images

Just pass a query and the number of images you want returned.
The callback will return an array of image URLs.

```js
assignment2.getImages(query, noOfImages, function(images){

	console.log(images[0]);

});
```