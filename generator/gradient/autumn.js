const gradient = require('./main.js');
const hex2hsl = require('../../util/hex2hsl.js');
const hsl2hex = require('../../util/hsl2hex.js');

module.exports = (length) => {
    let baseColors = [
        [60, 5, 21], 
        [187, 0, 0], 
        [255, 227, 1], 
        [255, 113, 1], 
        [29, 47, 73]];
    const hslGradient = gradient(length, ...baseColors).map(hex => hex2hsl(hex));
    return hslGradient.map(color => hsl2hex(color[0], color[1] + Math.random() * 0.2 - 0.1, Math.random() * 0.42 + 0.08));
}