const gradient = require('./main.js');
const hex2hsl = require('../../util/hex2hsl.js');
const hsl2hex = require('../../util/hsl2hex.js');

module.exports = (length) => {
    let baseColors = [
        [59.904423, 160.10536, 161.21419], 
        [247.35092, 123.191444, 14.554009], 
        [88.32275, 175.69519, 131.12749], 
        [86.28255, 214.62813, 181.77734], 
        [170.33698, 126.24459, 191.79529]];
    const hslGradient = gradient(length, ...baseColors).map(hex => hex2hsl(hex));
    return hslGradient.map(color => hsl2hex(color[0], color[1], Math.random() * 0.5 + 0.25));
}