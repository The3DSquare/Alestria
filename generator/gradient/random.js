const gradient = require('./main.js');
const hex2hsl = require('../../util/hex2hsl.js');
const hsl2hex = require('../../util/hsl2hex.js');
const random = require('../../util/randomInt.js');

module.exports = (length) => {
    let baseColors = Array(5).fill(0).map(() => [random(0, 255), random(0, 255), random(0, 255)]);
    const hslGradient = gradient(length, ...baseColors).map(hex => hex2hsl(hex));
    return hslGradient.map(color => hsl2hex(color[0], color[1], 0.25 + Math.random() * 0.5));
}

