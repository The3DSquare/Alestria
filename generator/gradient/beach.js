const gradient = require('./main.js');
const hex2hsl = require('../../util/hex2hsl.js');
const hsl2hex = require('../../util/hsl2hex.js');

module.exports = (length) => {
    let baseColors = [ [ 240, 72, 59 ],
    [ 250, 204, 72 ],
    [ 247, 243, 181 ],
    [ 29, 205, 201 ],
    [ 20, 103, 86 ] ];
    const hslGradient = gradient(length, ...baseColors).map(hex => hex2hsl(hex));
    return hslGradient.map(color => hsl2hex(color[0], color[1], Math.random() * 0.5 + 0.25));
}

