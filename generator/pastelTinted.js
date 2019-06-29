const hsl2rgb = require('../util/hsl2rgb.js');
const rgb2hex = require('../util/rgb2hex.js');
const random = require('../util/randomInt.js')

module.exports = (length, tintHSL) => {
    const tintRGB = hsl2rgb(...tintHSL);
    const pastelRGB = Array(length).fill(0).map(() => [random(128, 255), random(128, 255), random(128, 255)]);
    const mixedRGB = pastelRGB.map(color => color.map((val, i) => (val * 3 / 2 + tintRGB[i] * 1 / 2) / 2));
    console.log(mixedRGB);
    console.log(mixedRGB.map(color => rgb2hex(...color)));
    return mixedRGB.map(color => rgb2hex(...color));
}