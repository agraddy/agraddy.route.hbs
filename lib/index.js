var drop = require('agraddy.drop.hbs');

var mod;

mod = function(routes, url, vault) {
	routes[url] = function(req, res) {
		drop('views/' + url.slice(1).replace(/\//g, '_') + '.htm')(null, req, res, {vault: vault});
	};
}

module.exports = mod;
