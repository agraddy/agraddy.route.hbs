var drop = require('agraddy.drop.hbs');
var luggage = require('agraddy.luggage');

var mod;

mod = function(routes, url, plugins, vault) {
	var lug = {};
	var filename = '';

	// Check if url is a regex
	if(url.slice(0, 1) === '^') {
		filename = url.slice(2, url.indexOf('(')).replace(/\//g, '_');
	} else {
		filename = url.slice(1).replace(/\//g, '_');
	}
	if(Array.isArray(plugins)) {
		routes[url] = function(req, res) {
			luggage(req, res, plugins, function(err, req, res, lug) {
				lug.vault = Object.assign({}, lug.vault, vault);
				drop('views/' + filename + '.htm')(err, req, res, lug);
			});
		};
	} else {
		lug.vault = plugins;
		routes[url] = function(req, res) {
			drop('views/' + filename + '.htm')(null, req, res, lug);
		};
	}
}

module.exports = mod;
