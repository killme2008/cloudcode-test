// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
var name = require('cloud/name.js');
AV.Cloud.define("hello", function(request, response) {
	console.log(name.isACoolName('Fred')); // returns false
	console.log(name.isACoolName('Skippy')); // returns true;
	response.success("Hello world!");
});
