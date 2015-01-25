var request = require("request");

module.exports = {
	getProducts: getProducts
}

function getProducts (req, res) {
	var keyword = req.swagger.params.keyword.value;
	var limit = req.swagger.params.limit.value;

	if (!limit) {
		limit = 20;
	}

	request('http://api.developer.sears.com/v2.1/products/search/Sears/json/keyword/'+ keyword +'?apikey={YOUR-SEARS-CONSUMER-KEY}', function (error, response, body) {
		if (error) {
			res.send(error);
		} else {
			body = JSON.parse(body)
			var results = [];
			for(var i=0; i<limit; i++) {
				results.push(body.SearchResults.Products[i]);
			}
			res.send(results);
		}
	})
}