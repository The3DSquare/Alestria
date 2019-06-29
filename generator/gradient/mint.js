const gradient = require('./main.js');
const hex2hsl = require('../../util/hex2hsl.js');
const hsl2hex = require('../../util/hsl2hex.js');

module.exports = (length) => {
    let baseColors = [ [ 100, 95, 104 ],
    [ 44, 102, 104 ],
    [ 80, 147, 143 ],
    [ 154, 218, 227 ],
    [ 204, 225, 178 ] ];
    const hslGradient = gradient(length, ...baseColors).map(hex => hex2hsl(hex));
    return hslGradient.map(color => hsl2hex(color[0], color[1], Math.random() * 0.5 + 0.25));
}

