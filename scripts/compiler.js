var parser = require("./fcparser");

function flashCardLoader(input) {
  var file = parser.parseFile(input);
  return "export default " + JSON.stringify(file) + ";";
}

module.exports.default = flashCardLoader;