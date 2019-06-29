const gradient = require('./main.js');
const hex2hsl = require('../../util/hex2hsl.js');
const hsl2hex = require('../../util/hsl2hex.js');

module.exports = (length) => {
    let baseColors = [ [ 60, 40, 63 ],
    [ 75, 58, 88 ],
    [ 151, 104, 140 ],
    [ 0, 163, 19 ],
    [52, 77, 29], ];
    const hslGradient = gradient(length, ...baseColors).map(hex => hex2hsl(hex));
    return hslGradient.map(color => hsl2hex(color[0], color[1], Math.random() * 0.7 + 0.1));
}

