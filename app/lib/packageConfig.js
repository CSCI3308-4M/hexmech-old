const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./package.json'));
module.exports = config;
