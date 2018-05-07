var parser = require("./fcparser");
var fs = require('fs');
var path = require('path');

var parentDir = path.resolve(process.cwd(), '..');

fs.readFile(parentDir + '/src/data/javascript/question1.fc', 'utf8', function(err, contents) {
    var file = parser.parseFile(contents);
    console.log(file);
});