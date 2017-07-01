/*
usage
$ node  convert.js
*/

const PAGE_BOOKMARK_TITLE = "MY BOOKMARK";


// read json
var jsonFilenames = [
	'./business.json',
	'./sports.json'
	];
var jsonAll = null;

jsonFilenames.forEach(function(jsonFilename){
	let fs = require('fs');
	let tmp = JSON.parse(fs.readFileSync(jsonFilename, 'utf8'));
	if (jsonAll == null) {
		jsonAll = tmp;
	}
	else {
		jsonAll = jsonAll.concat(tmp);
	}
});


// sort (descending order)
jsonAll.sort(function(a,b){
	a.registrationTime = new Date(a.registrationDate).getTime();
	b.registrationTime = new Date(b.registrationDate).getTime();
	if (a.registrationTime > b.registrationTime) {
		return -1;
	}
	if (a.registrationTime < b.registrationTime) {
		return 1;
	}
	return 0;
});

// contents
var contents = "";
var categoryInfos = [
	{category:"business",	printTitle:"ビジネス"},
	{category:"sports",	printTitle:"スポーツ"},
	];
jsonAll.forEach(function(jsonObj){

	contents += "<div class=\"bookmark-style\">\n";

	contents += "<div class=\"category-style\">";
	contents += jsonObj.registrationDate;
	contents += "&emsp;";
	contents += jsonObj.genre;
	contents += "（";
	for (let categoryInfo of categoryInfos) {
		if (jsonObj.category == categoryInfo.category) {
			contents += categoryInfo.printTitle;
			break;
		}
	}
	contents += "）";
	contents += "</div>\n";

	contents += "<div class=\"title-style\">";
	contents += "<a href=\"" + jsonObj.url + "\">";
	contents += jsonObj.title;
	contents += "</a>";
	contents += "</div>\n";

	contents += "<div class=\"comment-style\">";
	contents += jsonObj.comment;
	contents += "...";	// substitutes for text-overflow
	contents += "</div>\n";

	contents += "</div>\n";

	contents += "<br>\n";
});


// output
console.log(
`<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="./bookmark.css" media="all">
<title>${PAGE_BOOKMARK_TITLE} - yoshi's 記録</title>
</head>

<body>
<center>

<h1>${PAGE_BOOKMARK_TITLE}</h1>

${contents}

</center>
</body>
</html>
`);
