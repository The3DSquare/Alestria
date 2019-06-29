const hsl2hex = require('../util/hsl2hex');
const random = require('../util/randomInt.js')

module.exports = (length, tintHSL) => {
    const hues = Array(length).fill(0).map(() => [tintHSL[0], Math.random(), Math.random() * 0.8 + 0.2]);
    return hues.map(color => hsl2hex(...color));
}