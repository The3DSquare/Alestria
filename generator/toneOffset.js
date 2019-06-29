const rgb2hex = require('../util/rgb2hex.js');
const random = require('../util/randomInt.js')

module.exports = (length, toneRGB) => {
    const offset = 30;
    const initialTonePalette = Array(length).fill(0).map(() => toneRGB.map(val => val + random(-offset, offset)));
    const boundedPalette = initialTonePalette.map(color => color.map(val => val > 255 ? 255 : val));
    return boundedPalette.map(color => rgb2hex(...color));
}