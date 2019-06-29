const hsl2hex = require('../util/hsl2hex.js');

module.exports = (length) => {
    const randomColorHSL = [Math.random(), 0.8, 0.6];
    const goldenAngle = 1 / ((1 + Math.sqrt(5)) / 2);

    let currentOffset = randomColorHSL[0];
    const colors = Array(length).fill(0).map(() => (currentOffset += goldenAngle, currentOffset %= 1, 
        [currentOffset, 0.7 + Math.random() * 0.3, 0.5 + Math.random() * 0.5 - 0.25]));
    return colors.map(color => hsl2hex(...color));
}