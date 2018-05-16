var fs = require('fs');

var images = new Array();
module.exports = {
	GetImages: function() {
		fs.readdir('images/', function(err, items) {
			console.log(items.length);
		    for (var i=0; i<items.length; i++) {
		        images[i] = items[i];
		   	}
	   	});
	   	return images;
	}
};
