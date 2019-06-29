const gradient = require('./main.js');
const hex2hsl = require('../../util/hex2hsl.js');
const hsl2hex = require('../../util/hsl2hex.js');

module.exports = (length) => {
    let baseColors = [ [ 99, 81, 47 ],
    [ 109, 71, 40 ],
    [ 114, 78, 25 ],
    [ 134, 151, 100 ],
    [ 127, 179, 88 ] ];
    const hslGradient = gradient(length, ...baseColors).map(hex => hex2hsl(hex));
    return hslGradient.map(color => hsl2hex(color[0], color[1], Math.random() * 0.7 + 0.1));
}

