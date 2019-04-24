var parser = require("./fcparser");

function flashCardLoader(input) {
  return parser.parseFile(input);
}

module.exports = flashCardLoader;