var drop = require('agraddy.drop.hbs');

var mod;

mod = function(routes, url) {
	routes[url] = drop('views/' + url.slice(1).replace(/\//g, '_') + '.htm');
}

module.exports = mod;
