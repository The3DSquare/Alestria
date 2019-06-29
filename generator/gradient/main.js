const random = require('../../util/randomInt.js');
const lerp = require('../../util/lerp.js');

const rgb2hex = require('../../util/rgb2hex.js');

module.exports = (length, ...colors) => {
    const positions = Array(length).fill(0).map(() => random(0, 1200));
    const baseColors = colors;
    const basePositions = Array(length).fill(0).map((v, i) => i * (1200 / (baseColors.length - 1)));

    const resultingColors = positions.map(position => {
        let startIndex = -1, endIndex = -1;
        basePositions.forEach((basePosition, i) => {
            if(basePosition <= position) startIndex = i;
            if(basePosition >= position && endIndex == -1) endIndex = i;
        });

        return [
            lerp(baseColors[startIndex][0], baseColors[endIndex][0], (position - basePositions[startIndex]) / (basePositions[endIndex] - basePositions[startIndex] + 1)),
            lerp(baseColors[startIndex][1], baseColors[endIndex][1], (position - basePositions[startIndex]) / (basePositions[endIndex] - basePositions[startIndex] + 1)),
            lerp(baseColors[startIndex][2], baseColors[endIndex][2], (position - basePositions[startIndex]) / (basePositions[endIndex] - basePositions[startIndex] + 1))
        ];
    });
   
    return resultingColors.map(color => rgb2hex(...color));
}