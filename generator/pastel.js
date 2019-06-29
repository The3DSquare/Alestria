const rgb2hex = require('../util/rgb2hex');
const random = require('../util/randomInt.js');

module.exports = (length) => {
    const pastelRGB = Array(length).fill(0).map(() => [random(128, 255), random(128, 255), random(128, 255)]);
    return pastelRGB.map(color => rgb2hex(...color));
}