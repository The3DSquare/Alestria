const random = require('../util/randomInt.js');
const rgb2hex = require('../util/rgb2hex.js');
const hex2rgb = require('../util/hex2rgb.js');

const goldenRatioGenerator = require('./goldenRatio.js'); 

module.exports = (length, grayness) => {
    const initialColors = goldenRatioGenerator(3).map(color => hex2rgb(color));

    const colors = Array(length).fill(0).map(() => {
        const randomIndex = random(0, 2);
        let mixRatio1 = (randomIndex == 0) ? Math.random() * grayness : Math.random();
        let mixRatio2 = (randomIndex == 1) ? Math.random() * grayness : Math.random();
        let mixRatio3 = (randomIndex == 2) ? Math.random() * grayness : Math.random();
        const sum = mixRatio1 + mixRatio2 + mixRatio3;
        mixRatio1 /= sum;
        mixRatio2 /= sum;
        mixRatio3 /= sum;

        return [
            Math.floor(mixRatio1 * initialColors[0][0] + mixRatio2 * initialColors[1][0] + mixRatio3 * initialColors[2][0]),
            Math.floor(mixRatio1 * initialColors[0][1] + mixRatio2 * initialColors[1][1] + mixRatio3 * initialColors[2][1]),
            Math.floor(mixRatio1 * initialColors[0][2] + mixRatio2 * initialColors[1][2] + mixRatio3 * initialColors[2][2])
        ];
    });
    console.log(initialColors);
    return colors.map(color => rgb2hex(...color));
}