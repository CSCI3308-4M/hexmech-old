var fs = require('fs')
var config = JSON.parse(fs.readFileSync('./package.json'));
module.exports = config;
