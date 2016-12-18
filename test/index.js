var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');

var hbs = require('../');
var routes = {};
var res = response();
var res2 = response();
var lug = {};

process.chdir('test');

lug.vault = {};
lug.vault.data = {};
lug.vault.config = {};
lug.vault.data.title = 'HBS';


(function() {
	hbs(routes, '/about', lug.vault);

	res.on('finish', function() {
		tap.assert.equal(res._body, '-HBS-\n', 'Should parse the data.');
	});

	routes['/about']({}, res);
})();



(function() {
	hbs(routes, '/take/two', lug.vault);
	res2.on('finish', function() {
		tap.assert.equal(res2._body, '-HBS-\n', 'Should get file with two slashes.');
	});

	routes['/take/two']({}, res2);
})();

