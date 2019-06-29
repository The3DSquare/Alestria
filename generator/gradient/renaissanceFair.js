const gradient = require('./main.js');
const hex2hsl = require('../../util/hex2hsl.js');
const hsl2hex = require('../../util/hsl2hex.js');

module.exports = (length) => {
    let baseColors = [ [ 246, 220, 185 ],
    [ 195, 194, 150 ],
    [ 148, 113, 79 ],
    [ 117, 60, 55 ],
    [ 80, 44, 63 ] ];
    const hslGradient = gradient(length, ...baseColors).map(hex => hex2hsl(hex));
    return hslGradient.map(color => hsl2hex(color[0], color[1], Math.random() * 0.5 + 0.25));
}

