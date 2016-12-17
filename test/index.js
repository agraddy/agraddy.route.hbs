var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');

var hbs = require('../');
var routes = {};
var res = response();
var lug = {};

process.chdir('test');

lug.vault = {};
lug.vault.data = {};
lug.vault.config = {};
lug.vault.data.title = 'HBS';


(function() {
	hbs(routes, '/about');

	res.on('finish', function() {
		tap.assert.equal(res._body, '-HBS-\n', 'Should parse the data.');
	});

	routes['/about'](null, {}, res, lug);
})();



(function() {
	hbs(routes, '/take/two');
	var res2 = response();
	res.on('finish', function() {
		tap.assert.equal(res._body, '-HBS-\n', 'Should get file with two slashes.');
	});

	routes['/take/two'](null, {}, res, lug);
})();

