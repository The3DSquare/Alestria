const hex2rgb = require('./hex2rgb.js');
const rgb2hsl = require('./rgb2hsl.js');

module.exports = (hex) => {
    return rgb2hsl(...hex2rgb(hex));
}