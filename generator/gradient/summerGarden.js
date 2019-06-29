const gradient = require('./main.js');
const hex2hsl = require('../../util/hex2hsl.js');
const hsl2hex = require('../../util/hsl2hex.js');

module.exports = (length) => {
    let baseColors = [
        [250.37239, 95.31225, 56.554935],
        [92.15846, 151.6241, 84.8684],
        [112.89565, 187.66405, 124.08643],
        [246.66362, 179.07213, 231.56915],
        [230, 56, 90]
];
    const hslGradient = gradient(length, ...baseColors).map(hex => hex2hsl(hex));
    return hslGradient.map(color => hsl2hex(color[0], color[1], Math.random() * 0.5 + 0.25));
}

