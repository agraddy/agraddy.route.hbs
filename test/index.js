var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');

var hbs = require('../');
var routes = {};
var res = response();
var res2 = response();
var res3 = response();
var res4 = response();
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


(function() {
	function header(req, res, lug, cb) {
		res.setHeader('X-Test', 'test');
		cb();
	}

	// Combine lug.vault with the lug from luggage
	hbs(routes, '/add/header/here', [header], lug.vault);

	res3.on('finish', function() {
		tap.assert.deepEqual(res3._headers[0], {"X-Test": "test"}, 'Should get header from luggage plugin.');
		tap.assert.equal(res3._body, '--HBS--\n', 'Should get file with three slashes.');
	});

	routes['/add/header/here']({}, res3);
})();


(function() {
	hbs(routes, '^/handle/regex(/\\d+)$', lug.vault);
	res4.on('finish', function() {
		tap.assert.equal(res4._body, 'regex: HBS\n', 'Should handle regex - end at the first parenthesis.');
	});

	routes['^/handle/regex(/\\d+)$']({url: '/handle/regex/3'}, res4);
})();

